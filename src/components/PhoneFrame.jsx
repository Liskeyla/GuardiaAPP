import { useEffect, useState } from "react";

export default function PhoneFrame({ children }) {
  const [nativo, setNativo] = useState(false);

  useEffect(() => {
    const cap = window.Capacitor;
    setNativo(Boolean(cap?.isNativePlatform?.()));
  }, []);

  const sinMarco = nativo;

  return (
    <div
      className={
        sinMarco
          ? "relative h-[100dvh] bg-white"
          : "min-h-[100dvh] bg-[#DDE2ED] flex items-center justify-center max-[430px]:p-0 p-5"
      }
    >
      <div
        className={
          sinMarco
            ? "relative w-full h-full bg-white flex flex-col overflow-hidden"
            : "relative w-[390px] h-[844px] bg-[#F4F6FA] rounded-[28px] overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(20,30,60,0.25)] max-[430px]:w-full max-[430px]:h-[100dvh] max-[430px]:rounded-none max-[430px]:shadow-none"
        }
      >
        {children}
      </div>
    </div>
  );
}
