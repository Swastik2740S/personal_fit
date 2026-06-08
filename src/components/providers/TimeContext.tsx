"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type TimePhase = "morning" | "evening";

interface TimeContextType {
  phase: TimePhase;
}

const TimeContext = createContext<TimeContextType | undefined>(undefined);

export function TimeProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<TimePhase>("morning");

  useEffect(() => {
    // Determine phase based on local system time
    const updatePhase = () => {
      const hour = new Date().getHours();
      // Morning/Day: 4 AM to 4 PM (16:00). Evening/Night: 4 PM to 4 AM.
      if (hour >= 4 && hour < 16) {
        setPhase("morning");
      } else {
        setPhase("evening");
      }
    };

    updatePhase();
    const interval = setInterval(updatePhase, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <TimeContext.Provider value={{ phase }}>
      {children}
    </TimeContext.Provider>
  );
}

export function useTimePhase() {
  const context = useContext(TimeContext);
  if (context === undefined) {
    throw new Error("useTimePhase must be used within a TimeProvider");
  }
  return context;
}
