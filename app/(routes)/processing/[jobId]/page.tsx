"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getStatus } from "@/lib/api";
import { toast } from "react-toastify";

type StepKey = "validate" | "background" | "align" | "optimize";

const STEP_LABELS: Record<StepKey, string> = {
  validate: "Phân tích ảnh",
  background: "Tách nền AI",
  align: "Căn chỉnh khuôn mặt",
  optimize: "Tối ưu hóa ảnh",
};

export default function ProcessingPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const router = useRouter();

  const [progress, setProgress] = useState(10);
  const [currentStep, setCurrentStep] = useState<StepKey>("validate");

  // Fake progress mapping (UX)
  const stepOrder: StepKey[] = ["validate", "background", "align", "optimize"];

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await getStatus(jobId);
        // Khi status hoàn thành thì thông báo bằng toast và chuyển trang khác
        if (data.status === "done") {
          clearInterval(interval);
          toast.success("Ảnh của bạn đã được xử lý xong!");
          setTimeout(() => {
            router.push(`/editor/${jobId}`);
          }, 1000);
          return;
        }

        // Nếu backend có progress thật
        if (typeof data.progress === "number") {
          setProgress(data.progress);
        } else {
          // Fake progress tăng dần (rất quan trọng cho UX)
          setProgress((prev) => Math.min(prev + 5, 90));
        }

        if (data.step && stepOrder.includes(data.step)) {
          setCurrentStep(data.step);
        }

        // Nếu như gặp lỗi ở server thì thông báo rồi chuyển về trang upload
        if (data.status === "error") {
          clearInterval(interval);
          toast.error("Có lỗi xảy ra ở phía server!");
          setTimeout(() => {
            router.push(`/upload`);
          }, 1000);
          return;
        }
      } catch (e) {
        console.error("Polling error", e);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        </div>

        <h2 className="text-xl font-semibold mb-2">Đang xử lý ảnh...</h2>
        <p className="text-gray-500 mb-6">
          AI đang tách nền và căn chỉnh ảnh của bạn
        </p>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className="h-3 rounded-full bg-linear-to-r from-blue-500 to-purple-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-blue-600 font-medium mb-6">{progress}%</p>

        {/* Steps */}
        <div className="bg-blue-50 rounded-xl p-4 text-left space-y-2">
          {stepOrder.map((step) => {
            const done =
              stepOrder.indexOf(step) < stepOrder.indexOf(currentStep);

            return (
              <div key={step} className="flex items-center gap-2 text-sm">
                <span className="text-blue-600">{done ? "✓" : "•"}</span>
                <span
                  className={
                    done ? "text-blue-600 font-medium" : "text-gray-500"
                  }
                >
                  {STEP_LABELS[step]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
