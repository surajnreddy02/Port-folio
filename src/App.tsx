import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import SectionIndicators from './components/SectionIndicators';
import LoadingScreen from './components/LoadingScreen';
import ChatGPT from './components/ChatGPT';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Initialize smooth scroll behavior
      document.documentElement.style.scrollBehavior = 'smooth';

      // Section transition logic
      const sections = document.querySelectorAll('.section');
      let isScrolling = false;
      let scrollTimeout: NodeJS.Timeout;

      const handleScroll = () => {
        if (isScrolling) return;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          
          sections.forEach((section, index) => {
            const sectionElement = section as HTMLElement;
            const sectionTop = sectionElement.offsetTop;
            const sectionHeight = sectionElement.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;
            
            // Check if section is in view with threshold
            const threshold = windowHeight * 0.5; // 50% threshold
            const isInView = scrollY >= (sectionTop - threshold) && 
                           scrollY < (sectionBottom - threshold);
            
            if (isInView && currentSection !== index) {
              setCurrentSection(index);
            }
          });
        }, 100);
      };

      // Smooth section navigation
      const navigateToSection = (sectionIndex: number) => {
        const targetSection = sections[sectionIndex] as HTMLElement;
        if (targetSection) {
          isScrolling = true;
          
          window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
          });

          // Reset scrolling flag after animation
          setTimeout(() => {
            isScrolling = false;
          }, 1000);
        }
      };

      // Add scroll listener
      window.addEventListener('scroll', handleScroll, { passive: true });

      // Initialize GSAP animations
      gsap.fromTo('.parallax-bg', 
        { y: 0 },
        {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: '.parallax-bg',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      // Section entrance animations
      sections.forEach((section: any, index) => {
        gsap.fromTo(section.querySelector('.section-content'),
          { 
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Card animations
      gsap.utils.toArray('.card-hover').forEach((card: any) => {
        gsap.fromTo(card,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Expose navigation function globally
      (window as any).navigateToSection = navigateToSection;

      return () => {
        window.removeEventListener('scroll', handleScroll);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [isLoading, currentSection]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Navbar currentSection={currentSection} />
      <SectionIndicators currentSection={currentSection} />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <ChatGPT />
        <Contact />
      </main>
    </div>
  );
}

export default App;