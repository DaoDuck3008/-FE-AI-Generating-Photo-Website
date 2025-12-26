import { Download } from "lucide-react";

type EditResultModalProps = {
  open: boolean;
  imageUrl: string | null;
  onClose: () => void;
};

export function EditResultModal({
  open,
  imageUrl,
  onClose,
}: EditResultModalProps) {
  if (!open || !imageUrl) return null;

  const downloadImage = async () => {
    const response = await fetch(imageUrl, {
      mode: "cors",
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "anh-the-300dpi.png";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 max-w-[800px] shadow-xl">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Ảnh đã sẵn sàng
        </h2>

        {/* Preview */}
        <div className="flex justify-center mb-4">
          <img
            src={imageUrl}
            alt="Result"
            className="rounded-lg border max-h-[500px]"
          />
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={downloadImage}
            className="flex justify-center w-full text-center rounded-lg bg-blue-600 text-white py-2 font-medium hover:bg-blue-700"
          >
            <Download className="me-2" /> Tải xuống JPG (300 DPI)
          </button>

          <button
            onClick={onClose}
            className="w-full rounded-lg border py-2 text-gray-700 hover:bg-gray-100"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
