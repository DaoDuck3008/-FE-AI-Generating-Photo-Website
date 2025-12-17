"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Upload, X, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { uploadImage } from "@/lib/api";

export default function UploadZone() {
  const [preview, setPreview] = useState<string>("");

  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  // Hàm xử lý upload ảnh
  const handleUpload = async (file: File) => {
    try {
      if (!file) {
        toast.error("Vui lòng chọn tệp hình ảnh hợp lệ.");
        return;
      }

      const data = await uploadImage(file);
      if (!data || !data.jobId) {
        toast.error("Đã xảy ra lỗi khi tải lên hình ảnh. Vui lòng thử lại.");
        return;
      }

      router.push(`/processing/${data.jobId}`);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại.");
      console.error("Upload error: ", error);
    }
  };

  // Hàm xử lý khi thả file vào vùng dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const selected = acceptedFiles[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }, []);

  // Cấu hình Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] },
    maxFiles: 1,
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  // Hàm xoá ảnh đã chọn
  const removeImage = () => {
    setFile(null);
    setPreview("");
  };

  return (
    <div className="w-full lg:min-w-4xl h-3xl border-4 border-dashed border-gray-300 hover:border-gray-400  rounded-3xl p-10 bg-white">
      {/* Nếu chưa upload file */}
      {!file && (
        <div
          {...getRootProps()}
          className="flex flex-col items-center justify-center text-center cursor-pointer"
        >
          <input {...getInputProps()} />

          <div className=" rounded-full bg-blue-50 flex items-center justify-center p-4 mb-6">
            <Upload size={70} className=" text-blue-600" />
          </div>

          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            Kéo & thả ảnh vào đây
          </h2>
          <p className="text-gray-500 mb-6 text-lg md:text-xl">
            hoặc nhấp vào nút bên dưới để chọn file
          </p>

          {/* Nút chọn ảnh */}
          <div className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Chọn ảnh từ máy
          </div>

          <p className="text-gray-500 text-sm mt-6">
            Hỗ trợ: JPG, PNG • Tối đa: 10MB • Tối thiểu: 300x300 pixels
          </p>
        </div>
      )}

      {/* Nếu đã upload file */}
      {file && (
        <div className="flex flex-col items-center">
          {/* Preview Image */}
          <div className="relative">
            <Image
              src={preview}
              alt="Preview"
              width={300}
              height={400}
              className="rounded-2xl shadow-lg object-cover"
            />

            {/* Nút X xoá ảnh */}
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-md hover:bg-red-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* File info */}
          <div className="mt-6 bg-green-50 border border-green-300 px-6 py-3 rounded-xl flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-600">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          {/* Button xử lý ảnh bằng AI */}
          <button
            onClick={() => handleUpload(file)}
            className="mt-8 bg-linear-to-r cursor-pointer from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-medium flex items-center gap-3 shadow-lg hover:shadow-xl transition-all"
          >
            <Upload className="w-6 h-6" />
            Bắt đầu xử lý ảnh với AI
          </button>
        </div>
      )}
    </div>
  );
}
