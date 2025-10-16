import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TradingApp - Professional Trading Platform',
    short_name: 'TradingApp',
    description: 'Professional trading platform with advanced tools and educational resources',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#22c55e',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}