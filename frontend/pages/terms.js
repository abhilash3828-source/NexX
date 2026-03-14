import Head from "next/head";

export default function Terms() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24">
      <Head>
        <title>Terms & Conditions | NEXX Esports</title>
      </Head>
      <h1 className="text-3xl font-semibold text-white">Terms & Conditions</h1>
      <p className="mt-4 text-sm text-white/70">
        Participation in NEXX Esports tournaments requires agreement to our rules and a commitment to fair play.
        We reserve the right to disqualify players who violate rules or engage in unsportsmanlike conduct.
      </p>
      <p className="mt-4 text-sm text-white/70">
        By registering, you certify that all information provided is accurate and that you agree to manual payment
        verification via UPI screenshot.
      </p>
    </div>
  );
}
