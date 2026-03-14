import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode.react";
import { postRegistration, fetchSeats } from "../lib/api";
import { useToast } from "./ToastProvider";

const initialFields = {
  fullName: "",
  inGameName: "",
  uid: "",
  phone: "",
  email: "",
  txnId: "",
  screenshot: null
};

export default function RegistrationForm({ eventId, maxSlots, deadline }) {
  const toast = useToast();
  const [fields, setFields] = useState(initialFields);
  const [loading, setLoading] = useState(false);
  const [seatsLeft, setSeatsLeft] = useState(maxSlots);
  const [full, setFull] = useState(false);
  const formRef = useRef(null);

  const canRegister = useMemo(
    () => !full && !loading && new Date() < new Date(deadline),
    [full, loading, deadline]
  );

  useEffect(() => {
    let mounted = true;
    fetchSeats().then((counts) => {
      if (!mounted) return;
      const registered = counts[eventId] ?? 0;
      setSeatsLeft(Math.max(maxSlots - registered, 0));
      setFull(registered >= maxSlots);
    });
    return () => {
      mounted = false;
    };
  }, [eventId, maxSlots]);

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "screenshot") {
      setFields((prev) => ({ ...prev, screenshot: files?.[0] ?? null }));
      return;
    }
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setFields(initialFields);
    if (formRef.current) formRef.current.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (full) {
      toast.pushToast("Tournament is full. Registration closed.", "error");
      return;
    }

    if (!fields.uid || !fields.fullName || !fields.txnId || !fields.screenshot) {
      toast.pushToast("Please fill in all fields and upload your payment screenshot.", "error");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("fullName", fields.fullName);
    formData.append("inGameName", fields.inGameName);
    formData.append("uid", fields.uid);
    formData.append("phone", fields.phone);
    formData.append("email", fields.email);
    formData.append("txnId", fields.txnId);
    formData.append("screenshot", fields.screenshot);

    try {
      await postRegistration(eventId, formData);
      toast.pushToast("Registration successful! Wait for admin approval.", "success");
      reset();
      // Refresh seats
      const counts = await fetchSeats();
      const registered = counts[eventId] ?? 0;
      setSeatsLeft(Math.max(maxSlots - registered, 0));
      setFull(registered >= maxSlots);
    } catch (error) {
      toast.pushToast(error.message || "Registration failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white/70">Seats left</p>
          <p className="text-2xl font-bold text-white">{seatsLeft} / {maxSlots}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white/70">Entry fee</p>
          <p className="text-2xl font-bold text-white">₹20</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-black/20 p-4">
        <p className="text-sm font-semibold text-white/80">Pay ₹20 using UPI</p>
        <p className="mt-1 text-sm text-white/70">
          Scan the QR or pay to <span className="font-semibold text-white">nexxesports@upi</span>
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="space-y-2 rounded-xl bg-white/5 p-4">
            <p className="text-xs text-white/60">UPI URI</p>
            <code className="break-all text-sm text-white/80">upi://pay?pa=nexxesports@upi&amp;pn=NEXX%20Esports&amp;am=20</code>
            <p className="text-xs text-white/60">Tip: Copy & paste into your UPI app or scan the QR code.</p>
          </div>
          <div className="flex items-center justify-center rounded-xl bg-white/5 p-4">
            <QRCode
              value="upi://pay?pa=nexxesports@upi&pn=NEXX%20Esports&am=20"
              size={140}
              bgColor="#0b0f1a"
              fgColor="#00d1ff"
              level="H"
              includeMargin
            />
          </div>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm text-white/70">
            Full Name
            <input
              name="fullName"
              required
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
            />
          </label>
          <label className="block text-sm text-white/70">
            In Game Name
            <input
              name="inGameName"
              required
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm text-white/70">
            Free Fire UID
            <input
              name="uid"
              required
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
            />
          </label>
          <label className="block text-sm text-white/70">
            Phone Number
            <input
              name="phone"
              type="tel"
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm text-white/70">
            Email
            <input
              name="email"
              type="email"
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
            />
          </label>
          <label className="block text-sm text-white/70">
            UPI Transaction ID
            <input
              name="txnId"
              required
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm text-white/70">
            Upload Payment Screenshot
            <input
              name="screenshot"
              type="file"
              accept="image/*"
              required
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
            />
          </label>
        </div>

        <button
          type="submit"
          className={`neon-btn w-full rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow transition ${
            !canRegister ? "cursor-not-allowed opacity-60" : "hover:scale-[1.02]"
          }`}
          disabled={!canRegister}
        >
          {full ? "Tournament Full" : loading ? "Registering..." : "Register Now"}
        </button>

        {new Date() > new Date(deadline) ? (
          <p className="text-sm text-rose-200">Registration deadline has passed.</p>
        ) : null}
      </form>
    </div>
  );
}
