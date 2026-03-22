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
    lat: -23.735588533340124, 
    lng: -67.7958398053538
  },
  {
    id: 'img-6652',
    src: '/images/IMG_6652.jpg',
    width: 4752,
    height: 3168,
    location: 'Iceland', // TODO: add location
    date: '2024-07',
    tags: ['nature','landscape', 'mountains', 'ocean'], // TODO: review tags
    caption: 'Black sand beach', // TODO: add caption
    lat: 63.40332911281599, 
    lng: -19.129736182266367
  },
   {
    id: 'img-7525',
    src: '/images/IMG_7525.jpg',
    width: 3168,
    height: 4752,
    location: 'Torres del Paine National Park, Chile', // TODO: add location
    date: '2024-10',
    tags: ['nature', 'mountains', 'landscape'], // TODO: review tags
    caption: 'Waves below Los Cuernos', // TODO: add caption
    lat: -51.05547622613886,
    lng: -73.0103703649912
  },
  {
    id: 'img-5989',
    src: '/images/IMG_5989.jpg',
    width: 4752,
    height: 3168,
    location: 'Ohio, USA', // TODO: add location
    date: '2024-04',
    tags: ['sky'], // TODO: review tags
    caption: 'Total solar eclipse', // TODO: add caption
    lat: 40.353941387943316,
    lng: -83.0692040734047
  },
  {
    id: 'img-6748',
    src: '/images/IMG_6748.jpg',
    width: 4752,
    height: 3168,
    location: 'Diamond Beach, Iceland', // TODO: add location
    date: '2024-07',
    tags: ['nature', 'ocean'], // TODO: review tags
    caption: 'Beached ice', // TODO: add caption
    lat: 64.050004557644, 
    lng: -16.180477529077205
  },
 {
    id: 'img-6781',
    src: '/images/IMG_6781.jpg',
    width: 4752,
    height: 3168,
    location: 'Diamond Beach, Iceland', // TODO: add location
    date: '2024-07',
    tags: ['nature', 'mountains', 'landscape'], // TODO: review tags
    caption: 'Walking through foggy field', // TODO: add caption
    lat: 64.05068372567325, 
    lng: -16.179651343247837
  },
  {
    id: 'img-7221',
    src: '/images/IMG_7221.jpg',
    width: 3168,
    height: 4752,
    location: 'Atacama Desert, Chile', // TODO: add location
    date: '2024-09',
    tags: ['nature', 'sky'], // TODO: review tags
    caption: 'The Milky Way', // TODO: add caption
    lat: -22.972153715607067, 
    lng: -68.16584589176945
  },
 {
    id: 'img-6871',
    src: '/images/IMG_6871.jpg',
    width: 3697,
    height: 2465,
    location: 'Akurey Island, Iceland', // TODO: add location
    date: '2024-08',
    tags: ['nature', 'wildlife', 'ocean'], // TODO: review tags
    caption: 'Three puffins', // TODO: add caption
    lat: 64.17209415114453, 
    lng: -21.970790332287333
  },
  {
    id: 'img-7169',
    src: '/images/IMG_7169.jpg',
    width: 4752,
    height: 3168,
    location: 'Atacama Desert, Chile', // TODO: add location
    date: '2024-09',
    tags: ['nature', 'wildlife', 'desert'], // TODO: review tags
    caption: 'Lone guanaco', // TODO: add caption
    lat: -22.656788081997853, 
    lng: -68.3598080375904
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
    lat: 39.41862415751625, 
    lng: -106.0786840660065
  },
 {
    id: 'img-6292-1',
    src: '/images/IMG_6292.jpg',
    width: 4752,
    height: 3168,
    location: 'Ohio, USA', // TODO: add location
    date: '2024-05',
    tags: ['sky'], // TODO: review tags
    caption: 'Northern lights in Ohio', // TODO: add caption
    lat: 40.18858185151961, 
    lng: -82.9740762693163
  },
  {
    id: 'img-6385',
    src: '/images/IMG_6385.jpg',
    width: 4752,
    height: 3168,
    location: 'Rome, Italy', // TODO: add location
    date: '2024-06',
    tags: ['architecture', 'historical', 'urban'], // TODO: review tags
    caption: 'The Collosseum', // TODO: add caption
    lat: 41.89134624220096, 
    lng: 12.492383416235374
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
    lat: 39.192452476000646, 
    lng: -105.81371352138486
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
    lat: -22.916996999441604, 
    lng: -68.24047957088823
  },
  {
    id: 'img-6729',
    src: '/images/IMG_6729.jpg',
    width: 3168,
    height: 4752,
    location: 'Diamond Beach, Iceland', // TODO: add location
    date: '2024-07',
    tags: ['nature', 'ocean'], // TODO: review tags
    caption: 'Floating iceberg', // TODO: add caption
    lat: 64.050004557644, 
    lng: -16.180477529077205
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
    lat: -22.92423085179877, 
    lng: -67.85098231681512
  },

];
