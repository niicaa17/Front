
export default function Header({ currentStep }) {
  const steps = [1, 2, 3];

  return (
    <header className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
      <div className="text-primary font-display font-extrabold text-2xl tracking-tighter font-inter">
        CukuPin
      </div>
      <div className="flex items-center gap-6">
        <div className="text-on-surface-variant font-inter font-medium text-sm tracking-wide uppercase">
          Langkah {currentStep} dari 3
        </div>
        <div className="flex gap-2">
          {steps.map((step) => (
            <div
              key={step}
              className={`h-1.5 w-12 rounded-full transition-all duration-500 ${
                step <= currentStep ? 'bg-primary' : 'bg-outline-variant/30'
              }`}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
