import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ZoomIn } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface GalleryImage {
  src: string;
  alt: string;
  aspectRatio: string;
}

const galleryImages: GalleryImage[] = [
  { src: './images/gallery-1.jpg', alt: 'Couple dancing', aspectRatio: 'aspect-[3/4]' },
  { src: 'images/gallery-2.jpg', alt: 'Wedding bouquet', aspectRatio: 'aspect-[4/3]' },
  { src: 'images/gallery-3.jpg', alt: 'Happy couple', aspectRatio: 'aspect-square' },
  { src: 'images/gallery-4.jpg', alt: 'Reception table', aspectRatio: 'aspect-[3/4]' },
  { src: 'images/gallery-5.jpg', alt: 'Sunset moment', aspectRatio: 'aspect-[4/3]' },
  { src: 'images/gallery-6.jpg', alt: 'Wedding rings', aspectRatio: 'aspect-square' },
];

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

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

      // Gallery items animation with flip effect
      gsap.utils.toArray<HTMLElement>('.gallery-item').forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, rotateX: -30, y: 50 },
          {
            opacity: 1,
            rotateX: 0,
            y: 0,
            duration: 1,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Parallax effect for columns
      const columns = gsap.utils.toArray<HTMLElement>('.gallery-column');
      columns.forEach((column, index) => {
        const speed = index === 1 ? -100 : index === 2 ? 50 : 0;
        gsap.to(column, {
          y: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Split images into 3 columns
  const column1 = galleryImages.filter((_, i) => i % 3 === 0);
  const column2 = galleryImages.filter((_, i) => i % 3 === 1);
  const column3 = galleryImages.filter((_, i) => i % 3 === 2);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-20 sm:py-32 bg-muted/30 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <p className="text-[#d8af72] text-sm tracking-[0.3em] uppercase mb-4">
            Memories
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-foreground mb-6">
            Photo Gallery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A glimpse into our journey together. Click on any photo to view it in
            full size.
          </p>
        </div>

        {/* Masonry Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Column 1 */}
          <div className="gallery-column space-y-4 md:space-y-6">
            {column1.map((image, index) => (
              <div
                key={`col1-${index}`}
                className="gallery-item group relative overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(image)}
                style={{ perspective: '1000px' }}
              >
                <div className={`${image.aspectRatio} overflow-hidden`}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500" />
                </div>
                {/* Border */}
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#d8af72] transition-colors duration-500 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Column 2 - Offset */}
          <div className="gallery-column space-y-4 md:space-y-6 md:mt-12">
            {column2.map((image, index) => (
              <div
                key={`col2-${index}`}
                className="gallery-item group relative overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(image)}
                style={{ perspective: '1000px' }}
              >
                <div className={`${image.aspectRatio} overflow-hidden`}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500" />
                </div>
                {/* Border */}
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#d8af72] transition-colors duration-500 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="gallery-column space-y-4 md:space-y-6 md:mt-6">
            {column3.map((image, index) => (
              <div
                key={`col3-${index}`}
                className="gallery-item group relative overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(image)}
                style={{ perspective: '1000px' }}
              >
                <div className={`${image.aspectRatio} overflow-hidden`}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500" />
                </div>
                {/* Border */}
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#d8af72] transition-colors duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Image */}
          <div
            className="max-w-5xl max-h-[90vh] animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
