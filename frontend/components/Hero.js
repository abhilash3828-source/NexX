import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,209,255,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(83,232,255,0.14),transparent_60%)]" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 text-center">
        <div className="max-w-2xl">
          <Image src="/logo.svg" alt="NEXX Esports" width={180} height={70} priority />
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl"
          >
            Compete. Conquer. Become Legend.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-6 text-lg text-white/70"
          >
            The competitive arena for rising stars. Sign up for tournaments, track your progress, and join a community that plays to win.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Link
              href="/events"
              className="neon-btn rounded-full px-8 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
            >
              View Upcoming Tournaments
            </Link>
            <Link
              href="#about"
              className="rounded-full border border-white/15 px-8 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
            >
              Learn about NEXX
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
