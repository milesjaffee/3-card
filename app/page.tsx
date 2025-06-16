"use client";
import Image from "next/image";
import Box from "@/components/box";
import { useState } from "react";

export default function Home() {
  const [drawn, setDrawn] = useState(false);

  const handleDraw = () => {
    setDrawn(!drawn);

    if (drawn) {
      
    }
  };


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl sm:text-6xl font-bold text-center sm:text-left">Three Cards</h1>
      <main className="flex flex-col gap-[32px] align-items-center sm:items-start">
        
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
          <div className="flex flex-row items-center gap-5">
            <Image
              className="border-5 border-dashed border-gray-300 dark:border-gray-700 rounded-lg"
              src="/card1.png"
              alt="Card 1"
              width={200}
              height={300}
              
            />
            <Image
              className="border-5 border-dashed border-gray-300 dark:border-gray-700 rounded-lg"
              src="/card2.png"
              alt="Card 2"
              width={200}
              height={300}
            />
            <Image
              className="border-5 border-dashed border-gray-300 dark:border-gray-700 rounded-lg"
              src="/card3.png"
              alt="Card 3"
              width={200}
              height={300}
            />
          </div>



        </Box>}
      </main>
      
    </div>
  );
}
