import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, Palette, Scissors, Upload, User } from "lucide-react";
import IntroductionBlock from "@/components/ui/introduction";
import FunctionCard from "@/components/ui/functionCard";
import SizeCard from "@/components/ui/sizeCard";
import DropzoneExample from "@/components/ui/dropzoneExample";

export default function Home() {
  return (
    <>
      <div className="mt-10 md:mt-25 ">
        <div className="grid grid-rows md:grid-cols-2 gap-4 mx-5">
          <div className="">
            <span className="bg-[#dbeafe] rounded-3xl text-blue-600 text-xl px-2 py-3">
              ✨ Tự động hoàn toàn với AI
            </span>
            <div className="text-4xl mt-8 max-w-3xl">
              Tạo ảnh thẻ chuyên nghiệp trong vài giây
            </div>
            <p className="mt-8 text-gray-600 max-w-3xl text-2xl">
              Upload ảnh của bạn và để AI xử lý tất cả. Tách nền, căn chỉnh,
              thay đổi kích thước và tải xuống ngay lập tức.
            </p>

            {/* Nút */}
            <div className="mt-10 flex flex-col md:flex-row items-center gap-3.5">
              {/* Nút Upload Ảnh */}
              <Link
                href="/upload"
                className="w-full md:w-[60%] flex items-center gap-2 justify-center text-white bg-[#155dfc] hover:bg-blue-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-2xl text-xl px-4 py-3"
              >
                <Upload className="w-10 h-10" />
                Upload ảnh ngay
              </Link>

              {/* Xem Demo */}
              <Link
                href="/"
                className="text-gray-500 flex items-center justify-center border-3 w-full md:w-[30%] border-gray-500 hover:border-blue-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-2xl text-xl px-4 lg:px-5 py-2 lg:py-3.5 mr-2 md:text-lg"
              >
                <p className="self-center">Xem Demo</p>
              </Link>
            </div>

            {/* Giới thiệu chất lượng */}
            <div className="flex justify-between mt-5 md:mt-15 w-full lg:w-[70%]">
              <IntroductionBlock title="300 DPI" description="Chất lượng cao" />
              <IntroductionBlock title=" 30s" description="Xử lý nhanh" />
              <IntroductionBlock title="100%" description="Tự động" />
            </div>
          </div>

          {/* Phần upload ảnh */}
          <DropzoneExample />
        </div>

        {/* Tính năng nổi bật */}
        <div className="mt-20 bg-white pt-10 pb-10 shadow-md ">
          <IntroductionBlock
            title="Tính năng nổi bật"
            description="Mọi thứ bạn cần để tạo ảnh thẻ hoàn hảo"
          />

          {/* Các tính năng */}
          <div className="mt-10 mb-8 flex flex-col justify-center md:justify-around  sm:flex-row flex-wrap gap-3">
            <FunctionCard
              title="Tách nền AI"
              description="Công nghệ AI tự động loại bỏ phông nền chính xác"
              icon={<Scissors className="w-10 h-10" />}
            />

            <FunctionCard
              title="Căn mặt tự động"
              description="Tự động căn chỉnh khuôn mặt ở vị trí chuẩn"
              icon={<User className="w-10 h-10" />}
            />

            <FunctionCard
              title="Thay nền đa dạng"
              description="Chọn nền trắng, xanh dương, đỏ theo yêu cầu"
              icon={<Palette className="w-10 h-10" />}
            />

            <FunctionCard
              title="Chuẩn 300 DPI"
              description="Xuất ảnh chất lượng cao, sẵn sàng in ấn"
              icon={<Download className="w-10 h-10" />}
            />
          </div>
        </div>

        {/* Các loại kích thước ảnh */}
        <div className="mt-20 pt-10 pb-15 mx-5">
          <IntroductionBlock
            title="Kích thước đa dạng"
            description="Hỗ trợ mọi kích thước ảnh thẻ phổ biến"
          />

          {/* Các loại kích thước */}
          <div className="mt-10 flex flex-col justify-center md:justify-around items-center sm:flex-row flex-wrap gap-3">
            <SizeCard title="3x4 cm" description="Kích thước phổ biến nhất" />
            <SizeCard title="4x6 cm" description="Cho hồ sơ đặc biệt" />
            <SizeCard title="2x2 inch" description="Chuẩn quốc tế (Passport)" />
          </div>
        </div>

        {/* CTA Section */}
        <div
          className="
        w-full py-24 
        bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600
        flex flex-col items-center justify-center
        text-center px-4
      "
        >
          {/* Title */}
          <h2 className="text-white text-4xl md:text-5xl font-semibold mb-4">
            Sẵn sàng tạo ảnh thẻ của bạn?
          </h2>

          {/* Subtitle */}
          <p className="text-white/80 text-lg md:text-xl mb-10">
            Chỉ mất vài giây để có ảnh thẻ chuyên nghiệp
          </p>

          {/* Button */}
          <Link
            href="/upload"
            className="
          inline-flex items-center gap-3
          bg-white text-blue-600 font-medium
          px-8 py-4 rounded-2xl text-lg shadow-lg
          hover:scale-[1.03] hover:shadow-xl 
          transition-all duration-300
        "
          >
            <Upload className="w-6 h-6" />
            Bắt đầu xử lý ảnh
          </Link>
        </div>
      </div>
    </>
  );
}
