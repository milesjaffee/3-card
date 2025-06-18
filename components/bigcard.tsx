import Image from "next/image";

export default function BigCard({
    src,
    alt,
    hoveredTransform,
    unhoveredTransform,
    width,
    zIndex,
    flipSrc,
    flipAlt,
    flipped}: {
        src: string,
    alt: string,
    hoveredTransform: string,
    unhoveredTransform: string,
    width: string,
    zIndex: number,
    flipSrc?: string,
    flipAlt?: string,
    flipped?: boolean
    }) {

        return (

            <div
            className="relative transition-transform duration-300"
            style={{
            height: "500px",
            width: width,
            transform: unhoveredTransform,
            zIndex: 0,
            }}
                onMouseEnter={(e) => {
                e.currentTarget.style.zIndex = "3";
                e.currentTarget.style.transform = hoveredTransform;
                }}
                onMouseLeave={(e) => {
                e.currentTarget.style.zIndex = zIndex.toString();
                e.currentTarget.style.transform = unhoveredTransform;
                }}
                onClick={(e) => {
                flipped = !flipped;
                e.currentTarget.style.zIndex = flipped ? "4" : zIndex.toString();
                e.currentTarget.querySelector("img")?.setAttribute("src", flipped ? flipSrc || src : src);
                console.log("Trying to go flipped: ", flipSrc ?? src);
                }}
                >
                <Image
                className="rounded-lg shadow-lg"
                src={src}
                alt={alt}
                fill
                style={{ objectFit: "contain", borderRadius: "25px" }}
                unoptimized
                />
            </div>

        );

    
    }