"use client";
import Image from "next/image";
import Box from "@/app/components/box";
import { useState } from "react";
import BigCard from "@/app/components/bigcard";

export default function Home() {
  const [drawn, setDrawn] = useState(false);

  const [tarotInfo, setTarotInfo] = useState({
    back: {
    image: "/tarotback.jpg",
    alt: "Tarot card back",
    name: "Tarot Card",
    description: "A mystical tarot card drawn from the venerable Rider-Waite-Smith deck.",
    desc2: "",
    desc3: "",
    },
    front: {
      image: "/playingcardback.jpg",
      alt: "Card back",
      name: "",
      description: "",
      desc2: "",
      desc3: "",
    }});
  const [magicInfo, setMagicInfo] = useState({
    back: {image: "/magicback.jpg",
    alt: "Magic card back",
    name: "Magic Card",
    description: "A random card from the many worlds of Magic: The Gathering.",
    desc2: "Note: I am not associated with Wizards of the Coast. Data provided from Scryfall in accordance with Wizards' Fan Content Policy.",
    desc3: "",
  },
  front: {
    image: "/playingcardback.jpg",
    alt: "Card back",
    name: "",
    description: "",
    desc2: "",
    desc3: "",
  }});
  const [playingCardInfo, setPlayingCardInfo] = useState({
    back: {image: "/playingcardback.jpg",
    alt: "Playing card back",
    name: "Playing Card",
    description: "A playing card drawn from a standard deck.",
    desc2: "",
    desc3: "",
  },
  front: {
    image: "/playingcardback.jpg",
    alt: "Card back",
    name: "",
    description: "",
    desc2: "",
    desc3: "",
  }});

  const [currentInfo, setCurrentInfo] = useState({
    image: "/playingcardback.jpg",
    alt: "Card back",
    name: "",
    description: "",
    desc2: "",
    desc3: "",
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
      hoveredTransform: "translateY(-55px)",
      unhoveredTransform: "translateY(-35px)",
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
            ...tarotInfo,
            front: {
              image: `https://www.sacred-texts.com/tarot/pkt/img/${data.cards[0].name_short}.jpg`,
              alt: data.cards[0].name,
              name: data.cards[0].name,
              description: "Upright: " + data.cards[0].meaning_up,
              desc2: "Reversed: " + data.cards[0].meaning_rev,
              desc3: "Description: " + data.cards[0].desc,
            },
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
          setMagicInfo({...magicInfo, front: {
            image: data.image_uris?.normal || data.image_uris?.large || data.image_uris?.png || "/magicback.jpg",
            alt: data.name,
            name: data.name,
            description: data.type_line,
            desc2: data.oracle_text,
            desc3: "* From the set "+ data.set_name + " (" + data.set.toUpperCase() + "), released " + data.released_at,
          }});
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
          const fixedName = data.cards[0].value.charAt(0) + data.cards[0].value.slice(1).toLowerCase() + " of " + data.cards[0].suit.charAt(0) + data.cards[0].suit.slice(1).toLowerCase();
          setPlayingCardInfo({...playingCardInfo, front: {
            image: `https://deckofcardsapi.com/static/img/${data.cards[0].code}.png`,
            alt: `${fixedName}`,
            name: `${fixedName}`,
            description: `The ${fixedName}.`,
          }});
          setBigCards((prevCards) => {
            const updatedCards = [...prevCards];
            const flipUrl = `https://deckofcardsapi.com/static/img/${data.cards[0].code}.png`;
            updatedCards[2] = {
              ...updatedCards[2],
              flipSrc: flipUrl,
              flipAlt: `${fixedName}`,
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
                    <div 
                    key={index}
                    onMouseEnter={() => {
                    if (index === 0) setCurrentInfo(bigCards[0].flipped ? tarotInfo.front : tarotInfo.back);
                    else if (index === 1) setCurrentInfo(bigCards[1].flipped ? magicInfo.front : magicInfo.back);
                    else if (index === 2) setCurrentInfo(bigCards[2].flipped ? playingCardInfo.front : playingCardInfo.back);
                    }}
                    onClick={() => {
                    setBigCards((prevCards) => {
                      const updatedCards = [...prevCards];
                      updatedCards[index] = {
                      ...updatedCards[index],
                      flipped: !updatedCards[index].flipped,
                      };
                      return updatedCards;
                    });
                    }}
                    >
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
                      flipped={card.flipped} />
                    </div>
                  

                ))}

            </div>



        </Box>
        } 
          { //currently hovered card infobox
            drawn && currentInfo.name && <Box>
              <h1 className="text-4xl sm:text-4xl mt-10 font-bold text-center sm:text-left">{currentInfo.name}</h1>
              <div className="flex flex-row justify-left gap-10 p-20">
                
                
                  <BigCard 
                    src={currentInfo.image}
                    alt={currentInfo.alt}
                    hoveredTransform="translateY(-20px)"
                    unhoveredTransform=""
                    width="100%"
                    zIndex={10}
                    flipSrc={currentInfo.image}
                    flipAlt={currentInfo.alt}
                    flipped={true}
                    
                  />
              

                <div className="flex-col" style={{width: '100%'}}>
                  <p className="text-xl font-bold">{currentInfo.description}</p>
                  <p> </p>
                  {currentInfo.desc2 && <p className="text-xl">{currentInfo.desc2}</p>}
                  <p> </p>
                  {currentInfo.desc3 && <p className="text-xl">{currentInfo.desc3}</p>}

                </div>

              </div>
            </Box>
          
        }
      </main>
      
    </div>
  );
}
