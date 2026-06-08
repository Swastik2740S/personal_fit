import type { ComponentType } from "react";
import {
  LayoutDashboard,
  Utensils,
  Footprints,
  Scale,
  TrendingUp,
  Dumbbell,
  Pill,
  Lightbulb,
  Settings,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: ComponentType<{ size?: number | string; className?: string }>;
}

// Full navigation — used by the desktop sidebar and the mobile drawer.
export const ALL_NAV: NavItem[] = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Food Logger", href: "/food", icon: Utensils },
  { name: "Step Tracker", href: "/steps", icon: Footprints },
  { name: "Weight Log", href: "/weight", icon: Scale },
  { name: "Weekly Report", href: "/report", icon: TrendingUp },
  { name: "Training Plan", href: "/training", icon: Dumbbell },
  { name: "Meal Plan", href: "/meals", icon: Utensils },
  { name: "Supplements", href: "/supplements", icon: Pill },
  { name: "Coach Tips", href: "/tips", icon: Lightbulb },
  { name: "Settings", href: "/settings", icon: Settings },
];

// Condensed set for the mobile bottom bar (5 primary destinations).
export const PRIMARY_NAV: NavItem[] = [
  { name: "Dash", href: "/", icon: LayoutDashboard },
  { name: "Food", href: "/food", icon: Utensils },
  { name: "Steps", href: "/steps", icon: Footprints },
  { name: "Report", href: "/report", icon: TrendingUp },
  { name: "Plan", href: "/training", icon: Dumbbell },
];
