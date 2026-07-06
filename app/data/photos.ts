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
    id: 'do2a0288',
    src: '/images/DO2A0288.jpg',
    width: 1365,
    height: 2048,
    location: 'Senja, Norway', // TODO: add location
    date: '2026-06', // TODO: add date
    tags: ['nature', 'mountains', 'landscape'], // TODO: review tags
    caption: 'On Top of the Fjord', // TODO: add caption
    lat: 69.50160877496454, // TODO: add latitude
    lng: 17.60309683689257, // TODO: add longitude
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
    id: 'do2a0517',
    src: '/images/DO2A0517.jpg',
    width: 1365,
    height: 2048,
    location: 'Lofoten, Norway', // TODO: add location
    date: '2026-06', // TODO: add date
    tags: ['nature', 'landscape', 'mountains'], // TODO: review tags
    caption: 'Midnight Sun on Reinebringen', // TODO: add caption
    lat: 67.92776039767325, // TODO: add latitude
    lng:  13.073418959144027, // TODO: add longitude
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
    id: 'img-7297',
    src: '/images/IMG_7297.jpg',
    width: 2852,
    height: 4277,
    location: 'Laguna Miscanti, Chile', // TODO: add location
    date: '2024-09',
    tags: ['nature', 'mountains', 'desert', 'wildlife'], // TODO: review tags
    caption: 'Vicunas at base of volcano', // TODO: add caption
    lat: -23.735588533340124, 
    lng: -67.7958398053538
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
    id: 'img-7795',
    src: '/images/IMG_7795.jpg',
    width: 1365,
    height: 2048,
    location: 'Oregon, USA', // TODO: add location
    date: '2025-05', // TODO: add date
    tags: ['nature', 'ocean'], // TODO: review tags
    caption: 'Tillamook Rock Lighthouse', // TODO: add caption
    lat: 45.94232588943487, 
    lng: -123.98801634141951, // TODO: add longitude
  },
 {
    id: 'img-6292',
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
    id: 'do2a0439',
    src: '/images/DO2A0439.jpg',
    width: 1365,
    height: 2048,
    location: 'Henningsvær, Norway', // TODO: add location
    date: '2026-06', // TODO: add date
    tags: ['architecture', 'landscape'], // TODO: review tags
    caption: 'Henningsvær Harbor', // TODO: add caption
    lat: 68.17109097219745,  // TODO: add latitude
    lng: 14.22826045194709, // TODO: add longitude
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
      id: 'img-7394',
      src: '/images/IMG_7394.jpg',
      width: 4752,
      height: 2673,
      location: 'Torres del Paine, Chile', // TODO: add location
      date: '2024-09',
      tags: ['nature', 'mountains', 'landscape'], // TODO: review tags
      caption: 'Horses in the fields of Torres del Paine', // TODO: add caption
      lat: -51.21689216885915, 
      lng: -72.96992040155445
  },
   {
    id: 'do2a0448',
    src: '/images/DO2A0448.jpg',
    width: 1365,
    height: 2048,
    location: 'Henningsvær, Norway', // TODO: add location
    date: '2026-06', // TODO: add date
    tags: ['ocean', 'architecture'], // TODO: review tags
    caption: 'Grass Roof', // TODO: add caption
    lat: 68.17157976316521, // TODO: add latitude
    lng:  14.229673589862937, // TODO: add longitude
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
    id: 'do2a0485',
    src: '/images/DO2A0485.jpg',
    width: 2048,
    height: 1365,
    location: 'Lofoten, Norway', // TODO: add location
    date: '2026-06', // TODO: add date
    tags: ['Nature', 'Landscape', 'Mountaints', 'Ocean'], // TODO: review tags
    caption: 'Arctic Beaches', // TODO: add caption
    lat: 68.08675433298993, // TODO: add latitude
    lng: 13.093460586058564, // TODO: add longitude
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
  {
    id: 'img-4923',
    src: '/images/IMG_4923.jpg',
    width: 2048,
    height: 1365,
    location: 'Monteverde, Costa Rica', // TODO: add location
    date: '2022-12', 
    tags: ['nature', 'wildlife'], 
    caption: 'Hummingbird among verbena flowers', // TODO: add caption
    lat: 10.307137553343512, 
    lng: -84.80511673168473, 
  },
  {
    id: 'img-5058',
    src: '/images/IMG_5058.jpg',
    width: 2048,
    height: 1365,
    location: 'Arches National Park, USA', // TODO: add location
    date: '2023-03', // TODO: add date
    tags: ['nature', 'landscape', 'redrocks'], // TODO: review tags
    caption: 'Delicate Arch at sunrise', // TODO: add caption
    lat: 38.74407006460052, 
    lng: -109.50091857592442, // TODO: add longitude
  },
  {
    id: 'img-6461',
    src: '/images/IMG_6461.jpg',
    width: 1365,
    height: 2048,
    location: 'Montreaux, Switzerland', // TODO: add location
    date: '2024-06', // TODO: add date
    tags: ['nature', 'landscape', 'mountains'], // TODO: review tags
    caption: 'Hangliders from Dent de Jaman', // TODO: add caption
    lat: 46.44497977547233, 
    lng: 6.974856694619266,
  },
  {
    id: 'img-6915',
    src: '/images/IMG_6915.jpg',
    width: 1365,
    height: 2048,
    location: 'Cuyahoga Valley National Park, USA', // TODO: add location
    date: '2024-08', // TODO: add date
    tags: ['nature', 'architecture'], // TODO: review tags
    caption: 'Station Road Bridge', // TODO: add caption
    lat: 41.323807370605174, 
    lng: -81.58704265711836, // TODO: add longitude
  },
   {
    id: 'img-1314',
    src: '/images/IMG_1314.jpg',
    width: 2048,
    height: 1536,
    location: 'Folgefonna Glacier, Norway', // TODO: add location
    date: '2026-06', // TODO: add date
    tags: ['nature', 'glacier'], // TODO: review tags
    caption: 'Glacier Team', // TODO: add caption
    lat: 60.21225593191782, // TODO: add latitude
    lng: 6.430994698054693, // TODO: add longitude
  },
  {
    id: 'img-7603',
    src: '/images/IMG_7603.jpg',
    width: 1365,
    height: 2048,
    location: 'Ohio, USA', // TODO: add location
    date: '2024-12', // TODO: add date
    tags: ['urban'], // TODO: review tags
    caption: 'Lights in a tree', // TODO: add caption
    lat: 41.246409659694976, 
    lng: -81.43848428339577, // TODO: add longitude
  },
  {
    id: 'img-7939',
    src: '/images/IMG_7939.jpg',
    width: 1365,
    height: 2048,
    location: 'Hawaii, USA', // TODO: add location
    date: '2025-06', // TODO: add date
    tags: ['nature', 'waterfall'], // TODO: review tags
    caption: 'Waterfall in Waimea Canyon', // TODO: add caption
    lat: 22.101632233905196, 
    lng: -159.67721767800936, // TODO: add longitude
  },
  {
    id: 'do2a0132',
    src: '/images/DO2A0132.jpg',
    width: 1365,
    height: 2048,
    location: 'Florida, USA', // TODO: add location
    date: '2026-05', // TODO: add date
    tags: ['nature', 'ocean', ], // TODO: review tags
    caption: 'Atlantic Sunrise', // TODO: add caption
    lat: 28.128116218537603, 
    lng: -80.57693370623178, // TODO: add longitude
  },
  
  
 
 
  {
    id: 'do2a0552',
    src: '/images/DO2A0552.jpg',
    width: 1365,
    height: 2048,
    location: 'Odda, Norway', // TODO: add location
    date: '2026-06', // TODO: add date
    tags: ['waterfall', 'nature', 'rainbow'], // TODO: review tags
    caption: 'Tjørnadalsfossen', // TODO: add caption
    lat: 60.02784316884682,  // TODO: add latitude
    lng: 6.538649028130602, // TODO: add longitude
  },
  {
    id: 'img-5044',
    src: '/images/IMG_5044.jpg',
    width: 2048,
    height: 1365,
    location: 'Arches National Park, USA', // TODO: add location
    date: '2023-03', // TODO: add date
    tags: ['nature', 'landscape'], // TODO: review tags
    caption: 'Mesas Above the Clouds', // TODO: add caption
    lat: 38.74407006460051, 
    lng: -109.50091857592441,
  },
  
  {
    id: 'do2a0504',
    src: '/images/DO2A0504.jpg',
    width: 2048,
    height: 1365,
    location: 'Lofoten, Norway', // TODO: add location
    date: '2026-06', // TODO: add date
    tags: ['Nature', 'Landscape', 'Mountains'], // TODO: review tags
    caption: '2000 Step View', // TODO: add caption
    lat: 67.92778886223601, // TODO: add latitude
    lng: 13.072901860055234, // TODO: add longitude
  },
 
];
