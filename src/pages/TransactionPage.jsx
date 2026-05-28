import { useEffect, useState } from "react";
import { motion } from "motion/react";

import Sidebar from "../components/Sidebar";
import TransactionForm from "../components/transaction/TransactionForm";
import TransactionHistory from "../components/transaction/TransactionHistory";

import { getTransaksi } from "../utils/api";

export default function App() {
  const [activeTab] = useState("transaksi");

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const res = await getTransaksi();

      if (res.statusCode === 200) {
        setTransactions(res.Data.histori);
      }
    } catch (error) {
      console.error("Gagal fetch transaksi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-brand-background text-brand-text flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} />

      {/* Main */}
      <main className="flex-1 ml-[260px] p-8 md:p-12 h-screen overflow-y-auto custom-scrollbar">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Header */}
          <header className="mb-12">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold text-brand-text tracking-tight mb-2"
            >
              Kelola Transaksi
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-brand-text-muted text-lg font-medium"
            >
              Catat dan pantau arus kas Anda secara akurat.
            </motion.p>
          </header>

          <div className="grid grid-cols-1 gap-10">

            {/* Form */}
            <section id="new-transaction">
              <TransactionForm
                onSuccess={fetchTransactions}
              />
            </section>

            {/* History */}
            <section id="history" className="pb-12">
              <TransactionHistory
                transactions={transactions}
                loading={loading}
              />
            </section>

          </div>
        </div>
      </main>

      {/* Background */}
      <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="fixed bottom-0 left-[260px] -z-10 w-[400px] h-[400px] bg-brand-secondary/5 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}