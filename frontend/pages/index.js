import Link from "next/link";
import { useEffect, useState } from "react";
import { tournaments, pastTournaments } from "../lib/tournaments";
import Hero from "../components/Hero";
import TournamentCard from "../components/TournamentCard";
import StatCard from "../components/StatCard";
import { motion } from "framer-motion";
import { fetchSeats } from "../lib/api";

export default function Home() {
  const upcoming = tournaments.slice(0, 2);
  const [seats, setSeats] = useState({});

  useEffect(() => {
    let isMounted = true;
    fetchSeats()
      .then((data) => {
        if (isMounted) setSeats(data);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <Hero />

      <section id="about" className="section-glow relative mx-auto max-w-6xl px-4 py-24">
        <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">What is NEXX Esports?</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              NEXX Esports is the home of competitive gaming. We host weekly tournaments, provide live leaderboards,
              and support players across all skill levels. Compete in solo or team formats and win exclusive rewards.
            </p>
            <p className="mt-4 max-w-xl text-sm text-white/60">
              Built for the community, by gamers. Our platform uses lightweight UPI payment flows so you keep more money
              in your pocket.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/events"
                className="neon-btn inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
              >
                Explore Tournaments
              </Link>
              <a
                href="https://discord.gg/your-server"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
              >
                Join Discord
              </a>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-lg font-semibold text-white">Community stats</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <StatCard value="500+" label="Active players" />
                <StatCard value="35" label="Tournaments held" />
                <StatCard value="12k+" label="Matches played" />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-lg font-semibold text-white">Trust & credibility</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li>✅ Secure UPI payment with manual verification</li>
                <li>✅ Transparent tournament rules & leaderboard</li>
                <li>✅ 24/7 admin support on Discord</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-3xl font-semibold text-white">Upcoming tournaments</h2>
          <p className="text-sm text-white/60">Register early — seats are limited and fill fast.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {upcoming.map((tournament) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              registered={seats[tournament.id] || 0}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/events"
            className="neon-btn inline-flex items-center justify-center rounded-full px-10 py-3 text-sm font-semibold text-white shadow-glow"
          >
            View all tournaments
          </Link>
        </div>
      </section>

      <section className="section-glow relative mx-auto max-w-6xl px-4 py-24">
        <div className="relative z-10">
          <h2 className="text-3xl font-semibold text-white">Past tournaments</h2>
          <p className="mt-2 text-sm text-white/60">See what our community has won.</p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {pastTournaments.map((event) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                <p className="mt-2 text-sm text-white/70">Winner: {event.winner}</p>
                <p className="mt-1 text-sm text-white/70">Players: {event.players}</p>
                <Link
                  href={event.link}
                  className="mt-4 inline-flex text-sm font-semibold text-cyan-200 hover:text-cyan-100"
                >
                  View recap →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="sponsors" className="mx-auto max-w-6xl px-4 py-24">
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-3xl font-semibold text-white">Our sponsors</h2>
          <p className="text-sm text-white/60">Proudly supported by brands that power competitive play.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {["Apex Gear", "Glitch Labs", "Storm Audio", "CyberFuel"].map((name) => (
            <div
              key={name}
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center"
            >
              <p className="text-lg font-semibold text-white">{name}</p>
              <p className="mt-2 text-xs text-white/60">Official partner</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
