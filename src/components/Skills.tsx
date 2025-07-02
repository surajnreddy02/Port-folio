import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Code, Globe, Database, Cpu, Wrench, Zap, Terminal, Layers } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [searchTerm, setSearchTerm] = useState('');

  const skillCategories = [
    {
      title: 'Frontend',
      icon: Globe,
      skills: ['HTML', 'CSS', 'Tailwind', 'React', 'Next.js', 'TypeScript', 'JavaScript']
    },
    {
      title: 'Backend',
      icon: Terminal,
      skills: ['Node.js', 'Flask', 'Django', 'Express']
    },
    {
      title: 'Database',
      icon: Database,
      skills: ['MongoDB', 'PostgreSQL', 'Prisma', 'NeonDB', 'Redis', 'Firebase']
    },
    {
      title: 'Blockchain',
      icon: Cpu,
      skills: ['Thirdweb', 'Solidity', 'Web3.js', 'IPFS']
    },
    {
      title: 'Languages',
      icon: Code,
      skills: ['JavaScript', 'TypeScript', 'Python', 'Solidity']
    },
    {
      title: 'Big Data',
      icon: Layers,
      skills: ['Kafka', 'Hadoop', 'Spark']
    },
    {
      title: 'Tools',
      icon: Wrench,
      skills: ['Git', 'Docker', 'Vite', 'Webpack', 'TensorFlow']
    }
  ];

  // Filter skills based on search term
  const filteredCategories = skillCategories
    .map(category => ({
      ...category,
      skills: category.skills.filter(skill =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(category => category.skills.length > 0);

  return (
    <section id="skills" className="section min-h-screen bg-primary">
      <div className="section-content flex items-center justify-center flex-1 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Skills
            </h2>
            <p className="text-secondary max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative max-w-md mx-auto mb-10"
          >
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <Search className="text-muted w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input w-full pl-12 py-3 rounded-lg"
            />
          </motion.div>

          {/* Skills Display */}
          {filteredCategories.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card border border-custom rounded-xl p-6 shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.title} className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="text-lg font-semibold text-primary">{category.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map(skill => (
                          <span 
                            key={`${category.title}-${skill}`}
                            className="px-3 py-1.5 bg-secondary border border-light rounded-md text-xs font-medium text-secondary hover:border-accent transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-card border border-custom rounded-xl p-8 max-w-md mx-auto">
                <Zap className="w-12 h-12 text-muted mx-auto mb-4" />
                <p className="text-muted text-lg mb-4">No skills found matching "{searchTerm}"</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-4 py-2 text-accent hover:text-accent-hover transition-colors"
                >
                  Clear search
                </button>
              </div>
            </motion.div>
          )}

          {/* Skills Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 bg-card border border-custom rounded-xl p-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-accent mb-1">
                  {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}
                </div>
                <div className="text-xs text-muted">Total Skills</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">
                  {skillCategories.length}
                </div>
                <div className="text-xs text-muted">Categories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">3+</div>
                <div className="text-xs text-muted">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">5+</div>
                <div className="text-xs text-muted">Projects Built</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;