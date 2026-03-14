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
    date: 'July 2021',
    title: 'The First Meeting',
    description: `We first met during an archery game and happened to be on the same team. Together we won the game, exchanged phone numbers, and started talking. What began as a simple meeting soon turned into something beautiful — a story we never expected, but are forever grateful for.`,
    image: 'images/timeline-1.jpg',
  },
  {
    date: 'August 2021',
    title: 'Our First Date',
    description:
      `We planned a romantic rooftop dinner, but Singapore's rain had other plans. Instead, we went to watch a movie. It was a simple evening, but we found comfort and peace in each other's company.`,
    image: 'images/timeline-2.jpg',
  },
  {
    date: 'November 2025',
    title: 'The Proposal',
    description:
      'By the sea, under a beautiful sunset, with the sound of waves around us, Vamshee went down on one knee and asked the question that would begin our forever. It was the most magical moment of our lives. 💍',
    image: 'images/timeline-3.jpg',
  },
  {
    date: 'May 2026',
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
    content: 'May 9th, 2026',
    subContent: 'Ceremony: 9:30 AM',
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
    content: 'Traditional Indian Wear',
    span: 'col-span-1 row-span-2',
  },
  {
    icon: Utensils,
    title: 'Food',
    content: 'Breakfast & Lunch',
    span: 'col-span-1',
  },
  {
    icon: Music,
    title: 'Entertainment',
    content: 'Live Band',
    subContent: 'DJ until evening',
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