"use client";
import Image from "next/image";
import Box from "@/components/box";
import { useState } from "react";
import BigCard from "@/components/bigcard";

export default function Home() {
  const [drawn, setDrawn] = useState(false);

  const [tarotInfo, setTarotInfo] = useState({
    image: "/tarotback.jpg",
    alt: "Tarot card back",
    name: "Tarot Card",
    description: "A mystical tarot card drawn from the venerable Rider-Waite-Smith deck.",
  });
  const [magicInfo, setMagicInfo] = useState({
    image: "/magicback.jpg",
    alt: "Magic card back",
    name: "Magic Card",
    description: "A random card from the many worlds of Magic: The Gathering. (Note: I am not associated with Wizards of the Coast. Data provided from Scryfall in accordance with Wizards' Fan Content Policy.)",
  });
  const [playingCardInfo, setPlayingCardInfo] = useState({
    image: "/playingcardback.jpg",
    alt: "Playing card back",
    name: "Playing Card",
    description: "A playing card drawn from a standard deck.",
  });

  const [currentInfo, setCurrentInfo] = useState({
    image: "/playingcardback.jpg",
    alt: "Card back",
    name: "",
    description: "",
  });

  const [bigCards, setBigCards] = useState([
    {
      src: "/tarotback.jpg",
      alt: "Tarot Card",
      hoveredTransform: "rotate(-15deg) translateY(-20px)",
      unhoveredTransform: "rotate(-15deg)",
      width: "245px",
      zIndex: 0,
      flipSrc: "",
      flipAlt: "",
      flipped: false,
    },
    {
      src: "/magicback.jpg",
      alt: "Magic Card",
      hoveredTransform: "translateY(-60px)",
      unhoveredTransform: "translateY(-40px)",
      width: "293px",
      zIndex: 1,
      flipSrc: "",
      flipAlt: "",
      flipped: false,
    },
    {
      src: "/playingcardback.jpg",
      alt: "Playing Card",
      hoveredTransform: "rotate(15deg) translateY(-20px)",
      unhoveredTransform: "rotate(15deg)",
      width: "285px",
      zIndex: 2,
      flipSrc: "",
      flipAlt: "",
      flipped: false,
    },
  ]);

  const handleDraw = () => {
    if (!drawn) {

      // Fetch tarot card info
      fetch("https://tarotapi.dev/api/v1/cards/random?n=1")
        .then((response) => response.json())
        .then((data) => {
          setTarotInfo({
            image: `https://www.sacred-texts.com/tarot/pkt/img/${data.cards[0].name_short}.jpg`,
            alt: data.cards[0].name,
            name: data.cards[0].name,
            description: data.cards[0].desc + "Upright:" + data.cards[0].meaning_up + " // Reversed: " + data.cards[0].meaning_rev,
          });
          setBigCards((prevCards) => {
            const updatedCards = [...prevCards];
            const flipUrl = `https://www.sacred-texts.com/tarot/pkt/img/${data.cards[0].name_short}.jpg`;
            updatedCards[0] = {
              ...updatedCards[0],
              flipSrc: flipUrl,
              flipAlt: data.cards[0].name,
            };
            return updatedCards;
          });
        });

      // Fetch magic card info
      fetch("https://api.scryfall.com/cards/random")
        .then((response) => response.json())
        .then((data) => {
          setMagicInfo({
            image: data.image_uris?.normal || data.image_uris?.large || data.image_uris?.png || "/magicback.jpg",
            alt: data.name,
            name: data.name,
            description: data.oracle_text + " From the set "+ data.set_name + " (" + data.set.toUpperCase() + "), released " + data.released_at,
          });
          setBigCards((prevCards) => {
            const updatedCards = [...prevCards];
            const flipUrl = data.image_uris?.normal || data.image_uris?.large || data.image_uris?.png;
            updatedCards[1] = {
              ...updatedCards[1],
              flipSrc: flipUrl,
              flipAlt: data.name,
            };
            return updatedCards;
          });
        });

      // Fetch playing card info
      fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
        .then((response) => response.json())
        .then((data) => {
          setPlayingCardInfo({
            image: `https://deckofcardsapi.com/static/img/${data.cards[0].code}.png`,
            alt: `${data.cards[0].value} of ${data.cards[0].suit}`,
            name: `${data.cards[0].value} of ${data.cards[0].suit}`,
            description: `The ${data.cards[0].value} of ${data.cards[0].suit}.`,
          });
          setBigCards((prevCards) => {
            const updatedCards = [...prevCards];
            const flipUrl = `https://deckofcardsapi.com/static/img/${data.cards[0].code}.png`;
            updatedCards[2] = {
              ...updatedCards[2],
              flipSrc: flipUrl,
              flipAlt: `${data.cards[0].value} of ${data.cards[0].suit}`,
            };
            return updatedCards;
          });

        });
      
    }
    setDrawn(!drawn);

    
  };


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-10 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl sm:text-6xl font-bold text-center sm:text-left">Three Cards</h1>
      <main className="flex flex-col gap-[32px] mb-20 pb-20 align-items-center">
        
        <div className=" items-center align-items-center justify-center gap-4">
        <div
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838bb] dark:hover:bg-[#ccc] font-medium text-lg h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            onClick = {() => {
                handleDraw();
            }}
          >
            <Image
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
            <div className="flex flex-row items-center justify-center relative mb-10">

              {bigCards.map((card, index) => (
                <BigCard
                  key={index}
                  src={card.src}
                  alt={card.alt}
                  hoveredTransform={card.hoveredTransform}
                  unhoveredTransform={card.unhoveredTransform}
                  width={card.width}
                  zIndex={card.zIndex}
                  flipSrc={card.flipSrc}
                  flipAlt={card.flipAlt}
                  flipped={card.flipped}
                  
                />
              ))}

            </div>



        </Box>
        } 
          {
            drawn && currentInfo.name && <Box>
              <h1 className="text-4xl sm:text-4xl mt-10 font-bold text-center sm:text-left">{currentInfo.name}</h1>
              <div className="flex flex-row items-center justify-center relative">
                <BigCard
                  src={currentInfo.image}
                  alt={currentInfo.alt}
                  hoveredTransform="translateY(-20px)"
                  unhoveredTransform="translateY(0px)"
                  width="290"
                  zIndex={2}
                  flipSrc={currentInfo.image}
                  flipAlt={currentInfo.alt}
                  flipped={true}
                  
                />

                <p>{currentInfo.description}</p>

              </div>
            </Box>
          
        }
      </main>
      
    </div>
  );
}
