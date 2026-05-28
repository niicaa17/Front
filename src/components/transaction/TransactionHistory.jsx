import {
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { motion } from "motion/react";

export default function TransactionHistory({
  transactions,
  loading,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-ambient"
    >
      {/* Header */}
      <div className="p-6 md:p-8 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-[#121c2a] font-display manrope-headline">
          Riwayat Terkini
        </h2>

        <div className="flex space-x-1.5">
          <button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors text-on-surface-variant cursor-pointer">
            <Filter size={19} />
          </button>

          <button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors text-on-surface-variant cursor-pointer">
            <MoreVertical size={19} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-container-low text-left">
              <th className="px-6 md:px-8 py-4 text-xs font-bold uppercase">
                No
              </th>

              <th className="px-6 md:px-8 py-4 text-xs font-bold uppercase">
                Judul
              </th>

              <th className="px-6 md:px-8 py-4 text-xs font-bold uppercase">
                Sumber Dana
              </th>

              <th className="px-6 md:px-8 py-4 text-xs font-bold uppercase text-right md:text-left">
                Nominal
              </th>

              <th className="px-6 md:px-8 py-4 text-xs font-bold uppercase text-right">
                Tanggal
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-outline-variant/20">
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 md:px-8 py-5">
                      <div className="h-4 w-6 rounded bg-gray-200 animate-pulse" />
                    </td>

                    <td className="px-6 md:px-8 py-5">
                      <div className="h-4 w-32 rounded bg-gray-200 animate-pulse" />
                    </td>

                    <td className="px-6 md:px-8 py-5">
                      <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
                    </td>

                    <td className="px-6 md:px-8 py-5">
                      <div className="h-4 w-24 ml-auto md:ml-0 rounded bg-gray-200 animate-pulse" />
                    </td>

                    <td className="px-6 md:px-8 py-5">
                      <div className="h-4 w-20 ml-auto rounded bg-gray-200 animate-pulse" />
                    </td>
                  </tr>
                ))
              : transactions.map((tx, index) => (
                  <tr
                    key={tx._id}
                    className="hover:bg-surface-container-low/30 transition-colors"
                  >
                    <td className="px-6 md:px-8 py-5 text-sm font-medium text-on-surface-variant/70">
                      {index + 1}
                    </td>

                    <td className="px-6 md:px-8 py-5">
                      <span className="font-bold text-[#121c2a] text-[15px]">
                        {tx.judul}
                      </span>
                    </td>

                    <td className="px-6 md:px-8 py-5">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {tx.sumber_dana || "-"}
                      </span>
                    </td>

                    <td
                      className={`px-6 md:px-8 py-5 text-sm font-bold text-right md:text-left ${
                        tx.tipe === "Pemasukan"
                          ? "text-emerald-500"
                          : "text-rose-500"
                      }`}
                    >
                      {tx.tipe === "Pemasukan" ? "+" : "-"} Rp{" "}
                      {Number(tx.nominal).toLocaleString("id-ID")}
                    </td>

                    <td className="px-6 md:px-8 py-5 text-sm font-medium text-on-surface-variant/75 text-right">
                      {new Date(tx.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-6 bg-surface-container-low/40 border-t border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm font-semibold text-on-surface-variant">
          Menampilkan 1-4 dari 42 transaksi
        </span>

        <div className="flex items-center space-x-2">
          <button
            className="p-1.5 text-on-surface-variant/55 hover:text-on-surface disabled:opacity-30 cursor-pointer"
            disabled
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex space-x-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#15157d] text-white font-bold text-sm">
              1
            </button>
          </div>

          <button className="p-1.5 text-on-surface-variant/55 hover:text-on-surface cursor-pointer">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}