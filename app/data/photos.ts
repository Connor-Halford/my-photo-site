export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  location?: string;    // Optional
  date?: string;        // Optional (e.g. "2026-03")
  tags: string[];       // Mountains, waterfalls, etc.
  caption?: string;     // For popup
  lat?: number;        // Optional, for map
  lng?: number;        // Optional, for map
};

export const photos: Photo[] = [
  {
    id: 'img-7297',
    src: '/images/IMG_7297.jpg',
    width: 2852,
    height: 4277,
    location: 'Laguna Miscanti, Chile', // TODO: add location
    date: '2024-09',
    tags: ['nature', 'mountaints', 'desert', 'wildlife'], // TODO: review tags
    caption: 'Vicunas at base of volcano', // TODO: add caption
  },
  {
    id: 'img-6652-copy',
    src: '/images/IMG_6652 copy.jpg',
    width: 4752,
    height: 3168,
    location: 'Iceland', // TODO: add location
    date: '2024-07',
    tags: ['nature','landscape', 'mountains', 'ocean'], // TODO: review tags
    caption: 'Black sand beach', // TODO: add caption
  },
   {
    id: 'photo1',
    src: '/images/photo1.jpg',
    width: 3168,
    height: 4752,
    location: 'Torres del Paine National Park, Chile', // TODO: add location
    date: '2024-10',
    tags: ['nature', 'mountains', 'landscape'], // TODO: review tags
    caption: 'Waves below Los Cuernos', // TODO: add caption
  },
  {
    id: 'photo5',
    src: '/images/photo5.jpg',
    width: 4752,
    height: 3168,
    location: 'Ohio, USA', // TODO: add location
    date: '2024-04',
    tags: ['sky'], // TODO: review tags
    caption: 'Total solar eclipse', // TODO: add caption
  },
  {
    id: 'img-6748',
    src: '/images/IMG_6748.jpg',
    width: 4752,
    height: 3168,
    location: 'Iceland', // TODO: add location
    date: '2024-07',
    tags: ['nature', 'ocean'], // TODO: review tags
    caption: 'Beached ice', // TODO: add caption
  },
 {
    id: 'img-6781',
    src: '/images/IMG_6781.jpg',
    width: 4752,
    height: 3168,
    location: 'Iceland', // TODO: add location
    date: '2024-07',
    tags: ['nature', 'mountains', 'landscape'], // TODO: review tags
    caption: 'Walking through foggy field', // TODO: add caption
  },
  {
    id: 'img-7221',
    src: '/images/IMG_7221.jpg',
    width: 3168,
    height: 4752,
    location: 'Chile', // TODO: add location
    date: '2024-09',
    tags: ['nature', 'sky'], // TODO: review tags
    caption: 'The Milky Way', // TODO: add caption
  },
 {
    id: 'img-6871',
    src: '/images/IMG_6871.jpg',
    width: 3697,
    height: 2465,
    location: 'Iceland', // TODO: add location
    date: '2024-08',
    tags: ['nature', 'wildlife', 'ocean'], // TODO: review tags
    caption: 'Three puffins', // TODO: add caption
  },
  {
    id: 'img-7169',
    src: '/images/IMG_7169.jpg',
    width: 4752,
    height: 3168,
    location: 'Chile', // TODO: add location
    date: '2024-09',
    tags: ['nature', 'wildlife', 'desert'], // TODO: review tags
    caption: 'Lone guanaco', // TODO: add caption
  },
  {
    id: 'img-5572',
    src: '/images/IMG_5572.jpg',
    width: 3168,
    height: 4752,
    location: 'Colorado, USA', // TODO: add location
    date: '2023-12',
    tags: ['nature',  'mountains', 'landscape'], // TODO: review tags
    caption: 'A snowy peak', // TODO: add caption
  },
 {
    id: 'img-6292-1',
    src: '/images/IMG_6292 1.jpg',
    width: 4752,
    height: 3168,
    location: 'Ohio, USA', // TODO: add location
    date: '2024-05',
    tags: ['sky'], // TODO: review tags
    caption: 'Northern lights in Ohio', // TODO: add caption
  },
  {
    id: 'photo2',
    src: '/images/photo2.jpg',
    width: 4752,
    height: 3168,
    location: 'Rome, Italy', // TODO: add location
    date: '2024-06',
    tags: ['architecture', 'historical', 'urban'], // TODO: review tags
    caption: 'The Collosseum', // TODO: add caption
  },
  
  {
    id: 'img-5604',
    src: '/images/IMG_5604.jpg',
    width: 4752,
    height: 3168,
    location: 'Colorado, USA', // TODO: add location
    date: '2023-12',
    tags: ['nature', 'mountains', 'sky', 'landscape'], // TODO: review tags
    caption: 'Mountain range after sunset', // TODO: add caption
  },
 {
    id: 'img-7176',
    src: '/images/IMG_7176.jpg',
    width: 4665,
    height: 3110,
    location: 'Valle de la Luna, Chile', // TODO: add location
    date: '2024-09',
    tags: ['nature', 'desert'], // TODO: review tags
    caption: 'Valley of the Moon', // TODO: add caption
  },
  {
    id: 'img-6729',
    src: '/images/IMG_6729.jpg',
    width: 3168,
    height: 4752,
    location: 'Iceland', // TODO: add location
    date: '2024-07',
    tags: ['nature', 'ocean'], // TODO: review tags
    caption: 'Floating iceberg', // TODO: add caption
  },
  {
    id: 'img-7355',
    src: '/images/IMG_7355.jpg',
    width: 3168,
    height: 4752,
    location: 'Atacama Desert, Chile', // TODO: add location
    date: '2024-09',
    tags: ['nature', 'mountains', 'desert', 'landscape'], // TODO: review tags
    caption: 'Colorful minerals', // TODO: add caption
  },
  
];
