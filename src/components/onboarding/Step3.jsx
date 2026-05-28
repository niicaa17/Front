import { motion } from "motion/react";
import {
  Wallet,
  Pencil,
  Send,
  History,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import { formatCurrency } from "../../utils/formcurrency";

const SummaryItem = ({ icon: Icon, label, value, type = "negative" }) => (
  <div className="flex items-center justify-between py-4 group">
    <div className="flex items-center gap-4">
      <div className="p-2 rounded-lg bg-surface-container-low text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-on-surface font-medium">{label}</span>
    </div>
    <span
      className={
        type === "positive"
          ? "text-secondary font-bold"
          : "text-[#BA1A1A] font-bold"
      }
    >
      {type === "negative" ? "-" : ""} {formatCurrency(value)}
    </span>
  </div>
);

export default function Step3({ data, onEdit, onSave }) {
  const dailyBudget = Math.max(
    0,
    (data.pemasukan -
      data.pengeluaran -
      data.emi -
      data.safety_net_nominal) /
      30,
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="max-w-2xl mx-auto w-full px-8 py-12"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-manrope font-extrabold text-primary mb-3 font">
          Ringkasan Profil
        </h1>
        <p className="text-on-surface-variant max-w-sm mx-auto font-inter">
          Pastikan semua data sudah sesuai sebelum kita mulai.
        </p>
      </div>

      <div className="bg-surface-container-lowest rounded-3xl shadow-ambient border border-outline-variant/5 overflow-hidden transition-all hover:shadow-2xl">
        <div className="fp-8 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-row pt-15 gap-2 pl-4">
            <div className="bg-primary w-fit p-3 rounded-lg mb-4 backdrop-blur-md">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-on-primary/60 font-inter text-xs font-bold uppercase tracking-widest mb-1 text-primary">
                Total Pemasukan
              </div>
              <div className="text-[24px] font-manrope font-extrabold text-primary">
                {formatCurrency(data.pemasukan)}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-2 font-inter">
          <SummaryItem
            icon={History}
            label="Pengeluaran Tetap"
            value={data.pengeluaran}
          />
          <SummaryItem
            icon={CreditCard}
            label="Bayar Utang (EMI)"
            value={data.emi}
          />
          <SummaryItem
            icon={ShieldCheck}
            label="Safety Net"
            value={data.safety_net_nominal}
          />

          <div className="w-full h-px bg-outline-variant/10 my-4" />

          <div className="bg-secondary-container/80 rounded-lg p-6 flex items-center justify-between border border-secondary/10 transition-colors">
            <div className="flex gap-4 items-center">
              <div className="bg-secondary p-3 rounded-xl text-white shadow-lg">
                <History className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">
                  Sisa Jajan Harian
                </div>
                <div className="text-[10px] text-secondary/60">
                  Estimasi pengeluaran per hari
                </div>
              </div>
            </div>
            <div className="text-2xl font-display font-extrabold text-secondary">
              {formatCurrency(dailyBudget)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={onEdit}
          className="flex-1 bg-surface-container-lowest border border-outline-variant/30 hover:bg-surface-container-low py-5 rounded-lg  font-display font-bold text-lg transition-all flex items-center justify-center gap-3"
        >
          <Pencil className="w-5 h-5" />
          Edit
        </button>
        <button
          onClick={onSave}
          className="flex-[1.5] bg-primary hover:bg-primary-container text-white py-5 rounded-lg font-display font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
        >
          Konfirmasi & Simpan
          <Send className="w-5 h-5" />
        </button>
      </div>

      <p className="text-center mt-8 text-on-surface-variant text-[10px] font-inter font-bold uppercase tracking-widest">
        Data terenkripsi dan aman bersama CukuPin
      </p>
    </motion.div>
  );
}