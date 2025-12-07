const AppFooter = () => {
  return (
    <>
      <div className="bg-[#101828] h-15 flex items-center flex-wrap pb-2 justify-center md:h-20  md:justify-between ">
        <div className="ml-5 py-2 flex items-center gap-2">
          <img
            src="TempLogo.png"
            className="mr-3 h-6 sm:h-9 "
            alt="Hiệu ảnh Thái Lan Logo"
          />
          <span className="text-white text-xl font-semibold mr-5">
            Hiệu ảnh Thái Lan
          </span>
        </div>
        <div>
          <span className="text-white text-lg mr-5">
            © 2025 ID Photo Studio. All rights reserved.
          </span>
        </div>
      </div>
    </>
  );
};

export default AppFooter;
