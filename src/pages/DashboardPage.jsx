import { ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { userFinancialProfile, getTransaksi } from "../utils/api";
import Swal from "sweetalert2";
import TransactionHistory from "../components/transaction/TransactionHistory";
import Sidebar from "../components/sideBar.jsx";
import { useNavigate } from "react-router-dom";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
);

const MetricCardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
    <Skeleton className="h-3 w-24 mb-4" />
    <Skeleton className="h-8 w-32" />
    <Skeleton className="h-3 w-20 mt-4" />
  </div>
);

const MetricCard = ({
  title,
  value,
  unit,
  subtitle,
  status,
  accent = false,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className={`bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 ${
      accent ? "border-l-4 border-l-[#15157D]" : ""
    }`}
  >
    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">
      {title}
    </h3>

    <div
      className={`flex items-baseline gap-2 ${
        accent ? "text-slate-900" : "text-[#15157D]"
      }`}
    >
      <span className="text-3xl font-bold tracking-tight">{value}</span>

      {unit && (
        <span className="text-xl font-semibold text-slate-500">{unit}</span>
      )}
    </div>

    {status && (
      <div className="mt-3 bg-emerald-100 text-emerald-600 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
        {status}
      </div>
    )}

    {subtitle && (
      <p
        className={`text-[10px] mt-4 font-medium ${
          accent ? "text-[#15157D]" : "text-slate-400"
        }`}
      >
        {subtitle}
      </p>
    )}
  </motion.div>
);

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [data, setData] = useState({});
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const tanggal = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, transaksiRes] = await Promise.all([
          userFinancialProfile(),
          getTransaksi(),
        ]);

        if (profileRes.statusCode === 200) {
          setData(profileRes.Data);
        }

        if (transaksiRes.statusCode === 200) {
          setTransactions(transaksiRes.Data.histori);
        }
      } catch (error) {
        console.log(error);
        if (error.statusCode == 403) {
          Swal.fire({
            icon: "error",
            title: "Belum isi Onboarding",
            text: error.Message,
            confirmButtonColor: "#dc2626",
          }).then(() => {
            navigate("/onboarding");
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-slate-900 font-sans">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="md:ml-[260px] pb-12">
        <main className="px-6 md:px-10 max-w-6xl mx-auto space-y-8 pt-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
              Selamat datang 👋
            </h2>

            <p className="text-sm font-medium text-slate-400 mt-1">{tanggal}</p>
          </motion.div>

          {/* Metric Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {loading ? (
              <>
                <MetricCardSkeleton />
                <MetricCardSkeleton />
                <MetricCardSkeleton />
              </>
            ) : (
              <>
                <MetricCard
                  title="Sisa Runway"
                  value={data?.sisa_runway}
                  unit="hari"
                  subtitle="Aman hingga siklus gajian berikutnya"
                  delay={0.1}
                />

                <MetricCard
                  title="Skor Kredit"
                  value={data?.skor_kredit}
                  status={data?.status_keuangan}
                  delay={0.2}
                />

                <MetricCard
                  title="Batas Harian"
                  value={`Rp ${
                    data?.batas_harian?.toLocaleString("id-ID") ?? 0
                  }`}
                  delay={0.3}
                />
              </>
            )}
          </section>

          {/* Safety Net */}
          {loading ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center gap-5 shadow-sm">
              <Skeleton className="w-12 h-12 rounded-2xl" />

              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-6 w-36" />
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center gap-5 shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#15157D]">
                <ShieldCheck size={28} />
              </div>

              <div className="space-y-0.5">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Safety Net
                </h4>

                <div className="text-xl font-bold text-slate-800">
                  Rp {data?.dana_darurat?.nominal?.toLocaleString("id-ID") ?? 0}
                </div>
              </div>
            </motion.div>
          )}

          {/* Transaction */}
          <TransactionHistory loading={loading} transactions={transactions} />
        </main>
      </div>
    </div>
  );
}
