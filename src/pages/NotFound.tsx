"use client";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center px-5">
      <div className="text-center">
        <div className="font-mono text-5xl font-bold text-zinc-800 mb-4">404</div>
        <p className="text-[13px] text-zinc-500 mb-4">Page not found</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1.5 text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors mx-auto"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
