import Link from "next/link";
import Image from "next/image";

export default function TournamentCard({ tournament, seatsLeft = 0 }) {
  const seats = seatsLeft ?? tournament.slots;
  const isFull = seats <= 0;
  const upcoming = new Date(tournament.date) > new Date();

  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f1a] shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      <div className="relative h-48 w-full">
        <Image
          src={tournament.coverImage}
          alt={tournament.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <p className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
            {tournament.game}
          </p>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white">{tournament.name}</h3>
        <p className="mt-2 text-sm text-white/60 line-clamp-2">{tournament.description}</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-xs uppercase tracking-widest text-white/50">Entry</p>
            <p className="mt-1 text-sm font-semibold text-white">{tournament.currency}{tournament.entryFee}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-xs uppercase tracking-widest text-white/50">Slots</p>
            <p className="mt-1 text-sm font-semibold text-white">
              {Math.max(seats, 0)} / {tournament.slots}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-white/50">
            {new Date(tournament.date).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric"
            })}
          </p>
          <Link
            href={isFull ? "/events" : `/event/${tournament.id}`}
            className={`inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition ${
              isFull
                ? "cursor-not-allowed bg-white/10 text-white/40"
                : "neon-btn text-white shadow-glow hover:scale-[1.02]"
            }`}
          >
            {isFull ? "Full" : upcoming ? "Register" : "Details"}
          </Link>
        </div>
      </div>
    </article>
  );
}
