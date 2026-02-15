import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import Hero from './sections/Hero';
import OurStory from './sections/OurStory';
import WeddingDetails from './sections/WeddingDetails';
import Gallery from './sections/Gallery';
import RSVP from './sections/RSVP';
import Footer from './sections/Footer';
import Navigation from './components/Navigation';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize scroll animations
    const ctx = gsap.context(() => {
      // Fade in sections on scroll
      gsap.utils.toArray<HTMLElement>('.fade-in-section').forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
        <Navigation />
        <main>
          <Hero />
          <OurStory />
          <WeddingDetails />
          <Gallery />
          <RSVP />
        </main>
        <Footer />
        <Toaster position="top-center" richColors />
      </div>
    </ThemeProvider>
  );
}

export default App;
