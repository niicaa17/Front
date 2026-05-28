import {
  ShieldCheck,
  PiggyBank,
  CreditCard,
  Briefcase,
  Lock,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { postCairkan, userFinancialProfile } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
);

const VaultPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const formatRupiah = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");

  useEffect(() => {
    const fetchProfileFinance = async () => {
      try {
        const res = await userFinancialProfile();

        if (res.statusCode === 200) {
          setData(res.Data);
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal Memuat Data",
            text: res?.message || "Tidak dapat mengambil data profil keuangan",
            confirmButtonColor: "#dc2626",
          });
        }
      } catch (error) {
        console.error(error);
        if (error.statusCode == 403) {
          Swal.fire({
            icon: "error",
            title: "Belum isi Onboarding",
            text: error.Message,
            confirmButtonColor: "#dc2626",
          }).then(()=>{
            navigate("/onboarding");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Terjadi Kesalahan",
            text: "Gagal menghubungi server. Silakan coba lagi nanti.",
            confirmButtonColor: "#dc2626",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileFinance();
  }, []);

  const isSehat = data?.batas_harian > data?.budget_aktif;

  const handleCairkan = async () => {
    try {
      const res = await postCairkan();

      if (res.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Dana berhasil dicairkan",
          confirmButtonColor: "#10b981",
        });

        const res2 = await userFinancialProfile();
        if (res2.statusCode === 200) {
          setData(res2.Data);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: res?.message || "Tidak dapat mencairkan dana",
          confirmButtonColor: "#dc2626",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: error.statusCode == 400 ? error.Message : "Terjadi kesalahan",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <main className="md:ml-[260px] min-h-screen p-8">
        <div className="flex flex-col gap-8 w-full">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Vault — Kelola Aset
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Atur aset kamu disini...
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-8 hover:shadow-md">
            {loading ? (
              <>
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-10 w-52" />
                  </div>
                  <Skeleton className="h-10 w-28 rounded-lg" />
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                      Safety Net
                    </p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">
                      {formatRupiah(data?.dana_darurat?.nominal ?? 0)}
                    </p>
                  </div>

                  <button
                    disabled={!isSehat}
                    onClick={handleCairkan}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase border transition-all
                    ${
                      isSehat
                        ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-200 cursor-pointer"
                        : "bg-rose-50 text-rose-600 border-rose-200 cursor-not-allowed opacity-50"
                    }`}
                  >
                    <Lock
                      size={13}
                      className={isSehat ? "animate-pulse" : ""}
                    />
                    Cairkan
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 text-sm">
                  <ShieldCheck className="text-primary" />
                  <span
                    className={
                      isSehat
                        ? "text-emerald-600 font-medium"
                        : "text-slate-400"
                    }
                  >
                    {isSehat
                      ? "Dana Darurat diamankan"
                      : "Kondisi keuangan perlu perhatian"}
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white border border-slate-200 rounded-lg p-6 h-[160px]"
                  >
                    <div className="flex items-center gap-2 mb-8">
                      <Skeleton className="w-5 h-5 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="space-y-3">
                      <Skeleton className="h-3 w-28" />
                      <Skeleton className="h-8 w-40" />
                    </div>
                  </div>
                ))
              : [
                  {
                    label: "Tabungan",
                    sub: "Total Tersimpan",
                    value: formatRupiah(data?.tabungan_awal ?? 0),
                    icon: PiggyBank,
                    iconClass: "text-blue-600",
                  },
                  {
                    label: "Utang",
                    sub: "Sisa Pembayaran",
                    value: formatRupiah(data?.utang ?? 0),
                    icon: CreditCard,
                    iconClass: "text-rose-500",
                  },
                  {
                    label: "Final Budget",
                    sub: "Total Anggaran",
                    value: formatRupiah(data?.budget_aktif ?? 0),
                    icon: Briefcase,
                    iconClass: "text-indigo-600",
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between h-[160px] hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2">
                      <card.icon size={18} className={card.iconClass} />
                      <span className="font-bold text-sm text-slate-800">
                        {card.label}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 uppercase tracking-wider">
                        {card.sub}
                      </span>
                      <div className="text-2xl font-bold text-slate-900 mt-0.5">
                        {card.value}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VaultPage;
