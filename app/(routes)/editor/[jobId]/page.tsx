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
import { useEffect, useState, useMemo } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { RadioCard } from "@/components/ui/radio-card";
import AdjustmentSlider from "@/components/ui/adjustmentImage";
import { useParams } from "next/navigation";
import { getImgURL, editImage } from "@/lib/api";
import { toast } from "react-toastify";
import { EditProcessingModal } from "@/components/modals/editProccessingModel";
import { EditResultModal } from "@/components/modals/editResultModal";

const SIZE_MAP: Record<string, { w: number; h: number }> = {
  "3x4 cm": { w: 300, h: 400 },
  "4x6 cm": { w: 300, h: 450 },
  "2x2 inch": { w: 240, h: 240 },
};

const EditorPage = () => {
  const { jobId } = useParams<{ jobId: string }>();

  // ===== UI STATE =====
  const [selectedColor, setSelectedColor] = useState("#0d93d1");
  const [size, setSize] = useState<string>("4x6 cm");
  const [width, setWidth] = useState<number>(240);
  const [height, setHeight] = useState<number>(360);

  const [brightness, setBrightness] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);

  const [showBeforeAfter, setShowBeforeAfter] = useState<boolean>(false);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  // ===== DERIVED STATE (KHÔNG useEffect) =====
  const imgURL = useMemo(() => {
    if (!jobId) {
      toast.error("Không tìm thấy ảnh trên cloud!");
      return undefined;
    }
    return getImgURL(jobId);
  }, [jobId]);

  // ===== RESIZE PREVIEW =====
  useEffect(() => {
    const s = SIZE_MAP[size];
    if (s) {
      setWidth(s.w);
      setHeight(s.h);
    }
  }, [size]);

  const submitEditImage = async (printForm: boolean) => {
    try {
      setIsProcessing(true);
      setResultUrl(null);

      const data = await editImage(
        imgURL ?? "",
        selectedColor,
        size,
        brightness,
        contrast,
        saturation,
        printForm
      );

      setResultUrl(data.img_url);
    } catch (error: any) {
      const detail = error.response?.data?.detail;
      if (detail) {
        toast.error(detail.message);
      } else {
        toast.error("Có lỗi xảy ra");
      }
    } finally {
      setIsProcessing(false);
    }
  };

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
              {!showBeforeAfter && imgURL && (
                <div className="mt-4 bg-[#f3f4f6] rounded-2xl w-full h-auto min-h-[400px] flex justify-center items-center">
                  <div
                    style={{
                      backgroundColor: selectedColor,
                    }}
                    className="my-3 "
                  >
                    <img
                      src={imgURL}
                      onError={(e) => {
                        e.currentTarget.src = "./ErrorImage.png";
                      }}
                      style={{
                        width: `${width}px`,
                        height: `${height}px`,
                        filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
                      }}
                      className={`max-h-full max-w-full object-cover`}
                      alt="Preview portrait photo."
                    />
                  </div>
                </div>
              )}

              {/* Khi mở so sánh */}
              {showBeforeAfter && imgURL && (
                <div className=" mt-4 grid md:grid-cols-2 gap-4 w-full bg-[#f3f4f6] rounded-2xl">
                  {/* Before */}
                  <div className="flex flex-col justify-center items-center mb-3">
                    <p className="font-semibold mb-2">Before</p>
                    <div className="my-3">
                      <img
                        src={imgURL ? imgURL : ""}
                        style={{ width: `300px`, height: `450px` }}
                        className=" shadow max-h-full max-w-full object-cover my-3"
                        alt="Before editing"
                      />
                    </div>
                  </div>

                  {/* After */}
                  <div className="flex flex-col justify-center items-center mb-3">
                    <p className="font-semibold mb-2">After</p>
                    <div
                      className="my-3"
                      style={{ backgroundColor: selectedColor }}
                    >
                      <img
                        src={imgURL ? imgURL : ""}
                        style={{
                          width: `${width}px`,
                          height: `${height}px`,
                          filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
                        }}
                        className=" shadow max-h-full max-w-full object-cover "
                        alt="After editing"
                      />
                    </div>
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
                  size="default"
                  textsize="default"
                  variant="default"
                  type="button"
                  className="text-white bg-green-600 hover:bg-green-700"
                  onClick={() => submitEditImage(true)}
                >
                  <Download />
                  In ảnh ngay với khung mẫu
                </Button>

                <Button
                  size="default"
                  textsize="default"
                  variant="default"
                  type="button"
                  className=" text-white bg-[#155dfc] hover:bg-[#0d4ec6]"
                  onClick={() => submitEditImage(false)}
                >
                  <Download />
                  Tải xuống JPG (300 DPI)
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
                  colorName="Xanh Nhạt"
                  colorHex="#0d93d1"
                  onSelect={(hex) => setSelectedColor(hex)}
                />
                <ColorCard
                  colorName="Trắng"
                  colorHex="#ffffff"
                  onSelect={(hex) => setSelectedColor(hex)}
                />
                <ColorCard
                  colorName="Xanh Đậm"
                  colorHex="#155ec6"
                  onSelect={(hex) => setSelectedColor(hex)}
                />
                <ColorCard
                  colorName="Xám"
                  colorHex="#b9bfcd"
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
                  value="3x4 cm"
                  title="3x4 cm"
                  description="Ảnh hồ sơ, CV, bằng lái xe."
                  price=""
                  selected={size === "3x4 cm"}
                  onSelect={setSize}
                />

                <RadioCard
                  value="4x6 cm"
                  title="4x6 cm"
                  description="Ảnh CCCD, hồ sơ, thị thực, chứng chỉ."
                  price=""
                  selected={size === "4x6 cm"}
                  onSelect={setSize}
                />

                <RadioCard
                  value="2x2 inch"
                  title="2x2 inch"
                  description="Ảnh hộ chiếu, Visa tại 1 số quốc gia."
                  price=""
                  selected={size === "2x2 inch"}
                  onSelect={setSize}
                />
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>

      <EditProcessingModal open={isProcessing} />

      <EditResultModal
        open={!!resultUrl}
        imageUrl={resultUrl}
        onClose={() => setResultUrl(null)}
      />
    </>
  );
};

export default EditorPage;
