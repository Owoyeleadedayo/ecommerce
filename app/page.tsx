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
      <div className="pt-17.5 flex relative min-h-[50vh] md:h-screen bg-[url('/images/banner.jpg')] bg-no-repeat bg-cover bg-fixed bg-center ">
        {" "}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute flex flex-col w-full h-full justify-center items-left px-10 md:px-25 gap-3">
          <div className="flex flex-col gap-6">
            <p className="text-sm text-white/35">Quality Solid</p>
            <div>
              <p className="text-6xl text-white ">
                Cooking is{" "}
                <span className="text-[#B2A088]">
                  our <br></br>passion
                </span>
              </p>
            </div>
            <div className="max-w-112.5">
              <p className="text-sm text-white/35 leading-5">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos
                tenetur aliquid accusantium exercitationem atque ducimus
                possimus tempore quisquam quaerat cumque.
              </p>
            </div>
            <div>
              <Button
                className={
                  "bg-transparent border border-white p-5 rounded-3xl hover:text-black hover:bg-white transition-colors duration-300 cursor-pointer"
                }
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
