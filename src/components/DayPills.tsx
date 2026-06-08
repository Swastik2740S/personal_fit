"use client";

import { getLastNDays } from "@/lib/day";

/**
 * Last-7-days picker. Reuses the `.day-tabs` / `.day-tab` pill styles from
 * globals.css. `selected` must be one of the ISO strings produced by
 * `getLastNDays()` (the same generator the page uses to seed its default).
 */
export default function DayPills({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (iso: string) => void;
}) {
  const days = getLastNDays();

  return (
    <div className="day-tabs" role="tablist" aria-label="Select day">
      {days.map((d) => {
        const active = d.iso === selected;
        return (
          <button
            key={d.iso}
            role="tab"
            aria-selected={active}
            className={`day-tab${active ? " active" : ""}`}
            onClick={() => onSelect(d.iso)}
          >
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.7 }}>
              {d.isToday ? "Today" : d.weekday}
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, marginTop: 2 }}>{d.dayNum}</div>
          </button>
        );
      })}
    </div>
  );
}
