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
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      document.documentElement.style.scrollBehavior = 'smooth';

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
            const threshold = windowHeight * 0.5;

            const isInView =
              scrollY >= sectionTop - threshold &&
              scrollY < sectionBottom - threshold;

            if (isInView && currentSection !== index) {
              setCurrentSection(index);
            }
          });
        }, 100);
      };

      const navigateToSection = (sectionIndex: number) => {
        const targetSection = sections[sectionIndex] as HTMLElement;
        if (targetSection) {
          isScrolling = true;
          window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth',
          });
          setTimeout(() => {
            isScrolling = false;
          }, 1000);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      // ✅ GSAP Animations Scoped
      const ctx = gsap.context(() => {
        // ✅ Parallax animation for backgrounds
        gsap.fromTo(
          '.parallax-bg',
          { y: 0 },
          {
            y: -100,
            ease: 'none',
            scrollTrigger: {
              trigger: '.parallax-bg',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );

        // ✅ Section fade-in animations
        sections.forEach((section) => {
          const content = section.querySelector('.section-content');
          if (!content) return;

          gsap.fromTo(
            content,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
                once: false,
                // markers: true, // Uncomment for visual debug
              },
            }
          );
        });

        // ✅ Card animations
        gsap.utils.toArray('.card-hover').forEach((card: any) => {
          gsap.fromTo(
            card,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                once: false,
              },
            }
          );
        });
      });

      // Expose navigate function globally
      (window as any).navigateToSection = navigateToSection;

      return () => {
        window.removeEventListener('scroll', handleScroll);
        ctx.revert(); // ✅ Clean up GSAP animations
      };
    }
  }, [isLoading]);

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
