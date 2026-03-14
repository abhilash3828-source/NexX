import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { fetchParticipants, updateRegistration } from "../lib/api";
import { useToast } from "../components/ToastProvider";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASS || "nexxadmin";

export default function AdminPage() {
  const toast = useToast();
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);

  const approvedCount = useMemo(
    () => participants.filter((p) => p.status === "approved").length,
    [participants]
  );

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    fetchParticipants()
      .then((data) => setParticipants(data))
      .catch(() => toast.pushToast("Failed to load participants.", "error"))
      .finally(() => setLoading(false));
  }, [authed, toast]);

  const handleApprove = async (item) => {
    try {
      const updated = await updateRegistration(item.id, { status: "approved" });
      setParticipants((prev) => prev.map((p) => (p.id === item.id ? updated : p)));
      toast.pushToast(`Approved ${item.inGameName}`, "success");
    } catch (err) {
      toast.pushToast(err.message || "Could not approve", "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
    } else {
      toast.pushToast("Invalid password.", "error");
    }
  };

  if (!authed) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24">
        <Head>
          <title>Admin dashboard | NEXX Esports</title>
        </Head>
        <h1 className="text-3xl font-semibold text-white">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-white/70">
          Enter the admin password to view participant registrations and approve players.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="neon-btn w-full rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow"
          >
            Unlock dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-24">
      <Head>
        <title>Admin dashboard | NEXX Esports</title>
      </Head>
      <div className="flex flex-col gap-8">
        <header>
          <h1 className="text-3xl font-semibold text-white">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-white/70">
            Manage registrations, approve players, and export data for manual verification.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-semibold text-white/70">Total registrations</p>
            <p className="mt-2 text-3xl font-bold text-white">{participants.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-semibold text-white/70">Approved</p>
            <p className="mt-2 text-3xl font-bold text-white">{approvedCount}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-semibold text-white/70">Pending</p>
            <p className="mt-2 text-3xl font-bold text-white">{participants.length - approvedCount}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Registrations</h2>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const csv = [
                  [
                    "Name",
                    "In Game Name",
                    "UID",
                    "Phone",
                    "Email",
                    "Transaction ID",
                    "Screenshot URL",
                    "Registered At",
                    "Status"
                  ],
                  ...participants.map((p) => [
                    p.fullName,
                    p.inGameName,
                    p.uid,
                    p.phone,
                    p.email,
                    p.txnId,
                    p.screenshotUrl,
                    p.createdAt,
                    p.status
                  ])
                ]
                  .map((row) => row.map((cell) => `"${String(cell || "").replace(/"/g, '""')}"`).join(","))
                  .join("\n");
                const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "nexx-registrations.csv";
                link.click();
              }}
              className="text-sm font-semibold text-cyan-200 hover:text-cyan-100"
            >
              Export CSV
            </a>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_0.6fr] gap-4 border-b border-white/10 bg-black/20 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white/70">
              <span>Name</span>
              <span>UID</span>
              <span>Txn ID</span>
              <span>Status</span>
              <span>Action</span>
            </div>
            {loading ? (
              <div className="p-8 text-center text-white/70">Loading...</div>
            ) : participants.length === 0 ? (
              <div className="p-8 text-center text-white/70">No registrations yet.</div>
            ) : (
              <div className="divide-y divide-white/10">
                {participants.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1.2fr_1fr_1fr_0.7fr_0.9fr] gap-4 px-4 py-4 text-sm text-white/80"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-white">{item.fullName}</span>
                      <span className="text-xs text-white/50">{item.inGameName}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">{item.uid}</span>
                    </div>
                    <div>
                      <span className="text-xs text-white/70">{item.txnId}</span>
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "approved"
                            ? "bg-emerald-500/20 text-emerald-200"
                            : "bg-yellow-500/20 text-yellow-200"
                        }`}
                      >
                        {item.status || "pending"}
                      </span>
                    </div>
                    <div>
                      <button
                        disabled={item.status === "approved"}
                        type="button"
                        onClick={() => handleApprove(item)}
                        className="rounded-full bg-cyan-500/10 px-4 py-1 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
