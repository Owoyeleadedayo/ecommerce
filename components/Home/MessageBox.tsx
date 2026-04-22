import Image from 'next/image';
import React from 'react';

const MessageBox = () => {
  return (
    <section className="flex flex-col bg-[#FFFFFF] py-18 justify-center items-center gap-8 border-b-[#bcb3b3] border-b">
      <div>
        <Image
          src={"/images/elogo.jpg"}
          alt="Logo"
          width={100}
          height={100}
          className="object-cover"
        />
      </div>
      <div>
        <p className="max-w-3xl text-5xl text-[#B2A088] font-medium text-center leading-snug">
          We know that your home is important to you, just like providing a
          beautiful product at a value price is important to us.
        </p>
      </div>
    </section>
  );
}

export default MessageBox;
