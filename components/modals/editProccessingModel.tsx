type EditProcessingModalProps = {
  open: boolean;
};

export function EditProcessingModal({ open }: EditProcessingModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 w-[320px] text-center shadow-xl">
        {/* Spinner */}
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>

        <h2 className="text-lg font-semibold mb-1">Đang xử lý ảnh</h2>
        <p className="text-sm text-gray-500">Vui lòng chờ trong giây lát...</p>
      </div>
    </div>
  );
}
