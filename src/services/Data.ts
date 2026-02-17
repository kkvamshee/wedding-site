import type { GalleryImage } from "@/sections/Gallery";
import type { TimelineEvent } from "@/sections/OurStory";
import type { DetailCard } from "@/sections/WeddingDetails";
import { Clock, MapPin, Shirt, Utensils, Music, Car } from "lucide-react";

export interface WeddingData {
    groom: string;
    bride: string;
    date: string;
    contactEmail: string;
}

export const WEDDING_DATA: WeddingData = {
    groom: "Vamshee",
    bride: "Sakthi",
    date: "May 9th, 2026",
    contactEmail: "kkvamshee@gmail.com"
}

export const STORY_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    date: 'January 2020',
    title: 'The First Meeting',
    description:
      'We met at a mutual friend\'s party. Little did we know that this chance encounter would change our lives forever. The connection was instant, and we talked for hours.',
    image: 'images/timeline-1.jpg',
  },
  {
    date: 'February 2020',
    title: 'Our First Date',
    description:
      'A romantic walk in the park followed by dinner at our favorite restaurant. We laughed, shared stories, and realized we had found something special.',
    image: 'images/timeline-2.jpg',
  },
  {
    date: 'December 2024',
    title: 'The Proposal',
    description:
      'Under a sky full of stars, Alex got down on one knee and asked the question that would begin our forever. It was the most magical moment of our lives.',
    image: 'images/timeline-3.jpg',
  },
  {
    date: 'June 2025',
    title: 'The Wedding',
    description:
      'We can\'t wait to celebrate our love surrounded by family and friends. Join us as we begin this new chapter of our lives together.',
    image: 'images/timeline-4.jpg',
  },
];

export const EVENT_DETAILS: DetailCard[] = [
  {
    icon: Clock,
    title: 'When',
    content: 'May 9th, 2025',
    subContent: 'Ceremony: 9:40 AM',
    span: 'col-span-2',
  },
  {
    icon: MapPin,
    title: 'Where',
    content: 'Landmark Conventions',
    subContent: 'ECIL, Hyderabad',
    span: 'col-span-2',
  },
  {
    icon: Shirt,
    title: 'Dress Code',
    content: 'Semi - Formal Attire',
    subContent: 'Look Cool',
    span: 'col-span-1 row-span-2',
  },
  {
    icon: Utensils,
    title: 'Lunch',
    content: 'Dinner & Dancing',
    subContent: 'Starts at 6:00 PM',
    span: 'col-span-1',
  },
  {
    icon: Music,
    title: 'Entertainment',
    content: 'Live Band',
    subContent: 'DJ until midnight',
    span: 'col-span-1',
  },
  {
    icon: Car,
    title: 'Parking',
    content: 'Valet Available',
    subContent: 'Free for guests',
    span: 'col-span-2',
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: 'images/gallery-1.jpg', alt: 'Couple dancing', aspectRatio: 'aspect-[3/4]' },
  { src: 'images/gallery-2.jpg', alt: 'Wedding bouquet', aspectRatio: 'aspect-[4/3]' },
  { src: 'images/gallery-3.jpg', alt: 'Happy couple', aspectRatio: 'aspect-square' },
  { src: 'images/gallery-4.jpg', alt: 'Reception table', aspectRatio: 'aspect-[3/4]' },
  { src: 'images/gallery-5.jpg', alt: 'Sunset moment', aspectRatio: 'aspect-[4/3]' },
  { src: 'images/gallery-6.jpg', alt: 'Wedding rings', aspectRatio: 'aspect-square' },
];