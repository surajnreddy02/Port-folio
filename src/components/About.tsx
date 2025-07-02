import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Zap, Trophy, Coffee, BookOpen, Gamepad2, PenTool, Target } from 'lucide-react';
import ResumeModal from './ResumeModal';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const currentlyExploring = [
    'Developing a machine learning-based vehicle analytics system',
    'Advancing my knowledge in AI and ML',
    'Understanding system design patterns',
    'Building real-time, interactive web applications',
    'Participating in hackathons and technical events'
  ];

  const keyHighlights = [
    'Winner at MEDNXT Hackathon 2025 for SwasthyaAI',
    'Developer of a real-time vehicle tracking system',
    'Creator of several full-stack projects',
    'Experience with AI technologies',
    'Technical writer and content contributor'
  ];

  const beyondCoding = [
    { icon: PenTool, label: 'Product design' },
    { icon: BookOpen, label: 'Reading tech blogs' },
    { icon: Gamepad2, label: 'Gaming' },
    { icon: Coffee, label: 'Coffee enthusiast' },
    { icon: Target, label: 'Photography' }
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
                <div className="text-sm text-muted mb-4">What I'm learning and working on right now</div>
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
                <div className="text-sm text-muted mb-4">Some of my notable achievements</div>
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
                <h3 className="text-xl font-semibold text-primary">Beyond Code</h3>
              </div>
              <div className="text-sm text-muted mb-6">What I enjoy doing when I'm not programming</div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
              
              <div className="mt-6 pt-6 border-t border-custom">
                <p className="text-secondary text-sm leading-relaxed">
                  I believe that meaningful technology comes from a balanced mix of technical skill, real-world empathy, and continuous curiosity. My approach is rooted in learning by doing, building with purpose, and growing through community engagement.
                </p>
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