import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EVENT_DETAILS } from '@/services/Data';

gsap.registerPlugin(ScrollTrigger);

export interface DetailCard {
  icon: React.ElementType;
  title: string;
  content: string;
  subContent?: string;
  span: string;
}

const WeddingDetails = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Grid cards animation
      gsap.utils.toArray<HTMLElement>('.detail-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Icon draw animation
        const icon = card.querySelector('.detail-icon');
        gsap.fromTo(
          icon,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            delay: index * 0.1 + 0.3,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
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
      id="details"
      ref={sectionRef}
      className="py-20 sm:py-32 bg-background relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#d8af72]/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d8af72]/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <p className="text-[#d8af72] text-sm tracking-[0.3em] uppercase mb-4">
            The Celebration
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-foreground mb-6">
            Wedding Details
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our special day. We can&apos;t wait to
            celebrate with you!
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {EVENT_DETAILS.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <div
                key={index}
                className={`detail-card group relative bg-card hover:bg-muted p-6 md:p-8 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] cursor-pointer overflow-hidden ${detail.span}`}
              >
                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#d8af72] transition-colors duration-500" />

                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#d8af72]/0 to-[#d8af72]/0 group-hover:from-[#d8af72]/5 group-hover:to-transparent transition-all duration-500" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="detail-icon w-12 h-12 bg-[#d8af72]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#d8af72] transition-colors duration-500">
                    <Icon className="w-5 h-5 text-[#d8af72] group-hover:text-white transition-colors duration-500" />
                  </div>

                  {/* Text */}
                  <h3 className="font-playfair text-xl md:text-2xl text-foreground mb-2">
                    {detail.title}
                  </h3>
                  <p className="text-foreground font-medium">{detail.content}</p>
                  {detail.subContent && (
                    <p className="text-muted-foreground text-sm mt-1">
                      {detail.subContent}
                    </p>
                  )}
                </div>

                {/* Corner Decoration */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#d8af72]/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-card px-6 py-3 rounded-full border border-[#d8af72]/30">
            <span className="text-muted-foreground text-sm">
              Questions? Contact us at{' '}
            </span>
            <a
              href="mailto:kkvamshee@gmail.com"
              className="text-[#d8af72] hover:underline text-sm font-medium"
            >
              kkvamshee@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingDetails;
