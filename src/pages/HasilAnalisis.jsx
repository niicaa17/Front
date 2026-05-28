import start from "../assets/star.png";
import gembok from "../assets/gembok.png";
import wallet from "../assets/wallet.png";
import statik from "../assets/statik.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userFinancialProfile } from "../utils/api";

const HasilAnalisis = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const res = await userFinancialProfile(token);

        setData(res.Data);
      } catch (err) {
        console.log(err);

        if (err?.statusCode === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleButton = () => {
    navigate("/dashboard");
  };

  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-background">
      <main className="flex flex-col items-center gap-6">
        <div>
          <h1 className="font-inter font-bold text-[36px] text-button">
            Analisis Selesai!
          </h1>

          <p className="text-[#64748B] font-inter font-medium text-[16px]">
            Berikut hasil kondisi keuangan kamu bulan ini.
          </p>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-4">
            {/* skor kredit */}
            <div className="flex flex-col gap-2 w-93 p-4 bg-white rounded-xl border-2 border-[#E5E7EB]">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-1">
                  <img src={start} alt="start" className="w-5 h-5" />

                  <p className="text-[#64748B] font-inter text-[12px] font-medium">
                    SKOR KREDIT
                  </p>
                </div>

                <span className="bg-[#D1FAE5] text-[#047857] font-inter font-bold text-[10px] p-2 rounded-full">
                  {data?.status_keuangan}
                </span>
              </div>

              <p className="font-inter font-bold text-[36px] text-button">
                {data?.skor_kredit}
              </p>
            </div>

            {/* budget */}
            <div className="flex flex-col gap-7 w-93 p-4 bg-white rounded-xl border-2 border-[#E5E7EB]">
              <div className="flex flex-row gap-3">
                <img src={wallet} alt="wallet" className="w-5 h-5" />

                <p className="text-[#64748B] font-inter text-[12px] font-medium">
                  BUDGET HARIAN
                </p>
              </div>

              <p className="font-inter font-semibold text-[24px] text-button">
                {formatRupiah(data?.batas_harian || 0)}
              </p>
            </div>

            {/* safety net */}
            <div className="flex flex-col gap-2 w-93 p-4 bg-white rounded-xl border-2 border-[#E5E7EB]">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-1">
                  <img src={gembok} alt="gembok" className="w-5 h-5" />

                  <p className="text-[#64748B] font-inter text-[12px] font-medium">
                    SAFETY NET
                  </p>
                </div>

                <span className="bg-[#FEE2E2] text-[#B91C1C] font-inter font-bold text-[10px] p-2 rounded-full">
                  TERKUNCI
                </span>
              </div>

              <p className="font-inter font-semibold text-[24px] text-button">
                {formatRupiah(data?.dana_darurat.nominal || 0)}
              </p>
            </div>

            {/* runway */}
            <div className="flex flex-col gap-2 w-93 p-4 bg-white rounded-xl border-2 border-[#E5E7EB]">
              <div className="flex flex-row gap-1">
                <img src={statik} alt="statik" className="w-5 h-5" />

                <p className="text-[#64748B] font-inter text-[12px] font-medium">
                  RUNWAY
                </p>
              </div>

              <p className="font-inter font-semibold text-[24px] text-button">
                {Math.floor(data?.sisa_runway || 0)} Hari
              </p>

              <p className="font-medium text-[12px] text-[#64748B]">
                Estimasi ketahanan keuangan kamu
              </p>
            </div>
          </div>
        </div>

        <button
          className="bg-button rounded-lg p-4 text-white font-inter font-semibold text-[14px]"
          onClick={handleButton}
        >
          Ke Dashboard
        </button>
      </main>
    </div>
  );
};

export default HasilAnalisis;