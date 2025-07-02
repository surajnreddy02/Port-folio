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
  const [selectedCategory, setSelectedCategory] = useState('All');

  const skillCategories = [
    {
      title: 'Frontend',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'HTML', level: 'Expert' },
        { name: 'CSS', level: 'Expert' },
        { name: 'Tailwind CSS', level: 'Advanced' },
        { name: 'React', level: 'Advanced' },
        { name: 'Next.js', level: 'Advanced' },
        { name: 'TypeScript', level: 'Intermediate' },
        { name: 'JavaScript', level: 'Expert' }
      ]
    },
    {
      title: 'Backend',
      icon: Terminal,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', level: 'Advanced' },
        { name: 'Flask', level: 'Intermediate' },
        { name: 'Django', level: 'Intermediate' },
        { name: 'Express.js', level: 'Advanced' }
      ]
    },
    {
      title: 'Database',
      icon: Database,
      color: 'from-purple-500 to-violet-500',
      skills: [
        { name: 'MongoDB', level: 'Advanced' },
        { name: 'PostgreSQL', level: 'Intermediate' },
        { name: 'Prisma', level: 'Advanced' },
        { name: 'NeonDB', level: 'Intermediate' },
        { name: 'Redis', level: 'Beginner' },
        { name: 'Firebase', level: 'Intermediate' }
      ]
    },
    {
      title: 'Blockchain',
      icon: Cpu,
      color: 'from-orange-500 to-amber-500',
      skills: [
        { name: 'Thirdweb', level: 'Advanced' },
        { name: 'Solidity', level: 'Intermediate' },
        { name: 'Web3.js', level: 'Intermediate' },
        { name: 'IPFS', level: 'Beginner' }
      ]
    },
    {
      title: 'Languages',
      icon: Code,
      color: 'from-red-500 to-pink-500',
      skills: [
        { name: 'JavaScript', level: 'Expert' },
        { name: 'TypeScript', level: 'Intermediate' },
        { name: 'Python', level: 'Advanced' },
        { name: 'Solidity', level: 'Intermediate' }
      ]
    },
    {
      title: 'Big Data',
      icon: Layers,
      color: 'from-yellow-500 to-orange-500',
      skills: [
        { name: 'Kafka', level: 'Beginner' },
        { name: 'Hadoop', level: 'Beginner' },
        { name: 'Spark', level: 'Beginner' }
      ]
    },
    {
      title: 'Tools',
      icon: Wrench,
      color: 'from-indigo-500 to-blue-500',
      skills: [
        { name: 'Git', level: 'Advanced' },
        { name: 'Docker', level: 'Intermediate' },
        { name: 'Vite', level: 'Advanced' },
        { name: 'Webpack', level: 'Intermediate' },
        { name: 'TensorFlow', level: 'Beginner' }
      ]
    }
  ];

  const allCategories = ['All', ...skillCategories.map(cat => cat.title)];

  const filteredCategories = skillCategories
    .filter(category => selectedCategory === 'All' || category.title === selectedCategory)
    .map(category => ({
      ...category,
      skills: category.skills.filter(skill =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(category => category.skills.length > 0);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'text-green-400';
      case 'Advanced': return 'text-blue-400';
      case 'Intermediate': return 'text-yellow-400';
      case 'Beginner': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <section id="skills" className="section min-h-screen bg-primary">
      <div className="section-content flex items-center justify-center flex-1 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Technical Skills
            </h2>
            <p className="text-secondary max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 space-y-6"
          >
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Search className="text-muted w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input w-full pl-12 py-3"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-accent text-white'
                      : 'bg-card border border-custom text-secondary hover:border-accent'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, categoryIndex) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + categoryIndex * 0.1 }}
                    className="bg-card border border-custom rounded-xl p-6 card-hover"
                  >
                    {/* Category Header */}
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary">
                          {category.title}
                        </h3>
                        <p className="text-xs text-muted">
                          {category.skills.length} skill{category.skills.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    
                    {/* Skills List */}
                    <div className="space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ 
                            duration: 0.4, 
                            delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.05 
                          }}
                          className="flex items-center justify-between p-3 bg-secondary border border-light rounded-lg hover:border-accent transition-all duration-300 group"
                        >
                          <span className="text-secondary font-medium group-hover:text-primary transition-colors">
                            {skill.name}
                          </span>
                          <span className={`text-xs font-semibold px-2 py-1 rounded-md bg-card ${getLevelColor(skill.level)}`}>
                            {skill.level}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <div className="bg-card border border-custom rounded-xl p-8">
                  <Zap className="w-12 h-12 text-muted mx-auto mb-4" />
                  <p className="text-muted text-lg mb-4">No skills found matching "{searchTerm}"</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                    }}
                    className="px-4 py-2 text-accent hover:text-accent-hover transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Skills Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 bg-card border border-custom rounded-xl p-8"
          >
            <h3 className="text-xl font-semibold text-primary mb-6 text-center">
              Skills Overview
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-accent mb-1">
                  {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}
                </div>
                <div className="text-sm text-muted">Total Skills</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">
                  {skillCategories.length}
                </div>
                <div className="text-sm text-muted">Categories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">3+</div>
                <div className="text-sm text-muted">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">5+</div>
                <div className="text-sm text-muted">Projects Built</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;