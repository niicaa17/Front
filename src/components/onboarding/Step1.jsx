import { motion } from 'motion/react';
import { ShieldCheck} from 'lucide-react';
import person from '../../assets/person.png';

const toDisplay = (val) => val ? Number(val).toLocaleString('id-ID') : '';
const toNumber = (str) => Number(str.replace(/\./g, ''));

export default function Step1({ data, updateData, onNext }) {
  const inputClass = "w-full bg-surface-container-low border-none rounded-[8px] px-4 py-4 text-lg font-display placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all";
  const labelClass = "text-on-surface-variant font-medium text-xs mb-2 block uppercase tracking-wider";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-7xl mx-auto w-full px-8 py-12 flex flex-col lg:flex-row gap-16 items-start"
    >
      <div className="lg:w-1/2 pt-12">
        <h1 className="text-5xl font-display font-manrope font-extrabold text-on-surface tracking-tighter leading-[1.1] mb-8">
          Mari atur<br />keuangan Anda.
        </h1>
        <p className="text-on-surface-variant font-inter text-lg leading-relaxed max-w-md mb-12">
          Kami memerlukan beberapa detail untuk menyesuaikan ekosistem keuangan Anda. 
          Ketepatan di sini memastikan hasil maksimal nantinya.
        </p>
        
        <div className="flex items-center gap-4 bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant/10 max-w-sm">
          <div className="bg-primary/5 p-3 rounded-xl">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="font-bold text-on-surface text-sm font-manrope">Keamanan setara bank</div>
            <div className="text-on-surface-variant text-xs font-inter">Data Anda dienkripsi dan aman.</div>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 w-full font-inter">
        <div className="bg-surface-container-lowest rounded-xl p-10 shadow-ambient border border-outline-variant/5">
          <div className="flex items-center gap-3 mb-8">
            <img src={person} width={24} alt="" />
            <h2 className="text-xl font-display font-bold font-manrope">Detail Pribadi</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mb-10 rounded">
            <div>
              <label className={labelClass}>Usia</label>
              <input 
                type="number"
                placeholder="mis. 32"
                className={inputClass}
                value={data.usia}
                onChange={(e) => updateData({ usia: e.target.value })}
              />
            </div>

            <div>
              <label className={labelClass}>Pengeluaran Tetap per bulan</label>
              <input 
                type="text"
                placeholder="Rp 0"
                className={inputClass}
                value={toDisplay(data.pengeluaran)}
                onChange={(e) => updateData({ pengeluaran: toNumber(e.target.value) })}
              />
            </div>

            <div>
              <label className={labelClass}>Pemasukan per bulan</label>
              <input 
                type="text"
                placeholder="Rp 0"
                className={inputClass}
                value={toDisplay(data.pemasukan)}
                onChange={(e) => updateData({ pemasukan: toNumber(e.target.value) })}
              />
            </div>

            <div>
              <label className={labelClass}>Tabungan Awal</label>
              <input 
                type="text"
                placeholder="Rp 0"
                className={inputClass}
                value={toDisplay(data.tabungan_awal)}
                onChange={(e) => updateData({ tabungan_awal: toNumber(e.target.value) })}
              />
            </div>

            <div>
              <label className={labelClass}>Total Utang</label>
              <input 
                type="text"
                placeholder="Rp 0"
                className={inputClass}
                value={toDisplay(data.utang)}
                onChange={(e) => updateData({ utang: toNumber(e.target.value) })}
              />
            </div>

            <div>
              <label className={labelClass}>Tanggal Gajian</label>
              <input 
                type="text"
                placeholder="mis. 25"
                className={inputClass}
                value={data.tgl_gajian}
                onChange={(e) => updateData({ tgl_gajian: e.target.value })}
              />
            </div>
          </div>

          <button 
            onClick={onNext}
            className="w-full bg-primary hover:bg-primary-container text-white py-5 rounded-[8px] font-display font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 group"
          >
            Lanjutkan ke Strategi
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </button>

          <p className="text-center mt-6 text-on-surface-variant text-xs">
            Dengan melanjutkan, Anda menyetujui <span className="underline cursor-pointer">Kebijakan Privasi</span> kami.
          </p>
        </div>
      </div>
    </motion.div>
  );
}