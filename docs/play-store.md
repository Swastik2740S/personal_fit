# Shipping SwastikFit to the Google Play Store (TWA)

SwastikFit is a PWA. We publish it to Play as a **Trusted Web Activity (TWA)** —
a thin Android shell that launches the live Vercel site fullscreen, no URL bar.
One codebase; website updates ship to the app instantly (only store-listing or
shell changes need a new upload + review).

> The repo is already prepped for this (see "What's already done"). The rest is
> account/console work that must be done by a human with the Play account.

---

## What's already done (in this repo)

- **`public/manifest.json`** — real PNG icons (192 / 512 / 512-maskable),
  `display: standalone`, `id`/`scope`/`orientation`/`categories`.
- **App icons** — `public/icon-192.png`, `icon-512.png`, `icon-maskable-512.png`
  (placeholder "SF" mark — **swap for real branding before launch**).
- **`public/.well-known/assetlinks.json`** — Digital Asset Links file with
  **placeholder fingerprints you must fill in** (see step 4).
- **`src/proxy.ts`** — `/.well-known/(.*)` and `/manifest.json` are now public
  so Google's verifier and the manifest aren't redirected to sign-in.

---

## Prerequisites

- A **Google Play Console** account — **$25 one-time**.
  - New **personal** accounts must complete **identity verification** (gov ID).
  - New personal accounts must run a **closed test with ≥12 testers opted-in for
    14 continuous days** before they can request production access. **Plan ~2
    weeks.** (Org accounts may be exempt — check current policy.)
- The app deployed on HTTPS (Vercel ✅). Note your production URL, e.g.
  `https://<your-app>.vercel.app`.
- A **privacy policy URL** (mandatory; scrutinized because we handle fitness/
  health + Google-account data). Host a `/privacy` page or external doc.

---

## Step-by-step

### 1. Confirm the PWA is installable
Open the production URL in Chrome → DevTools → **Application → Manifest**: no
errors, icons load, "maskable" icon present. Lighthouse → PWA category should
pass "installable".

### 2. Package the Android app with PWABuilder (recommended)
1. Go to **https://www.pwabuilder.com**, paste your production URL, **Start**.
2. **Package For Stores → Android → Google Play**.
3. Set:
   - **Package ID**: `com.swastikfit.twa` (must match `assetlinks.json` —
     change both together if you pick another).
   - **App name**: SwastikFit. **Launcher name**: SwastikFit.
   - Signing key: **Create new** (PWABuilder generates one) — **DOWNLOAD AND
     BACK UP the `.keystore` + the `signing-key-info.txt` password/alias.**
     Losing this means you can never update the app under the same listing.
4. Download the zip → contains **`app-release-signed.aab`** (upload this),
   `assetlinks.json`, and signing info.

> Alternative: **Bubblewrap** CLI (`npm i -g @bubblewrap/cli`, then
> `bubblewrap init --manifest https://<your-app>.vercel.app/manifest.json` →
> `bubblewrap build`). Needs JDK 17 + Android SDK. More control, more setup.

### 3. Create the app in Play Console & enable Play App Signing
1. Play Console → **Create app** → fill name, language, app/free, declarations.
2. **Release → Setup → App integrity → App signing**: keep **Play App Signing
   ON** (default). Upload the `.aab` to a release (start with **Internal
   testing**). Play will now show TWO fingerprints under App signing:
   - **App signing key certificate** (Play's key)
   - **Upload key certificate** (your PWABuilder key)

### 4. Fill in `assetlinks.json` and redeploy
Copy BOTH SHA-256 fingerprints from step 3 into
`public/.well-known/assetlinks.json` (replace the two placeholders), keep
`package_name` matching your Package ID, commit, and let Vercel deploy. Verify:

```
https://<your-app>.vercel.app/.well-known/assetlinks.json
```
returns the JSON (HTTP 200, not a sign-in redirect). Optionally test with
Google's **Statement List Generator and Tester**. When correct, the TWA launches
with **no URL bar**.

### 5. Build the store listing
- App icon **512×512**, feature graphic **1024×500**, ≥2 phone screenshots.
- Short + full description, category (Health & Fitness).
- **Privacy policy URL**, **Data safety** form (declare Google sign-in, health
  data, what's collected/shared), **content rating** questionnaire, target
  audience, ads declaration (none).

### 6. Test, then promote
- Run **Internal testing** first (instant). For a new personal account, run
  **Closed testing** with your ≥12 testers for the required 14 days.
- Once the testing requirement is met, **request production access** and
  **promote** the release. First production review can take a few days.

---

## Gotchas specific to this app
- **Google OAuth (Clerk) works in a TWA** because TWA uses real Chrome, not an
  embedded WebView (Google blocks OAuth in WebViews). Don't switch to a WebView
  wrapper or sign-in will break.
- **Keep `assetlinks.json` public** — never re-protect `/.well-known/` in
  `proxy.ts`, or verification (and the no-URL-bar launch) breaks on next deploy.
- **Package ID is forever** for a given listing. Pick it deliberately.
- **Back up the signing keystore** off-machine. It is unrecoverable.
- If you later move to a **custom domain**, host `assetlinks.json` there too and
  re-point the TWA `host` (rebuild in PWABuilder).
