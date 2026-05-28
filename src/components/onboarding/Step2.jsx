import { motion } from "motion/react";
import { PiggyBank, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "../../utils/formcurrency";

const toDisplay = (val) => (val ? Number(val).toLocaleString("id-ID") : "");
const toNumber = (str) => Number(str.replace(/\./g, ""));

export default function Step2({ data, updateData, onNext, onBack }) {
  const inputClass =
    "w-full bg-surface-container-low border-none rounded-lg pl-16 pr-12 py-5 text-2xl font-display font-bold placeholder:text-on-surface-variant/20 outline-none transition-all text-left";
  const labelClass =
    "text-on-surface font-display font-bold text-[16px] font-manrope mb-4 block";

  const dailyBudget = Math.max(
    0,
    (data.pemasukan - data.pengeluaran - data.emi - data.safety_net_nominal) /
      30,
  );

  const presetsDebt = [
    {
      label: `Bayar Rp ${toDisplay(data.utang / 6)} → lunas 6 bulan`,
      value: data.utang / 6,
    },
    {
      label: `Bayar Rp ${toDisplay(data.utang / 12)} → lunas 12 bulan`,
      value: data.utang / 12,
    },
  ];

  const presetsSafety = [
    {
      label: `10% Pemasukan: ${formatCurrency(data.pemasukan * 0.1)}`,
      value: data.pemasukan * 0.1,
    },
    {
      label: `20% Pemasukan: ${formatCurrency(data.pemasukan * 0.2)}`,
      value: data.pemasukan * 0.2,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto w-full px-8 py-12"
    >
      <div className="text-center mb-12 font-manrope">
        <h1 className="text-4xl font-display font-extrabold text-primary mb-3">
          Alokasi Pengeluaran
        </h1>
        <p className="text-on-surface-variant">
          Tentukan prioritas keuanganmu untuk bulan ini
        </p>
      </div>

      <div className="bg-surface-container-lowest rounded-lg p-10 shadow-ambient border border-outline-variant/5">
        <div className="mb-10">
          <label className={labelClass}>
            Nominal Bayar Utang per bulan (EMI)
          </label>
          <div className="relative mb-4">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-xl font-inter">
              Rp
            </span>
            <input
              type="text"
              placeholder="0"
              className={inputClass}
              value={toDisplay(data.emi)}
              onChange={(e) => updateData({ emi: toNumber(e.target.value) })}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {presetsDebt.map((p) => (
              <button
                key={p.label}
                onClick={() => updateData({ emi: p.value })}
                className="text-[10px] sm:text-xs font-semibold px-4 py-2 rounded-lg bg-surface-container-low text-primary hover:bg-primary/10 transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <label className={labelClass}>Nominal Safety Net per bulan</label>
          <div className="relative mb-4">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-xl font-inter">
              Rp
            </span>
            <input
              type="text"
              placeholder="0"
              className={inputClass}
              value={toDisplay(data.safety_net_nominal)}
              onChange={(e) =>
                updateData({ safety_net_nominal: toNumber(e.target.value) })
              }
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {presetsSafety.map((p) => (
              <button
                key={p.label}
                onClick={() => updateData({ safety_net_nominal: p.value })}
                className="text-[10px] sm:text-xs font-semibold px-4 py-2 rounded-lg bg-surface-container-low text-primary hover:bg-primary/10 transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-10">
          <p className={labelClass}>Sweeping untuk bulan depan</p>
          <div className="flex gap-3">
            {["Final Budget", "Tabungan"].map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors text-sm font-semibold font-manrope
          ${
            data.sweeping === opt
              ? "bg-primary/10 border-primary text-primary"
              : "bg-surface-container-low border-outline-variant/30 text-on-surface-variant hover:bg-primary/5"
          }`}
              >
                <input
                  type="radio"
                  name="sweeping"
                  value={opt}
                  checked={data.sweeping === opt}
                  onChange={() => updateData({ sweeping: opt })}
                  className="sr-only"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div className="bg-[#6CF8BB]/30 border-secondary rounded-lg p-6 mb-10 flex items-center justify-between border border-secondary/10 relative overflow-hidden font-manrope">
          <div className="flex gap-4 items-center z-10">
            <div className="bg-[#6CF8BB] p-3 rounded-lg text-white">
              <PiggyBank className="w-8 h-8 text-secondary" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-1">
                Health Indicator
              </div>
              <div className="text-xl font-display font-extrabold text-secondary leading-tight">
                Sisa jatah jajan harian:
              </div>
              <div className="text-3xl font-display font-extrabold text-secondary mt-1">
                {formatCurrency(dailyBudget)}
              </div>
            </div>
          </div>
          <CheckCircle2 className="w-24 h-24 text-secondary/10 absolute -right-2 top-1/2 -translate-y-1/2 rotate-12" />
        </div>

        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 border border-outline-variant/30 hover:bg-surface-container-low py-5 rounded-lg font-display font-bold text-lg transition-all"
          >
            Kembali
          </button>
          <button
            onClick={onNext}
            className="flex-1 bg-primary hover:bg-primary-container text-white py-5 rounded-lg font-display font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Selanjutnya
          </button>
        </div>
      </div>

      <p className="text-center mt-8 text-on-surface-variant text-[11px] leading-relaxed max-w-sm mx-auto">
        Data ini digunakan untuk menghitung limit pengeluaran harianmu agar
        kondisi finansialmu tetap terjaga di zona aman.
      </p>
    </motion.div>
  );
}
