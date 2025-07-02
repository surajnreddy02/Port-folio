import React from 'react';
import { motion } from 'framer-motion';

interface SectionIndicatorsProps {
  currentSection: number;
}

const SectionIndicators: React.FC<SectionIndicatorsProps> = ({ currentSection }) => {
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="section-indicators">
      {sections.map((section, index) => (
        <motion.button
          key={section.id}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollToSection(section.id)}
          className={`section-indicator ${currentSection === index ? 'active' : ''}`}
          title={section.label}
        />
      ))}
    </div>
  );
};

export default SectionIndicators;