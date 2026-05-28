import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Header from "../components/onboarding/Header";
import Step1 from "../components/onboarding/Step1";
import Step2 from "../components/onboarding/Step2";
import Step3 from "../components/onboarding/Step3";
import { onBoarding } from "../utils/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 
export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState({
    usia: "",
    pemasukan: "",
    pengeluaran: "",
    tgl_gajian: "",
    utang: "",
    emi: "",
    tabungan_awal: "",
    safety_net_nominal: "",
    sweeping: "Final Budget",
  });
  const navigate = useNavigate();
  const updateData = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
  const prevStep = () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const payload = {
        ...data,
        usia: Number(data.usia),
        pemasukan: Number(data.pemasukan),
        pengeluaran: Number(data.pengeluaran),
        tgl_gajian: Number(data.tgl_gajian),
        utang: Number(data.utang),
        emi: Number(data.emi),
        tabungan_awal: Number(data.tabungan_awal),
        safety_net_nominal: Number(data.safety_net_nominal),
      };

      const response = await onBoarding(payload, token);

      if (response.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data onboarding berhasil disimpan",
          confirmButtonColor: "#15157D",
          confirmButtonText: "Ke Dashboard",
        }).then(() => {
          navigate("/dashboard");
        });
      } else if (response.statusCode == 403) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-primary/10">
      <Header currentStep={currentStep} />

      <main className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <Step1
              key="step1"
              data={data}
              updateData={updateData}
              onNext={nextStep}
            />
          )}
          {currentStep === 2 && (
            <Step2
              key="step2"
              data={data}
              updateData={updateData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 3 && (
            <Step3
              key="step3"
              data={data}
              onEdit={() => setCurrentStep(1)}
              onSave={handleSave}
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 px-8">
        <div className="max-w-7xl mx-auto border-t border-outline-variant/10 pt-8 flex flex-col items-center gap-6">
          <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">
            © 2026 CUKUPIN. HAK CIPTA DILINDUNGI.
          </div>
          <div className="flex gap-8 text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
            <button className="hover:text-primary transition-colors cursor-pointer">
              BANTUAN
            </button>
            <button className="hover:text-primary transition-colors cursor-pointer">
              KEBIJAKAN PRIVASI
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
