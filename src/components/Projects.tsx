import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: 'Hotel Management System',
      description: 'A comprehensive hotel management system with booking, room management, and customer tracking features.',
      longDescription: 'A full-featured hotel management system built with modern web technologies. This application provides comprehensive booking management, room allocation, customer tracking, and administrative features for hotel operations.',
      technologies: ['Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
      github: 'https://github.com/surajnreddy02',
      live: 'https://example.com',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Real-time room availability tracking',
        'Customer booking management',
        'Payment processing integration',
        'Staff management dashboard',
        'Reporting and analytics'
      ],
      highlights: [
        'Implemented real-time updates using WebSocket connections',
        'Optimized database queries for fast search and filtering',
        'Built responsive UI with mobile-first approach',
        'Integrated secure payment gateway'
      ],
      challenges: [
        'Managing concurrent bookings and room availability',
        'Implementing complex business logic for pricing',
        'Ensuring data consistency across multiple operations',
        'Building scalable architecture for high traffic'
      ]
    },
    {
      id: 2,
      title: 'True Feedback',
      description: 'Anonymous feedback application that allows users to provide honest feedback without revealing their identity.',
      longDescription: 'An anonymous feedback platform designed to encourage honest communication in organizations and teams. Built with Next.js and featuring secure authentication and real-time feedback collection.',
      technologies: ['Next.js', 'NextAuth.js', 'MongoDB', 'Tailwind CSS', 'TypeScript'],
      github: 'https://github.com/surajnreddy02',
      live: 'https://example.com',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Anonymous feedback submission',
        'Real-time feedback dashboard',
        'Category-based feedback organization',
        'Admin moderation tools',
        'Export feedback reports'
      ],
      highlights: [
        'Implemented anonymous authentication system',
        'Built real-time dashboard with live updates',
        'Created comprehensive admin panel',
        'Designed intuitive user experience'
      ],
      challenges: [
        'Ensuring true anonymity while preventing abuse',
        'Building trust with users for honest feedback',
        'Implementing effective moderation system',
        'Balancing transparency with privacy'
      ]
    },
    {
      id: 3,
      title: 'Mind Dump',
      description: 'A blogging platform with rich text editing, categories, and user authentication.',
      longDescription: 'A modern blogging platform featuring rich text editing, multimedia support, and collaborative editing. Built with Next.js and Prisma for optimal performance and user experience.',
      technologies: ['Next.js', 'Prisma', 'NeonDB', 'Tailwind CSS', 'TypeScript'],
      github: 'https://github.com/surajnreddy02',
      live: 'https://example.com',
      image: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Rich text editor with code syntax highlighting',
        'Advanced search with full-text indexing',
        'Social features including comments and reactions',
        'SEO optimization with RSS feed generation',
        'Comprehensive analytics dashboard'
      ],
      highlights: [
        'Built custom rich text editor with advanced features',
        'Implemented full-text search with indexing',
        'Created SEO-optimized blog structure',
        'Designed responsive and accessible interface'
      ],
      challenges: [
        'Building performant rich text editor',
        'Implementing complex search functionality',
        'Optimizing for SEO and performance',
        'Managing large amounts of content efficiently'
      ]
    },
    {
      id: 4,
      title: 'EmotionVox',
      description: 'Machine learning application that detects emotions from text and voice inputs.',
      longDescription: 'An AI-powered application that analyzes emotions from both text and voice inputs using advanced machine learning models. Features real-time emotion detection and comprehensive analytics.',
      technologies: ['Next.js', 'Flask', 'TensorFlow', 'Python', 'WebRTC'],
      github: 'https://github.com/surajnreddy02',
      live: 'https://example.com',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Real-time emotion detection from text',
        'Voice emotion analysis using ML models',
        'Emotion trend analytics and visualization',
        'Multi-language support',
        'API for third-party integrations'
      ],
      highlights: [
        'Trained custom emotion detection models',
        'Implemented real-time voice processing',
        'Built scalable ML pipeline',
        'Created intuitive data visualization'
      ],
      challenges: [
        'Training accurate emotion detection models',
        'Processing real-time audio streams',
        'Handling multiple languages and accents',
        'Optimizing model performance for web deployment'
      ]
    },
    {
      id: 5,
      title: 'Fundify',
      description: 'Decentralized crowdfunding platform built on blockchain technology.',
      longDescription: 'A decentralized crowdfunding platform leveraging blockchain technology for transparent and secure fundraising. Built with Web3 technologies and smart contracts for trustless transactions.',
      technologies: ['Next.js', 'Thirdweb', 'Solidity', 'Ethereum', 'IPFS'],
      github: 'https://github.com/surajnreddy02',
      live: 'https://example.com',
      image: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Smart contract-based crowdfunding',
        'Transparent fund tracking',
        'Decentralized file storage with IPFS',
        'Multi-wallet support',
        'Automated fund distribution'
      ],
      highlights: [
        'Developed secure smart contracts',
        'Implemented Web3 wallet integration',
        'Built decentralized storage solution',
        'Created transparent funding mechanism'
      ],
      challenges: [
        'Ensuring smart contract security',
        'Managing gas fees and optimization',
        'Building user-friendly Web3 interface',
        'Implementing complex tokenomics'
      ]
    }
  ];

  const openProjectModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="section min-h-screen bg-primary">
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
              Projects
            </h2>
            <p className="text-secondary max-w-2xl mx-auto">
              A showcase of my technical skills and creative solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-card border border-custom rounded-xl p-6 card-hover group cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-secondary text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-secondary border border-light rounded-md text-xs font-medium text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-secondary border border-light rounded-md text-xs font-medium text-muted">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-custom">
                    <div className="flex space-x-3">
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-btn w-8 h-8"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={16} />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-btn w-8 h-8"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} />
                      </motion.a>
                    </div>
                    <span className="text-xs text-muted">Click to view details</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeProjectModal}
        project={selectedProject}
      />
    </section>
  );
};

export default Projects;