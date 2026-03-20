export const tournaments = [
  {
    id: "freefire-solo",
    name: "Free Fire Solo Showdown",
    game: "Free Fire",
    entryFee: 20,
    currency: "₹",
    date: "2026-03-28T18:00:00.000Z",
    registrationDeadline: "2026-03-27T23:59:59.000Z",
    slots: 50,
    description:
      "Fast-paced solo action. Top 10 earn bonuses and a spot on the NEXX leaderboard.",
    coverImage: "/images/freefire-card.jpg",
    rules: [
      "Solo match, single elim.",
      "No cheating or hacks. Immediate ban.",
      "Follow event timings strictly.",
      "Keep your UID and payment proof ready."
    ],
    prizePool: "₹5,000 + NEXX Points"
  },
  {
    id: "valorant-5v5",
    name: "VALORANT 5v5 Clash",
    game: "VALORANT",
    entryFee: 150,
    currency: "₹",
    date: "2026-04-12T17:00:00.000Z",
    registrationDeadline: "2026-04-10T23:59:59.000Z",
    slots: 10,
    description:
      "Team-based tournament with drafts, strat calls, and competitive firepower.",
    coverImage: "/images/valorant-card.jpg",
    rules: [
      "Five players per team.",
      "No maps outside the official pool.",
      "Using third-party coaches is prohibited during matches.",
      "Report issues to admin immediately."
    ],
    prizePool: "₹12,000 + Prizes"
  }
];

export const pastTournaments = [
  {
    year: 2025,
    title: "NEXX Free Fire Cup",
    winner: "ShadowNinja",
    players: 260,
    link: "#"
  },
  {
    year: 2025,
    title: "NEXX Valorant Clash",
    winner: "ApexSquad",
    players: 72,
    link: "#"
  }
];
