import { useEffect, useMemo, useState } from "react";

function formatNumber(num) {
  return String(num).padStart(2, "0");
}

export default function Countdown({ targetDate }) {
  const target = useMemo(() => new Date(targetDate).getTime(), [targetDate]);
  const [remaining, setRemaining] = useState(target - Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(target - Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const ended = remaining <= 0;
  const seconds = Math.max(0, Math.floor((remaining / 1000) % 60));
  const minutes = Math.max(0, Math.floor((remaining / 1000 / 60) % 60));
  const hours = Math.max(0, Math.floor((remaining / (1000 * 60 * 60)) % 24));
  const days = Math.max(0, Math.floor(remaining / (1000 * 60 * 60 * 24)));

  if (ended) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
        <p className="text-sm font-semibold text-white/80">Registration closed</p>
        <p className="mt-2 text-2xl font-bold text-white">See you on match day!</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-sm uppercase tracking-wide text-white/60">Tournament Starts In</p>
      <div className="mt-4 flex justify-center gap-2 text-center">
        {[{ label: "Days", value: days }, { label: "Hours", value: hours }, { label: "Minutes", value: minutes }].map(
          (segment) => (
            <div key={segment.label} className="min-w-[74px] rounded-xl bg-black/40 px-4 py-3">
              <p className="text-2xl font-bold text-white">{formatNumber(segment.value)}</p>
              <p className="text-xs uppercase tracking-wide text-white/60">{segment.label}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
