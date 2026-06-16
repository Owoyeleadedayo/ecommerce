import AboutOurProduct from "@/components/Home/AboutOurProduct";
import MessageBox from "@/components/Home/MessageBox";
import ShopNew from "@/components/Home/ShopNew";
import Suitable from "@/components/Home/Suitable";
import Utensils from "@/components/Home/Utensils";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <div
        className="pt-17.5 flex relative min-h-[75vh] md:h-screen bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/banner.jpg')",
        }}
      >
        {/* ✅ z-0 so it never bleeds over the nav */}
        <div className="absolute inset-0 bg-black/10 z-0" />
        <div className="absolute z-0 flex flex-col w-full h-full justify-center items-left px-6 md:px-16 xl:px-45 gap-3">
          <div className="flex flex-col gap-4 md:gap-6">
            <p className="text-sm text-white/35">Quality Solid</p>
            <div>
              <p className="text-3xl md:text-6xl text-white">
                Cooking is{" "}
                <span className="text-[#B2A088]">
                  our <br />
                  passion
                </span>
              </p>
            </div>
            <div className="max-w-112.5">
              <p className="text-sm text-white/50 leading-5">
                Experience the art of cooking with our premium cookware. Crafted
                for durability and designed to inspire culinary creativity in
                every kitchen.
              </p>
            </div>
            <div>
              <Button
                type="button"
                style={{ WebkitTapHighlightColor: "transparent" }}
                className="bg-transparent border border-white p-3 md:p-5 rounded-3xl hover:text-black hover:bg-white transition-colors duration-300 cursor-pointer"
              >
                Discover It <MoveRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <MessageBox />
      <ShopNew />
      <AboutOurProduct />
      <Suitable />
      <Utensils />
    </>
  );
}
