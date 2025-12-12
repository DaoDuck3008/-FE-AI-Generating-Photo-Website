"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  FolderCheck,
  Image,
  RefreshCcw,
  RotateCcw,
} from "lucide-react";
import ColorCard from "@/components/ui/colorCard";
import { useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { RadioCard } from "@/components/ui/radio-card";
import AdjustmentSlider from "@/components/ui/adjustmentImage";

const EditorPage = () => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [size, setSize] = useState<string>("4x6");
  const [brightness, setBrightness] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);

  const [showBeforeAfter, setShowBeforeAfter] = useState<boolean>(false);

  const resetAdjustment = () => {
    setBrightness(100);
    setSaturation(100);
    setContrast(100);
  };

  return (
    <>
      <div className="mx-4 md:mx-10 lg:mx-20 mt-5">
        {/* Button quay lại */}
        <Button
          asChild
          size="lg"
          textsize="xl"
          variant="white"
          type="button"
          className="hover:shadow-lg hover:-translate-y-1 transition duration-200"
        >
          <Link href="/upload">
            <ArrowLeft size={25} />
            Quay lại
          </Link>
        </Button>

        {/* Grid 7/3 */}
        <div className="mt-5 mb-10 lg:grid lg:grid-rows-1 lg:grid-cols-10 gap-3 flex flex-col justify-center">
          {/* Grid 7 */}
          <div className="md:col-10 lg:col-span-7 md:px-5 ">
            {/* Preview */}
            <div className="bg-white rounded-2xl shadow-md p-4">
              {/* Preview và nút before and after */}
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold">Preview</h3>
                <button
                  type="button"
                  className="text-blue-500 flex cursor-pointer gap-2"
                  onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                >
                  <RefreshCcw />
                  <p>So sánh Before/After</p>
                </button>
              </div>

              {/* Ảnh preview */}
              {/* Khi tắt so sánh */}
              {!showBeforeAfter && (
                <div className="mt-4 bg-[#f3f4f6] rounded-2xl w-full h-100 flex justify-center items-center">
                  <img
                    className="h-100 w-80 object-contain"
                    src="TempAvatar.png"
                  />
                </div>
              )}

              {/* Khi mở so sánh */}
              {showBeforeAfter && (
                <div className=" mt-4 grid grid-cols-2 gap-4 w-full bg-[#f3f4f6] rounded-2xl">
                  {/* Before */}
                  <div className="flex flex-col justify-center items-center mb-3">
                    <p className="font-semibold mb-2">Before</p>
                    <img
                      src="TempAvatar.png"
                      className="rounded-xl shadow"
                      alt="Before"
                    />
                  </div>

                  {/* After */}
                  <div className="flex flex-col justify-center items-center mb-3">
                    <p className="font-semibold mb-2">After</p>
                    <img
                      src="TempAvatar.png"
                      className="rounded-xl shadow"
                      alt="After"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Lưu ý */}
            <div className="mt-5 flex border-blue-300 border p-1 pt-2 rounded-xl bg-[#eff6ff]">
              <Image className="m-4 text-blue-500" />
              <p className="text-body">
                <b>Lưu ý: </b> Ảnh được xuất ở độ phân giải 300 DPI, đảm bảo
                chất lượng in ấn tốt nhất. Định dạng JPG phù hợp cho hầu hết
                trường hợp, PNG nếu cần nền trong suốt.
              </p>
            </div>

            {/* Tải xuống */}
            <div className="mt-5 border-[#d5fae1] border-2 p-4 rounded-xl bg-[#effaf9]">
              <div className="flex gap-2">
                <FolderCheck className=" text-green-500" />
                <p className="font-semibold text-md">Sẵn sàng tải xuống</p>
              </div>
              <p className="mt-2 text-body">
                Ảnh của bạn đã được xử lý và sẵn sàng sử dụng
              </p>

              <div className="flex flex-col gap-2 mt-4">
                <Button
                  asChild
                  size="default"
                  textsize="default"
                  variant="default"
                  type="button"
                  className="text-white bg-green-600 hover:bg-green-700"
                >
                  <Link href="/editor">
                    <Download />
                    In ảnh ngay với khung mẫu
                  </Link>
                </Button>

                <Button
                  asChild
                  size="default"
                  textsize="default"
                  variant="default"
                  type="button"
                  className=" text-white bg-[#155dfc] hover:bg-[#0d4ec6]"
                >
                  <Link href="/editor">
                    <Download />
                    Tải xuống JPG (300 DPI)
                  </Link>
                </Button>

                <Button
                  asChild
                  size="default"
                  textsize="default"
                  variant="default"
                  type="button"
                  className=" hover:bg-[#9069ab] text-white bg-[#9810fa]"
                >
                  <Link href="/editor">
                    <Download />
                    Tải xuống PNG (300 DPI)
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Grid 3 */}
          <div className="col-span-10 lg:col-span-3 mt-5 md:mt-0">
            {/* Màu nền */}
            <div className="bg-white rounded-2xl shadow-md p-4">
              <p className="font-semibold text-md mb-2">Màu nền</p>
              <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-10 md:mt-0 md:m-2 ">
                <ColorCard
                  colorName="Xanh Dương"
                  colorHex="#155dfc"
                  onSelect={(hex) => setSelectedColor(hex)}
                />
                <ColorCard
                  colorName="Trắng"
                  colorHex="#ffffff"
                  onSelect={(hex) => setSelectedColor(hex)}
                />
                <ColorCard
                  colorName="Đỏ"
                  colorHex="#dc2626"
                  onSelect={(hex) => setSelectedColor(hex)}
                />
                <ColorCard
                  colorName="Xám"
                  colorHex="#6b727f"
                  onSelect={(hex) => setSelectedColor(hex)}
                />
              </div>
            </div>

            {/* Điều chỉnh */}
            <div className="bg-white rounded-2xl shadow-md mt-5 p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  Điều chỉnh
                </h2>

                <button
                  onClick={resetAdjustment}
                  className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
              {/* Sliders */}
              <AdjustmentSlider
                label="Độ sáng"
                value={brightness}
                onChange={setBrightness}
              />

              <AdjustmentSlider
                label="Độ bão hòa"
                value={saturation}
                onChange={setSaturation}
              />

              <AdjustmentSlider
                label="Độ tương phản"
                value={contrast}
                onChange={setContrast}
              />
            </div>

            {/* Kích thước */}
            <div className="bg-white rounded-2xl shadow-md mt-5 p-4">
              <p className="font-semibold text-md mb-2">Kích thước</p>
              <RadioGroup
                value={size}
                onValueChange={setSize}
                className="flex flex-col gap-4 justify-center items center"
              >
                <RadioCard
                  value="3x4"
                  title="3x4 cm"
                  description="Ảnh hồ sơ, CV, bằng lái xe."
                  price=""
                  selected={size === "3x4"}
                  onSelect={setSize}
                />

                <RadioCard
                  value="4x6"
                  title="4x6 cm"
                  description="Ảnh CCCD, hồ sơ, thị thực, chứng chỉ."
                  price=""
                  selected={size === "4x6"}
                  onSelect={setSize}
                />

                <RadioCard
                  value="2x2"
                  title="2x2 cm"
                  description="Ảnh hộ chiếu, Visa tại 1 số quốc gia."
                  price=""
                  selected={size === "3x4"}
                  onSelect={setSize}
                />
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorPage;
