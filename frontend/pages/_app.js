import "../styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "../components/Layout";
import { ToastProvider } from "../components/ToastProvider";

function MyApp({ Component, pageProps, router }) {
  return (
    <ToastProvider>
      <Layout>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </ToastProvider>
  );
}

export default MyApp;
