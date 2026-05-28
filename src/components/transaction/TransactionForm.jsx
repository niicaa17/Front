import { ReceiptText } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Swal from "sweetalert2";

import { getCategory, postCategory, postTransaksi } from "../../utils/api";

export default function TransactionForm({ onSuccess }) {
  const [type, setType] = useState("pengeluaran");
  const [source, setSource] = useState("Tabungan");
  const [amount, setAmount] = useState();
  const [categories, setCategories] = useState([]);
  const [nameCategory, setNameCategory] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const types = [
    { id: "pengeluaran", label: "Pengeluaran" },
    { id: "pemasukan", label: "Pemasukan" },
    { id: "bayar-utang", label: "Bayar Utang" },
  ];

  const sources = [
    { id: "final-budget", label: "Final Budget" },
    { id: "tabungan", label: "Tabungan" },
  ];

  const toDisplay = (val) => (val ? Number(val).toLocaleString("id-ID") : "");

  const handleAmount = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    setAmount(raw);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategory();

        if (res.statusCode === 200) {
          setCategories(res.Data);
        }
      } catch (error) {
        console.error("Gagal fetch kategori:", error);

        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Tidak dapat mengambil kategori",
          confirmButtonColor: "#dc2626",
        });
      }
    };

    fetchCategories();
  }, []);

  const handleCategory = async () => {
    try {
      const payload = {
        nama: nameCategory,
      };

      const res = await postCategory(payload);

      if (res.statusCode === 200) {
        setNameCategory("");

        const res2 = await getCategory();

        if (res2.statusCode === 200) {
          setCategories(res2.Data);

          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Kategori baru berhasil ditambahkan",
            confirmButtonColor: "#15157D",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.payload?.Message || error?.Message || "Terjadi kesalahan",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const handleTransaksi = async () => {
    try {
      const payload = {
        judul: title,
        nominal: Number(amount),
        tipe: type,

        ...(type !== "Bayar Utang" && {
          kategori_id: category,
        }),

        ...(type === "Pemasukan"
          ? { alokasi_ke: source }
          : { sumber_dana: source }),
      };

      const res = await postTransaksi(payload);
      console.log(res);
      if (res.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "Transaksi Berhasil",
          text: "Data transaksi berhasil disimpan",
          confirmButtonColor: "#15157D",
        });

        await onSuccess?.();

        setTitle("");
        setAmount("");
        setCategory("");
        setNameCategory("");
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.statusCode == 400 ? error.Message : "Lengkapi semua input",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/30 shadow-ambient"
    >
      <div className="flex items-center space-x-3.5 mb-8">
        <div className="p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
          <ReceiptText className="text-primary" size={20} />
        </div>

        <h2 className="text-[19px] font-extrabold text-[#121c2a] font-display manrope-headline">
          Transaksi Baru
        </h2>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-on-surface-variant tracking-normal">
            Judul Transaksi
          </label>

          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Misal: Belanja Kebutuhan..."
            className="input-field text-on-surface font-medium text-[15px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-on-surface-variant tracking-normal">
            Nominal (Rp)
          </label>

          <div className="input-field flex items-center gap-2 px-4">
            <span className="font-bold text-on-surface-variant/80 shrink-0">
              Rp
            </span>

            <input
              type="text"
              required
              value={toDisplay(amount)}
              onChange={handleAmount}
              placeholder="0"
              className="flex-1 outline-none font-bold text-lg bg-transparent py-2"
            />
          </div>
        </div>

        {type !== "Bayar Utang" && (
          <>
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-on-surface-variant tracking-normal">
                Kategori
              </label>

              <div className="relative">
                <select
                  required
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  className="input-field cursor-pointer pr-10 appearance-none font-medium text-[15px]"
                >
                  <option value="">Pilih Kategori...</option>

                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.nama}
                    </option>
                  ))}
                </select>

                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-on-surface-variant tracking-normal">
                Buat Kategori Sendiri (Opsional)
              </label>

              <div className="flex space-x-3.5">
                <input
                  type="text"
                  value={nameCategory}
                  placeholder="Nama kategori baru..."
                  className="input-field text-[15px] font-medium"
                  onChange={(e) => setNameCategory(e.target.value)}
                />

                <button
                  type="button"
                  onClick={handleCategory}
                  className="bg-primary hover:bg-primary-container text-white px-6 font-bold text-sm transition-all rounded-lg cursor-pointer h-[50px] shrink-0 active:scale-95"
                >
                  Submit
                </button>
              </div>
            </div>
          </>
        )}

        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-on-surface-variant tracking-normal">
            Tipe
          </label>

          <div className="grid grid-cols-3 gap-3">
            {types.map((t) => {
              const isActive = type === t.label;

              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.label)}
                  className={`py-3 px-2 rounded-lg text-sm font-semibold transition-all border cursor-pointer ${
                    isActive
                      ? "bg-surface-container-low border-primary/50 text-primary font-bold shadow-sm"
                      : "bg-[#f4f7fc]/50 border-transparent text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-on-surface-variant tracking-normal">
            {type == "Pemasukan" ? "Alokasi ke" : "Sumber Dana"}
          </label>

          <div className="grid grid-cols-2 gap-3">
            {sources.map((s) => {
              const isActive = source === s.label;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSource(s.label)}
                  className={`py-3 px-2 rounded-lg text-sm font-semibold transition-all border cursor-pointer ${
                    isActive
                      ? "bg-surface-container-low border-primary/50 text-primary font-bold shadow-sm"
                      : "bg-[#f4f7fc]/50 border-transparent text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          onClick={handleTransaksi}
          className="w-full bg-primary hover:bg-primary-container text-white h-14 rounded-lg font-bold text-base transition-all shadow-md shadow-primary/10 mt-6 active:scale-[0.99] cursor-pointer"
        >
          Simpan Data
        </button>
      </form>
    </motion.div>
  );
}
