import Link from 'next/link';
import React from 'react';

type PageHeaderProps = {
  pageName: string;
}

const PageHeader = ({ pageName }: PageHeaderProps) => {
  return (
    <div className="pt-17.5 flex relative min-h-[50vh] md:h-[50vh] bg-[url('/images/banner.jpg')] bg-no-repeat bg-cover bg-fixed bg-center ">
      {" "}
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="absolute flex flex-col w-full h-full justify-center items-center px-10 md:px-25 gap-3">
        <p className="text-4xl text-white uppercase">{pageName}</p>
        <div>
          <Link
            href="/"
            className="text-base md:text-xl text-white font-normal hover:text-[#B2A088] transition-colors duration-300 ease-in-out"
          >
            Home{" "}
            <span className="text-base md:text-xl text-white font-normal">
              / {pageName}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
