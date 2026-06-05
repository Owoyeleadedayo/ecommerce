import { Database, Earth, File, Flame, Recycle, ShoppingBasket } from "lucide-react";
import Image from "next/image";

const Suitable = () => {
  return (
    <section className="flex flex-col w-full h-full bg-white justify-center items-center py-10 md:py-14 xl:py-20 gap-15 border-b-[#bcb3b3] border-b px-8 md:px-12 xl:px-45">
      <div className="flex flex-col gap-1">
        <p className="text-[#B2A088] text-lg text-center font-medium">
          Suitable For All Stove
        </p>
        <p className="text-[#B2A088] text-4xl text-center font-semibold">
          {" "}
          Non-Stick Pan
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-10 md:gap-6 w-full max-w-5xl">
        <div className="flex flex-col gap-15">
          <div className="flex items-start gap-3">
            <div className="flex flex-col gap-2">
              <p className="text-xl text-[#B2A088] font-medium">
                Stable heat distribution
              </p>
              <p className="text-black/70">
                Our cookware is engineered for even heat distribution, ensuring your food cooks perfectly every time.
              </p>
            </div>
            <div className="bg-[#F4F4F4] rounded p-2 shrink-0">
              <Flame color="#2A3A34" fill="#2A3A34" />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex flex-col gap-2">
              <p className="text-xl text-[#B2A088] font-medium">
                Eco friendly material
              </p>
              <p className="text-black/70">
                Our cookware is made from eco-friendly materials, ensuring a sustainable and responsible choice for your kitchen.
              </p>
            </div>
            <div className="bg-[#F4F4F4] rounded p-2 shrink-0">
              <Earth color="#2A3A34" />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex flex-col gap-2">
              <p className="text-xl text-[#B2A088] font-medium">
                Easy to Clean
              </p>
              <p className="text-black/70">
                Our cookware is easy to clean, making meal preparation and cleanup a breeze.
              </p>
            </div>
            <div className="bg-[#F4F4F4] rounded p-2 shrink-0">
              <Recycle color="#2A3A34" />
            </div>
          </div>
        </div>

        <div className="relative h-full w-full overflow-hidden hidden md:hidden xl:block">
          <Image
            src="/images/stickpan.png"
            alt="Suitable"
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col gap-15">
          <div className="flex items-start gap-3">
            <div className="bg-[#F4F4F4] rounded p-2 shrink-0">
              <ShoppingBasket color="#2A3A34" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl text-[#B2A088] font-medium">
                Suitable for induction
              </p>
              <p className="text-black/70">
                Our cookware is compatible with induction cooktops, providing you with versatile cooking options for your kitchen.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-[#F4F4F4] rounded p-2 shrink-0">
              <File color="#2A3A34" fill="#2A3A34" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl text-[#B2A088] font-medium">
                12-month warranty
              </p>
              <p className="text-black/70">
                Our cookware comes with a 12-month warranty, giving you peace of mind with every purchase.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-[#F4F4F4] rounded p-2 shrink-0">
              <Database color="#2A3A34" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl text-[#B2A088] font-medium">
                Ultra granite coating
              </p>
              <p className="text-black/70">
                Our cookware features a durable granite coating that provides excellent non-stick performance and easy cleaning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Suitable;
