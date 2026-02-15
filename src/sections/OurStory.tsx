import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: 'January 2020',
    title: 'The First Meeting',
    description:
      'We met at a mutual friend\'s party. Little did we know that this chance encounter would change our lives forever. The connection was instant, and we talked for hours.',
    image: '/images/timeline-1.jpg',
  },
  {
    date: 'February 2020',
    title: 'Our First Date',
    description:
      'A romantic walk in the park followed by dinner at our favorite restaurant. We laughed, shared stories, and realized we had found something special.',
    image: '/images/timeline-2.jpg',
  },
  {
    date: 'December 2024',
    title: 'The Proposal',
    description:
      'Under a sky full of stars, Alex got down on one knee and asked the question that would begin our forever. It was the most magical moment of our lives.',
    image: '/images/timeline-3.jpg',
  },
  {
    date: 'June 2025',
    title: 'The Wedding',
    description:
      'We can\'t wait to celebrate our love surrounded by family and friends. Join us as we begin this new chapter of our lives together.',
    image: '/images/timeline-4.jpg',
  },
];

const OurStory = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline line animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline items animation
      gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((item, index) => {
        const isEven = index % 2 === 0;
        const image = item.querySelector('.timeline-image');
        const content = item.querySelector('.timeline-content');
        const dot = item.querySelector('.timeline-dot');

        gsap.fromTo(
          content,
          { opacity: 0, x: isEven ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          image,
          { opacity: 0, x: isEven ? 50 : -50, scale: 0.9 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: item,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="py-20 sm:py-32 bg-muted/30 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #d8af72 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16 sm:mb-24">
          <p className="text-[#d8af72] text-sm tracking-[0.3em] uppercase mb-4">
            Our Journey
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-foreground mb-6">
            Our Love Story
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-[1px] bg-[#d8af72]" />
            <Heart className="w-5 h-5 text-[#d8af72]" fill="currentColor" />
            <div className="w-16 h-[1px] bg-[#d8af72]" />
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center Line - Desktop */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#d8af72] via-[#d8af72] to-transparent origin-top"
            style={{ transform: 'translateX(-50%)' }}
          />

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-24">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`timeline-item relative grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                  index % 2 === 0 ? '' : 'md:direction-rtl'
                }`}
              >
                {/* Center Dot - Desktop */}
                <div className="timeline-dot hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-background rounded-full items-center justify-center shadow-lg z-10">
                  <Heart className="w-5 h-5 text-[#d8af72]" fill="currentColor" />
                </div>

                {/* Content */}
                <div
                  className={`timeline-content ${
                    index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:order-2 md:pl-16'
                  }`}
                >
                  <span className="inline-block text-[#d8af72] text-sm tracking-wider mb-2">
                    {event.date}
                  </span>
                  <h3 className="font-playfair text-2xl sm:text-3xl text-foreground mb-4">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Image */}
                <div
                  className={`timeline-image ${
                    index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                  }`}
                >
                  <div className="relative group overflow-hidden">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    {/* Frame */}
                    <div className="absolute inset-4 border border-white/50 pointer-events-none transition-all duration-500 group-hover:inset-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
