import { CircleCheckBig, Upload } from "lucide-react";

const DropzoneExample = () => {
  return (
    <>
      <div className="p-[3px] rounded-[30px] bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600 shadow-xl">
        <div className="bg-white rounded-[27px] p-8 m-6 ">
          <div className="flex text-green-800 items-center">
            <CircleCheckBig className="mr-2 text-xl" />{" "}
            <p className="text-xl">Ảnh đã được upload</p>
          </div>

          {/* Preview box */}
          <div className="w-full mt-5 h-64 bg-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-500 mb-8 transition-all">
            <Upload className="w-12 h-12 mb-2" />
            <p className="text-xl">Preview ảnh của bạn</p>
          </div>

          {/* Background Options */}
          <div className="mt-5 grid grid-cols-3 gap-4 ">
            <div
              className={`
              py-4 rounded-xl border-2 font-medium md:h-30 md:align-center text-center
              border-blue-500
            `}
            >
              Trắng
            </div>

            <div
              className={`
              py-4 rounded-xl bg-[#2b7fff] border-2 text-center text-white font-medium
              
            `}
            >
              Xanh
            </div>

            <div
              className={`
              py-4 rounded-xl bg-[#fb2c36] border-2 text-center text-white font-medium
              
            `}
            >
              Đỏ
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropzoneExample;
