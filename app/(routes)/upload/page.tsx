"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, CircleCheck } from "lucide-react";
import Link from "next/link";
import Dropzone from "@/components/ui/dropzone";

const UploadPage = () => {
  return (
    <div className="mx-4 md:mx-10 lg:mx-20 mt-5">
      {/* Button quay lại */}
      <Button
        asChild
        size="xl"
        textsize="xxl"
        variant="secondary"
        type="button"
        className="hover:shadow-lg hover:-translate-y-1 transition duration-200"
      >
        <Link href="/">
          <ArrowLeft size={25} />
          Quay lại
        </Link>
      </Button>

      {/* Khung gửi ảnh lên */}
      <div className=" mt-5 lg:mt-10 md:flex justify-center items center">
        <div>
          <Dropzone />
        </div>
      </div>

      {/* Hướng dẫn để có ảnh đẹp nhất */}
      <div className=" mt-5 lg:mt-10 mb-10 bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-lg  mb-4">💡 Hướng dẫn để có ảnh đẹp nhất</h2>
        <div className="flex text-md gap-2 mt-4">
          <CircleCheck className="text-green-600" /> Chụp ảnh trong điều kiện
          ánh sáng tốt{" "}
        </div>
        <div className="flex text-md gap-2 mt-4">
          <CircleCheck className="text-green-600" /> Khuôn mặt quay thẳng vào
          camera
        </div>
        <div className="flex text-md gap-2 mt-4">
          <CircleCheck className="text-green-600" /> Không đeo kính đen hoặc mũ
        </div>
        <div className="flex text-md gap-2 mt-4">
          <CircleCheck className="text-green-600" /> Nền đơn giản, tránh phức
          tạp
        </div>
        <div className="flex text-md gap-2 mt-4">
          <CircleCheck className="text-green-600" /> Chất lượng ảnh rõ nét,
          không mờ
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
