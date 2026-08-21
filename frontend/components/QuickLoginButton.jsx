import { useState } from "react";
import { useAuthStore } from "../Store/useAuthStore";

const QuickLoginButton = () => {
  const [status, setStatus] = useState("idle");
  const { login } = useAuthStore();

  const handleQuickLogin = async () => {
    if (status !== "idle") return;
    setStatus("loading");
    try {
      await login({ email: "guestUser@gmail.com", password: "!!Password00" });
      setStatus("success");
    } catch {
      setStatus("idle");
    }
  };

  return (
    <button
      onClick={handleQuickLogin}
      disabled={status === "loading"}
      className={`
        flex flex-col items-center justify-center gap-2.5
        w-32 rounded-2xl px-3 py-5 overflow-hidden shadow-lg shadow-violet-600/10 border
        bg-white/90 backdrop-blur-xl transition-all duration-200 
        absolute top-0 -left-36
        ${status === "idle"
          ? "border-slate-200 hover:border-violet-300 hover:bg-slate-50 active:scale-95"
          : status === "success"
          ? "border-emerald-200 bg-emerald-50/50"
          : "border-slate-200 cursor-wait"
        }
      `}
    >
      {/* Online badge */}
      <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />

      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-white font-semibold text-lg shadow-md shadow-violet-600/20">
        A
      </div>

      {/* Name & username */}
      <div className="text-center">
        <p className="text-slate-800 text-sm font-bold leading-tight"> Alex </p>
        <p className="text-violet-600 text-xs font-medium"> Guest User </p>
      </div>

      {/* Label */}
      <p className="text-slate-400 text-[11px] font-normal text-center leading-snug whitespace-pre-line">
        {status === "success" ? "Logged in!" : "Click to log in\nquickly"}
      </p>

      {/* Arrow / Loader / Check */}
      <div
        className={`
          w-7 h-7 rounded-full flex items-center justify-center border text-sm transition-all duration-300
          ${status === "success"
            ? "bg-emerald-100 border-emerald-300 text-emerald-600"
            : "bg-violet-50 border-violet-200 text-violet-600"
          }
        `}
      >
        {status === "loading" && (
          <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
          </svg>
        )}
        {status === "success" && (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
        {status === "idle" && (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        )}
      </div>
    </button>
  );
};

export default QuickLoginButton;