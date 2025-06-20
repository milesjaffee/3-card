import type { NextConfig } from "next";

const imageHosts = [
  'www.sacred-texts.com',
  'deckofcardsapi.com',
  'cards.scryfall.io',
]

const nextConfig: NextConfig = {
  
    images: {
      remotePatterns: imageHosts.map((hostname) => ({
        protocol: 'https',
        hostname,
      })),
    },
  
};

export default nextConfig;
