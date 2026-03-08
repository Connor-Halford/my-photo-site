export type Photo = {
  id: string;
  src: string;
  title: string;
  location: string;
  category: 'landscape' | 'urban' | 'travel' | 'portrait';
  caption: string;
};

export const photos: Photo[] = [
  {
    id: '1',
    src: '/images/photo1.jpg',
    title: 'Sunset Peaks',
    location: 'Rocky Mountains, CO',
    category: 'landscape',
    caption: 'Golden hour after 14 miles of hiking.',
  },
  {
    id: '2', 
    src: '/images/photo2.jpg',
    title: 'Rainy Reflections',
    location: 'Chicago, IL',
    category: 'urban',
    caption: 'Puddle reflections after a downtown storm.',
  },
  // Add 8-10 more real photos here
];
