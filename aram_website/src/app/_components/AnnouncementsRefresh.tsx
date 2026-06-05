"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { refreshAnnouncements } from "../announcements/actions";

const INTERVAL_SECONDS = 60;
const STORAGE_KEY = "announcements-next-refresh";

export default function AnnouncementsRefresh({
  serverTime,
}: {
  serverTime: number;
}) {
  const router = useRouter();
  const [remaining, setRemaining] = useState(INTERVAL_SECONDS);

  useEffect(() => {
    const init = () => {
      const now = Date.now();
      const stored = parseInt(
        window.localStorage.getItem(STORAGE_KEY) ?? "0",
        10,
      );
      const serverNext = serverTime + INTERVAL_SECONDS * 1000;
      // Use stored value if it's still in the future AND earlier than server's.
      // Otherwise fall back to serverNext.
      const next =
        stored > now && stored <= serverNext ? stored : serverNext;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      setRemaining(Math.max(0, Math.ceil((next - now) / 1000)));
    };
    init();

    const tick = setInterval(async () => {
      const now = Date.now();
      const stored = parseInt(
        window.localStorage.getItem(STORAGE_KEY) ?? "0",
        10,
      );
      const rem = Math.ceil((stored - now) / 1000);
      if (rem <= 0) {
        const next = now + INTERVAL_SECONDS * 1000;
        window.localStorage.setItem(STORAGE_KEY, String(next));
        setRemaining(INTERVAL_SECONDS);
        await refreshAnnouncements();
        router.refresh();
      } else {
        setRemaining(rem);
      }
    }, 1000);
    return () => clearInterval(tick);
  }, [router, serverTime]);

  const pct = (remaining / INTERVAL_SECONDS) * 100;
  const mm = Math.floor(remaining / 60);
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-sky-200/80 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm">
      <div className="relative h-5 w-5 shrink-0">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            stroke="rgb(186 230 253)"
            strokeWidth="3"
          />
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            stroke="rgb(2 132 199)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 15.5}
            strokeDashoffset={2 * Math.PI * 15.5 * (1 - pct / 100)}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
      </div>
      <p className="text-[0.7rem] font-medium text-slate-600 sm:text-xs">
        Announcements reloading in{" "}
        <span className="font-bold tabular-nums text-sky-700">
          {mm}:{ss}
        </span>
      </p>
    </div>
  );
}
