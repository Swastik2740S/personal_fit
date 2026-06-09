import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface ClerkUserData {
  id: string;
  email_addresses: { email_address: string; id: string }[];
  primary_email_address_id: string;
  first_name: string | null;
  last_name: string | null;
  image_url: string;
}

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(webhookSecret);
  let evt: { type: string; data: ClerkUserData };

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as { type: string; data: ClerkUserData };
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  const { type, data } = evt;

  if (type === "user.created") {
    const primaryEmail = data.email_addresses.find(
      (e) => e.id === data.primary_email_address_id
    )?.email_address;

    if (!primaryEmail) {
      return NextResponse.json({ error: "No primary email" }, { status: 400 });
    }

    const name = [data.first_name, data.last_name].filter(Boolean).join(" ") || null;

    await db.user.upsert({
      where: { id: data.id },
      // include email on update so a placeholder written during a cold-start
      // onboarding (when currentUser() failed) gets corrected to the real one.
      update: { email: primaryEmail, name, image: data.image_url },
      create: {
        id: data.id,
        email: primaryEmail,
        name,
        image: data.image_url,
      },
    });
  }

  if (type === "user.updated") {
    const primaryEmail = data.email_addresses.find(
      (e) => e.id === data.primary_email_address_id
    )?.email_address;

    const name = [data.first_name, data.last_name].filter(Boolean).join(" ") || null;

    await db.user.update({
      where: { id: data.id },
      data: {
        name,
        image: data.image_url,
        ...(primaryEmail ? { email: primaryEmail } : {}),
      },
    });
  }

  if (type === "user.deleted") {
    await db.user.delete({ where: { id: data.id } }).catch(() => null);
  }

  return NextResponse.json({ received: true });
}
