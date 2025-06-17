"use client";
import Image from "next/image";
import Box from "@/components/box";
import { useState } from "react";

export default function Home() {
  const [drawn, setDrawn] = useState(false);
  const [tarotData, setTarotData] = useState<any>(
    {
      img: "/tarotback.jpg",

    }
  );
  const [magicData, setMagicData] = useState<any>(
    {
      img: "/magicback.jpg",
    }
  );
  const [playingData, setPlayingData] = useState<any>(
    {
      img: "/playingcardback.jpg",
    }
  );

  const handleDraw = () => {
    setDrawn(!drawn);

    if (drawn) {
      
    }
  };


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl sm:text-6xl font-bold text-center sm:text-left">Three Cards</h1>
      <main className="flex flex-col gap-[32px] align-items-center">
        
        <div className=" items-center align-items-center justify-center gap-4">
        <div
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838bb] dark:hover:bg-[#ccc] font-medium text-lg h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            onClick = {() => {
                handleDraw();
            }}
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
              style={drawn? { transform: "rotate(180deg)" }: {transform: "rotate(90deg)"  }}
            />
            Draw!
          </div>
          </div>

        {drawn && <Box>
            <div className="flex flex-row items-center justify-center relative">
              <div
              className="relative transition-transform duration-300"
              style={{
                height: "500px",
                width: "300px",
                transform: "rotate(-15deg)",
                zIndex: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.zIndex = "3";
                e.currentTarget.style.transform = "rotate(-15deg) translateY(-20px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.zIndex = "0";
                e.currentTarget.style.transform = "rotate(-15deg)";
              }}
              >
              <Image
                className="rounded-lg shadow-lg"
                src={tarotData.img}
                alt="Tarot Card"
                fill
                style={{ objectFit: "contain" }}
                unoptimized
              />
              </div>
              <div
              className="relative transition-transform duration-300"
              style={{
                height: "500px",
                width: "350px",
                transform: "translateY(-40px)",
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.zIndex = "3";
                e.currentTarget.style.transform = "translateY(-60px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.zIndex = "1";
                e.currentTarget.style.transform = "translateY(-40px)";
              }}
              >
              <Image
                className="rounded-lg shadow-lg"
                src={magicData.img}
                alt="Magic Card"
                fill
                style={{ objectFit: "contain" }}
                unoptimized
              />
              </div>
              <div
              className="relative transition-transform duration-300"
              style={{
                height: "500px",
                width: "350px",
                transform: "rotate(15deg)",
                zIndex: 2,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.zIndex = "3";
                e.currentTarget.style.transform = "rotate(15deg) translateY(-20px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.zIndex = "2";
                e.currentTarget.style.transform = "rotate(15deg)";
              }}
              >
              <Image
                className="rounded-lg shadow-lg"
                src={playingData.img}
                alt="Playing Card"
                fill
                style={{ objectFit: "contain" }}
                unoptimized
              />
              </div>
            </div>



        </Box>}
      </main>
      
    </div>
  );
}
