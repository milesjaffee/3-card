import type { NextConfig } from "next";
import path from 'path';

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

    webpack: (config) => {
      config.resolve.alias['@'] = path.resolve(__dirname, 'app');
      return config;
    }
  
};

export default nextConfig;
