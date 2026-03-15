export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  location?: string;    // Optional
  date?: string;        // Optional (e.g. "2026-03")
  tags: string[];       // Mountains, waterfalls, etc.
  caption?: string;     // For popup
};

export const photos: Photo[] = [
  {
    id: '1',
    src: '/images/photo1.jpg',
    width: 3168,      // ADD actual width of your photo
    height: 4752,     // ADD actual height of your photo
    location: 'Torres del Paine National Park, Chile',
    date: '2024-10',
    tags: ['landscape', 'mountains', 'nature'],
    caption: 'caption tbd',
  },
  {
    id: '2', 
    src: '/images/photo2.jpg',
    width: 4752,      // ADD your photo dimensions
    height: 3168,
    location: 'Rome, Italy',
    date: '2025-05',
    tags: ['architecture', 'urban'],
    caption: 'The Colloseum in Rome, Italy',
  },
  {
    id: '3',
    src: '/images/photo3.jpg',
    width: 4752,      // ADD actual width of your photo
    height: 3168,     // ADD actual height of your photo
    location: 'Iceland',
    date: '2024-08',
    tags: ['wildlife', 'nature'],
    caption: 'Puffins in Iceland',
  },
  {
    id: '4', 
    src: '/images/photo4.jpg',
    width: 3168,      // ADD your photo dimensions
    height: 4752,
    location: 'Diamond Beach, Iceland',
    date: '2025-08',
    tags: ['landscape', 'nature'],
    caption: 'Icebergs floating near Diamond Beach',
  },
  {
    id: '5',
    src: '/images/photo5.jpg',
    width: 4752,      // ADD actual width of your photo
    height: 3168,     // ADD actual height of your photo
    location: 'Columbus, Ohio',
    date: '2024-04',
    tags: ['sky', 'eclipse', 'nature'],
    caption: 'Total solar eclipse over Columbus, Ohio',
  },
  
];
