import { Database, Earth, File, Flame, Recycle, ShoppingBasket } from "lucide-react";
import Image from "next/image";

const Suitable = () => {
  return (
    <section className="flex flex-col w-full h-full bg-white justify-center items-center py-20 gap-15">
      <div className="flex flex-col gap-1">
        <p className="text-[#B2A088] text-lg text-center font-medium">
          Suitable For All Stove
        </p>
        <p className="text-[#B2A088] text-4xl text-center font-semibold">
          {" "}
          Non-Stick Pan
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="flex flex-col gap-15">
          <div className="flex items-start gap-3">
            <div className="flex flex-col gap-2">
              <p className="text-xl text-[#B2A088] font-medium">
                Stable heat distribution
              </p>
              <p className="text-black/70">
                Posuere lorem ipsum dolor sit amet consectetur. Fringilla est
                ullamcorper eget nulla facilisi.
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
                Posuere lorem ipsum dolor sit amet consectetur. Fringilla est
                ullamcorper eget nulla facilisi.
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
                Posuere lorem ipsum dolor sit amet consectetur. Fringilla est
                ullamcorper eget nulla facilisi.
              </p>
            </div>
            <div className="bg-[#F4F4F4] rounded p-2 shrink-0">
              <Recycle color="#2A3A34" />
            </div>
          </div>
        </div>

        <div className="relative h-full w-full overflow-hidden">
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
                Posuere lorem ipsum dolor sit amet consectetur. Fringilla est
                ullamcorper eget nulla facilisi.
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
                Posuere lorem ipsum dolor sit amet consectetur. Fringilla est
                ullamcorper eget nulla facilisi.
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
                Posuere lorem ipsum dolor sit amet consectetur. Fringilla est
                ullamcorper eget nulla facilisi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Suitable;
