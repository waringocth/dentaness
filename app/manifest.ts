import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dentaness Klinik Sistemi',
    short_name: 'Dentaness',
    description: 'Dentaness Randevu Yönetim Paneli',
    start_url: '/admin',
    display: 'standalone',
    background_color: '#0d9488',
    theme_color: '#0d9488',
    icons: [
      { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  }
}
