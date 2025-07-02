import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Zap, Trophy, Coffee, Film, Mountain, Camera, Users, Gamepad2, PenTool, UtensilsCrossed } from 'lucide-react';
import ResumeModal from './ResumeModal';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const currentlyExploring = [
    'Developing a machine learning-based vehicle analytics system that detects and tracks vehicle count, speed, and number plates using computer vision',
    'Advancing my knowledge in artificial intelligence and machine learning, especially in image processing and NLP applications',
    'Understanding system design patterns for building scalable, maintainable applications',
    'Building real-time, interactive web applications such as a multiplayer housie game and an advanced scientific calculator',
    'Participating in hackathons and technical events to test ideas and learn from others',
    'Writing technical articles to document and share insights from my projects and learning journey'
  ];

  const keyHighlights = [
    'Winner at MEDNXT Hackathon 2025 for SwasthyaAI, an AI-powered health assistant designed for rural healthcare delivery',
    'Developer of a real-time vehicle tracking and number plate recognition system using machine learning and OpenCV',
    'Creator of several full-stack projects deployed on the web, including productivity tools and AI-driven applications',
    'Experience working with AI technologies, blockchain, and progressive web app frameworks',
    'Technical writer and content contributor, regularly sharing knowledge and learnings through blogs and online platforms',
    'Active contributor to developer communities and technical discussions'
  ];

  const beyondCoding = [
    { icon: Film, label: 'Watching movies' },
    { icon: Mountain, label: 'Traveling' },
    { icon: Camera, label: 'Photography' },
    { icon: Users, label: 'Networking' },
    { icon: Gamepad2, label: 'Gaming' },
    { icon: PenTool, label: 'Product design' },
    { icon: UtensilsCrossed, label: 'Foodie' }
  ];

  return (
    <section id="about" className="section min-h-screen bg-primary">
      <div className="section-content flex items-center justify-center flex-1 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              About Me
            </h2>
            <p className="text-secondary max-w-2xl mx-auto">
              Get to know the person behind the code
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* Main About Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card border border-custom rounded-xl p-8 card-hover"
            >
              <div className="flex items-start space-x-3 mb-6">
                <Code className="w-5 h-5 text-accent mt-1" />
                <h3 className="text-xl font-semibold text-primary">Who I Am</h3>
              </div>
              <div className="text-secondary leading-relaxed mb-6">
                <p className="mb-4">
                  I am Suraj N Reddy, a passionate developer currently pursuing Information Science and Engineering at BMS College of Engineering. I am deeply committed to solving real-world problems through technology and enjoy working on projects that blend creativity with technical depth.
                </p>
                <p>
                  I have worked on AI-driven systems like SwasthyaAI, a healthcare platform designed for rural environments, and a machine learning-based vehicle recognition and analytics solution. I enjoy exploring new technologies, contributing to open-source initiatives, and collaborating with communities that push the boundaries of what's possible in tech.
                </p>
              </div>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://github.com/surajnreddy02"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-secondary border border-light rounded-lg hover:border-accent transition-colors"
              >
                <Code size={16} className="text-muted" />
                <span className="text-secondary">GitHub Profile</span>
              </motion.a>
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Currently Exploring */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-card border border-custom rounded-xl p-6 card-hover"
              >
                <div className="flex items-start space-x-3 mb-6">
                  <Zap className="w-5 h-5 text-accent mt-1" />
                  <h3 className="text-lg font-semibold text-primary">Currently Exploring</h3>
                </div>
                <div className="text-sm text-muted mb-4">These are the areas I am actively learning and working on:</div>
                <ul className="bullet-list">
                  {currentlyExploring.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="text-secondary"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Key Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-card border border-custom rounded-xl p-6 card-hover"
              >
                <div className="flex items-start space-x-3 mb-6">
                  <Trophy className="w-5 h-5 text-accent mt-1" />
                  <h3 className="text-lg font-semibold text-primary">Key Highlights</h3>
                </div>
                <div className="text-sm text-muted mb-4">Some of the key accomplishments and experiences that define my journey so far include:</div>
                <ul className="bullet-list">
                  {keyHighlights.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="text-secondary"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Beyond Code Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-card border border-custom rounded-xl p-8 card-hover"
            >
              <div className="flex items-start space-x-3 mb-6">
                <Coffee className="w-5 h-5 text-accent mt-1" />
                <h3 className="text-xl font-semibold text-primary">🎬 Beyond Code</h3>
              </div>
              <div className="text-sm text-muted mb-6">What I enjoy doing when I'm not programming or studying</div>
              
              <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                {beyondCoding.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 1.0 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex flex-col items-center space-y-2 p-4 bg-secondary border border-light rounded-lg hover:border-accent transition-all duration-300 cursor-default"
                    >
                      <Icon className="w-6 h-6 text-accent" />
                      <span className="text-xs text-center text-secondary">{item.label}</span>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="mt-6 pt-6 border-t border-custom space-y-3">
                <p className="text-secondary text-sm leading-relaxed">
                  🎞️ I love watching movies—cinema helps me unwind, reflect, and often inspires creative thinking
                </p>
                <p className="text-secondary text-sm leading-relaxed">
                  🌄 I enjoy traveling, especially to nature-rich places like hills, beaches, and scenic destinations
                </p>
                <p className="text-secondary text-sm leading-relaxed">
                  📷 Photography is a hobby I pursue to capture fleeting moments and landscapes I explore
                </p>
                <p className="text-secondary text-sm leading-relaxed">
                  🤝 I value networking, learning through real conversations and exchanging ideas with peers
                </p>
                <p className="text-secondary text-sm leading-relaxed">
                  🎮 Gaming is a space where I relax and sometimes explore game UI/UX
                </p>
                <p className="text-secondary text-sm leading-relaxed">
                  🧠 Product design intrigues me, especially tools and apps that blend usability with creativity
                </p>
                <p className="text-secondary text-sm leading-relaxed">
                  🍛 I'm a foodie, and nothing excites me more than discovering delicious food, especially a good plate of biryani
                </p>
                <div className="mt-6 pt-4 border-t border-custom">
                  <p className="text-secondary text-sm leading-relaxed">
                    I believe that meaningful technology comes from a balanced mix of technical skill, real-world empathy, and continuous curiosity. My approach is rooted in learning by doing, building with purpose, and growing through community engagement.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Resume Preview Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 btn-secondary rounded-lg"
                onClick={() => setIsResumeModalOpen(true)}
              >
                <span className="text-secondary">Preview Resume</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />
    </section>
  );
};

export default About;