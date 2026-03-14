import { useEffect, useState } from "react";
import Head from "next/head";
import { tournaments } from "../lib/tournaments";
import TournamentCard from "../components/TournamentCard";
import { fetchSeats } from "../lib/api";

export default function Events() {
  const [seats, setSeats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchSeats()
      .then((data) => {
        if (isMounted) setSeats(data);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Upcoming Tournaments | NEXX Esports</title>
      </Head>
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold text-white">Upcoming events</h1>
          <p className="max-w-2xl text-sm text-white/70">
            Browse upcoming tournaments, register early, and earn your spot on the leaderboard.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {tournaments.map((tournament) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              seatsLeft={
                loading ? tournament.slots : Math.max(tournament.slots - (seats[tournament.id] || 0), 0)
              }
            />
          ))}
        </div>

        <p className="mt-10 text-sm text-white/60">
          {loading
            ? "Loading seat availability..."
            : "Seat availability updates in real-time as players register."}
        </p>
      </section>
    </div>
  );
}
