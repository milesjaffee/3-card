import Image from "next/image";
import ReactCardFlip from "react-card-flip";
import React from "react";

interface BigCardProps {
    src: string;
    alt: string;
    hoveredTransform: string;
    unhoveredTransform: string;
    width: string;
    zIndex: number;
    flipSrc?: string;
    flipAlt?: string;
    flipped?: boolean;
}

interface BigCardState {
    flipped: boolean;
}

export default class BigCard extends React.Component<BigCardProps, BigCardState> {
    constructor(props: BigCardProps) {
        super(props);
        this.state = {
            flipped: props.flipped || false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.zIndex = "3";
        e.currentTarget.style.transform = this.props.hoveredTransform;
    };

    handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.zIndex = this.props.zIndex.toString();
        e.currentTarget.style.transform = this.props.unhoveredTransform;
    };

    handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        this.setState(prevState => ({ flipped: !prevState.flipped }));
    };

    render() {
        const { src, flipSrc, alt, flipAlt, unhoveredTransform, width } = this.props;

        return (
            <div
                className="relative transition-transform duration-300"
                style={{
                    height: "500px",
                    width: width,
                    transform: unhoveredTransform,
                    zIndex: 0,
                }}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleClick}
            >

                <ReactCardFlip
                    isFlipped={this.state.flipped}
                    flipDirection="horizontal"
                    containerStyle={{ width: "100%", height: "100%" }}>
                <Image
                    className="rounded-lg shadow-lg"
                    src={src}
                    alt={alt}
                    fill
                    style={{ objectFit: "contain", borderRadius: "25px" }}
                    unoptimized
                />
                <Image
                    className="rounded-lg shadow-lg"
                    src={flipSrc || src}
                    alt={flipAlt || alt}
                    fill
                    style={{ objectFit: "contain", borderRadius: "25px" }}
                    unoptimized
                />
                </ReactCardFlip>
            </div>
        );
    }
}