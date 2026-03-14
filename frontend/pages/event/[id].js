import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { tournaments } from "../../lib/tournaments";
import Countdown from "../../components/Countdown";
import RegistrationForm from "../../components/RegistrationForm";
import { fetchSeats } from "../../lib/api";

export default function EventPage() {
  const router = useRouter();
  const { id } = router.query;
  const tournament = useMemo(() => tournaments.find((t) => t.id === id), [id]);
  const [seatsLeft, setSeatsLeft] = useState(tournament?.slots ?? 0);

  useEffect(() => {
    if (!id) return;
    fetchSeats().then((counts) => {
      const registered = counts[id] ?? 0;
      setSeatsLeft(Math.max((tournament?.slots ?? 0) - registered, 0));
    });
  }, [id, tournament]);

  if (!tournament) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24">
        <h1 className="text-3xl font-semibold text-white">Tournament not found</h1>
        <p className="mt-4 text-white/70">Try returning to the events page.</p>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{tournament.name} | NEXX Esports</title>
      </Head>
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h1 className="text-4xl font-semibold text-white">{tournament.name}</h1>
              <p className="mt-3 max-w-2xl text-sm text-white/70">{tournament.description}</p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-black/20 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Date</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {new Date(tournament.date).toLocaleString(undefined, {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                </div>
                <div className="rounded-2xl bg-black/20 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Entry fee</p>
                  <p className="mt-2 text-lg font-semibold text-white">{tournament.currency}{tournament.entryFee}</p>
                </div>
                <div className="rounded-2xl bg-black/20 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Slots</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {seatsLeft} / {tournament.slots}
                  </p>
                </div>
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h2 className="text-lg font-semibold text-white">Rules</h2>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70">
                    {tournament.rules.map((rule) => (
                      <li key={rule}>{rule}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h2 className="text-lg font-semibold text-white">Prize pool</h2>
                  <p className="mt-3 text-sm text-white/70">{tournament.prizePool}</p>
                  <p className="mt-4 text-xs text-white/50">
                    Prize distribution will be announced on the day of event.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Countdown targetDate={tournament.date} />
            <RegistrationForm
              eventId={tournament.id}
              maxSlots={tournament.slots}
              deadline={tournament.registrationDeadline}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
