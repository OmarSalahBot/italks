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
        w-30 rounded-2xl px-3 py-5 overflow-hidden
        bg-[#121A2E]  transition-all duration-200 absolute top-0 right-120
        ${status === "idle"
          ? "border-[#2a3a5c] hover:border-[#3d5080] hover:bg-[#111d30] active:scale-95"
          : status === "success"
          ? "border-[#1a3a4a]"
          : "border-[#1e2d47] cursor-wait"
        }
      `}
    >
      {/* Online badge */}
      <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#4ade9a] border-2 border-[#0d1525]" />

      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6c47ff] to-[#4a2fc4] flex items-center justify-center text-white font-semibold text-lg border-2 border-[#6c47ff]/30">
        A
      </div>

      {/* Name & username */}
      <div className="text-center">
        <p className="text-[#dde8f8] text-sm font-medium leading-tight"> Alex </p>
        <p className="text-[#6c47ff] text-[14px] font-normal"> Guest User </p>
      </div>

      {/* Label */}
      <p className="text-[#3d5070] text-[12px] font-light text-center leading-snug whitespace-pre-line">
        {status === "success" ? "Logged in!" : "Click to log in\nquickly"}
      </p>

      {/* Arrow / Loader / Check */}
      <div
        className={`
          w-7 h-7 rounded-full flex items-center justify-center border text-sm transition-all duration-300
          ${status === "success"
            ? "bg-[#0f3028] border-[#1a5040] text-[#4ade9a]"
            : "bg-[#6c47ff]/10 border-[#6c47ff]/25 text-[#6c47ff]"
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