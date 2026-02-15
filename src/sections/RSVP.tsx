import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Check, Loader2, Users, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { submitRSVP, type RSVPData } from '@/services/rsvpService';

gsap.registerPlugin(ScrollTrigger);

const RSVP = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: true,
    guests: 1,
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form card animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 80, rotateY: -15 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Input fields stagger animation
      gsap.utils.toArray<HTMLElement>('.form-field').forEach((field, index) => {
        gsap.fromTo(
          field,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: index * 0.1 + 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Please fill in your name and email');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare RSVP data
      const rsvpData: RSVPData = {
        ...formData,
        submittedAt: new Date().toISOString(),
      };

      // Submit RSVP with data storage and notifications
      const result = await submitRSVP(rsvpData);

      if (result.success) {
        setIsSubmitted(true);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section
      id="rsvp"
      ref={sectionRef}
      className="py-20 sm:py-32 bg-background relative overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d8af72]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#d8af72]/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="text-[#d8af72] text-sm tracking-[0.3em] uppercase mb-4">
            Join Us
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-foreground mb-6">
            Will You Be Joining Us?
          </h2>
          <p className="text-muted-foreground">
            Please let us know if you&apos;ll be able to make it to our special day.
          </p>
        </div>

        {/* Form Card */}
        <div
          ref={formRef}
          className="glassmorphism rounded-2xl p-8 md:p-12 shadow-xl border border-[#d8af72]/30"
          style={{ perspective: '1000px' }}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="form-field">
                <Label htmlFor="name" className="text-foreground mb-2 block">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-[#d8af72]/30 rounded-lg focus:border-[#d8af72] focus:ring-2 focus:ring-[#d8af72]/20 transition-all duration-300 bg-background"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="form-field">
                <Label htmlFor="email" className="text-foreground mb-2 block">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-[#d8af72]/30 rounded-lg focus:border-[#d8af72] focus:ring-2 focus:ring-[#d8af72]/20 transition-all duration-300 bg-background"
                  required
                />
              </div>

              {/* Attending Toggle */}
              <div className="form-field flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#d8af72]/10 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-[#d8af72]" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Will you be attending?</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.attending ? "Can't wait to see you!" : "We'll miss you!"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={formData.attending}
                  onCheckedChange={(checked) => handleInputChange('attending', checked)}
                  className="data-[state=checked]:bg-[#d8af72]"
                />
              </div>

              {/* Number of Guests */}
              {formData.attending && (
                <div className="form-field animate-in fade-in slide-in-from-top-2 duration-300">
                  <Label htmlFor="guests" className="text-foreground mb-2 block">
                    Number of Guests
                  </Label>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#d8af72]/10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-[#d8af72]" />
                    </div>
                    <div className="flex-1">
                      <select
                        id="guests"
                        value={formData.guests}
                        onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-[#d8af72]/30 rounded-lg focus:border-[#d8af72] focus:ring-2 focus:ring-[#d8af72]/20 transition-all duration-300 bg-background"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Message Field */}
              <div className="form-field">
                <Label htmlFor="message" className="text-foreground mb-2 block">
                  Message (Optional)
                </Label>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#d8af72]/10 rounded-full flex items-center justify-center mt-1">
                    <MessageSquare className="w-5 h-5 text-[#d8af72]" />
                  </div>
                  <textarea
                    id="message"
                    placeholder="Leave a message for the couple..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={3}
                    className="flex-1 px-4 py-3 border border-[#d8af72]/30 rounded-lg focus:border-[#d8af72] focus:ring-2 focus:ring-[#d8af72]/20 transition-all duration-300 bg-background resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#d8af72] hover:bg-[#c49b5e] text-white py-6 text-lg tracking-wide rounded-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed gold-glow"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                    Send RSVP
                  </>
                )}
              </Button>
            </form>
          ) : (
            /* Success State */
            <div className="text-center py-8 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-[#d8af72] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-playfair text-2xl text-foreground mb-3">
                Thank You!
              </h3>
              <p className="text-muted-foreground mb-6">
                Your RSVP has been submitted successfully. We can&apos;t wait to celebrate
                with you!
              </p>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    attending: true,
                    guests: 1,
                    message: '',
                  });
                }}
                variant="outline"
                className="border-[#d8af72] text-[#d8af72] hover:bg-[#d8af72] hover:text-white"
              >
                Submit Another Response
              </Button>
            </div>
          )}
        </div>

        {/* Data Storage Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground/70">
            Your response is securely stored. For any questions, please contact us at{' '}
            <a href="mailto:kkvamshee@gmail.com" className="text-[#d8af72] hover:underline">
              kkvamshee@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
