import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(0,209,255,0.12),transparent_55%),radial-gradient(circle_at_bottom,rgba(83,232,255,0.1),transparent_55%),var(--background)] text-white">
      <Navbar />
      <main className="relative pt-24">{children}</main>
      <Footer />
    </div>
  );
}
