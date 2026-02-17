import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WEDDING_DATA } from '@/services/Data';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const preTitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dateRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background scale animation
      gsap.fromTo(
        bgRef.current,
        { scale: 1.2 },
        { scale: 1, duration: 2.5, ease: 'power2.out' }
      );

      // Content entrance animations
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(
        preTitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 80, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          dateRef.current,
          { opacity: 0, y: 30, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' },
          '-=0.8'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' },
          '-=0.5'
        );

      // Floating elements animation
      gsap.utils.toArray<HTMLElement>('.floating-element').forEach((el, i) => {
        gsap.to(el, {
          y: 'random(-30, 30)',
          x: 'random(-20, 20)',
          rotation: 'random(-15, 15)',
          duration: 'random(3, 5)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.5,
        });
      });

      // Parallax scroll effect
      gsap.to(bgRef.current, {
        y: 200,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToRSVP = () => {
    const rsvpSection = document.querySelector('#rsvp');
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToStory = () => {
    const storySection = document.querySelector('#story');
    if (storySection) {
      storySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        <img
          src="images/hero-bg.jpg"
          alt="Wedding Background"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Floating Decorative Elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-[15%] left-[10%] text-white/20">
          <Heart className="w-8 h-8" fill="currentColor" />
        </div>
        <div className="floating-element absolute top-[25%] right-[15%] text-white/15">
          <Heart className="w-12 h-12" fill="currentColor" />
        </div>
        <div className="floating-element absolute bottom-[30%] left-[8%] text-white/10">
          <Heart className="w-6 h-6" fill="currentColor" />
        </div>
        <div className="floating-element absolute top-[60%] right-[10%] text-white/20">
          <Heart className="w-10 h-10" fill="currentColor" />
        </div>
        {/* Sparkle effects */}
        <div className="absolute top-[20%] left-[30%] animate-sparkle">
          <div className="w-2 h-2 bg-[#d8af72] rounded-full" />
        </div>
        <div className="absolute top-[40%] right-[25%] animate-sparkle" style={{ animationDelay: '1s' }}>
          <div className="w-1.5 h-1.5 bg-[#d8af72] rounded-full" />
        </div>
        <div className="absolute bottom-[40%] left-[20%] animate-sparkle" style={{ animationDelay: '2s' }}>
          <div className="w-2 h-2 bg-[#d8af72] rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Pre-title */}
        <p
          ref={preTitleRef}
          className="text-white/90 text-sm sm:text-base tracking-[0.3em] uppercase mb-6 font-light"
        >
          Save the Date
        </p>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-playfair text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-8 text-shadow"
        >
          <span className="inline-block">{WEDDING_DATA.groom}</span>
          <span className="inline-block mx-4 text-[#d8af72]">&</span>
          <span className="inline-block">{WEDDING_DATA.bride}</span>
        </h1>

        {/* Date */}
        <p
          ref={dateRef}
          className="text-white/90 text-lg sm:text-xl md:text-2xl flex items-center justify-center gap-3 mb-10"
        >
          <Calendar className="w-5 h-5 text-[#d8af72]" />
          <span>{WEDDING_DATA.date}</span>
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={scrollToRSVP}
            className="bg-[#d8af72] hover:bg-[#c49b5e] text-white px-8 py-6 text-base tracking-wide rounded-none transition-all duration-300 hover:scale-105 gold-glow"
          >
            <Heart className="w-4 h-4 mr-2" fill="currentColor" />
            RSVP Now
          </Button>
          <Button
            onClick={scrollToStory}
            variant="outline"
            className="border-white/50 text-white hover:bg-white/10 px-8 py-6 text-base tracking-wide rounded-none transition-all duration-300 bg-transparent"
          >
            Our Story
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
};

export default Hero;
