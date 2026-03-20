import Head from "next/head";

export default function Privacy() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24">
      <Head>
        <title>Privacy Policy | NEXX Esports</title>
      </Head>
      <h1 className="text-3xl font-semibold text-white">Privacy Policy</h1>
      <p className="mt-4 text-sm text-white/70">
        NEXX Esports respects your privacy. We collect only the information required to register you for tournaments.
        Personal data is used only for contact and verification purposes and is not shared with third parties.
      </p>
      <p className="mt-4 text-sm text-white/70">
        For questions about your data, contact us at <a href="mailto:support@nexxesports.com" className="text-cyan-200">support@nexxesports.com</a>.
      </p>
    </div>
  );
}
