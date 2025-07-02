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
      github: 'https://github.com/surajnreddy02/Hotel-Management-System',
      live: null,
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
      title: 'Nothing Weather',
      description: 'A futuristic, minimalist weather application providing real-time data, AI-powered summaries, and conversational weather insights.',
      longDescription: 'A futuristic, minimalist weather application providing real-time data, AI-powered summaries, and conversational weather insights. Inspired by the clean aesthetic of Nothing OS, this app focuses on a seamless user experience with a highly responsive and modern interface.',
      technologies: ['Next.js', 'Tailwind CSS', 'Genkit AI', 'OpenWeatherMap API', 'MapTiler'],
      github: 'https://github.com/surajnreddy02/NothingWeather',
      live: 'https://nothingweather.netlify.app/',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Real-Time Weather Data',
        'AI-Powered Summaries & Suggestions',
        'Conversational AI Chat',
        'Dynamic & Minimalist UI',
        'User Personalization'
      ],
      highlights: [
        'Utilized Google\'s Genkit for structured LLM interactions',
        'Built with Next.js App Router and Server Components',
        'Integrated dynamic map backgrounds with MapTiler',
        'Created custom React hooks for state management',
        'Designed with ShadCN UI and Tailwind CSS'
      ],
      challenges: [
        'Engineered reactive state management for multiple components',
        'Implemented comprehensive error handling for APIs and AI',
        'Developed logic to process and aggregate forecast data',
        'Created performant background rendering without impacting UI'
      ]
    },
    {
      id: 3,
      title: 'SwasthyaAI',
      description: 'AI-Powered Healthcare Platform for Rural Communities with intelligent diagnostic tools and patient management.',
      longDescription: 'A comprehensive, AI-powered healthcare platform designed to empower healthcare workers in underserved rural communities. It provides intelligent diagnostic tools, streamlines patient management, and ensures secure record-keeping, all while prioritizing accessibility and multilingual support.',
      technologies: ['React', 'Vite', 'Supabase', 'Google Gemini AI', 'Tailwind CSS'],
      github: 'https://github.com/surajnreddy02/SwasthyaHealthAI',
      live: 'https://swasthyahealthai.netlify.app/',
      image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'AI-Powered Symptom Checker',
        'Smart Triage Assistant',
        'Medical Image Diagnosis',
        'AI Chat Assistant',
        'Patient Queue Management',
        'Multilingual Support'
      ],
      highlights: [
        'Leveraged Google\'s Gemini AI for core functionalities',
        'Built with React and Vite for optimized performance',
        'Implemented Supabase for robust database management',
        'Created responsive design for all devices',
        'Integrated Web Speech API for voice input'
      ],
      challenges: [
        'Bridging the healthcare gap in rural areas',
        'Implementing robust security for patient data',
        'Overcoming language barriers with multilingual support',
        'Optimizing for low-bandwidth environments'
      ]
    },
    {
      id: 4,
      title: 'PocketLaw AI',
      description: 'Legal Assistant Platform with intelligent document generation, real-time chat support, and case management.',
      longDescription: 'A comprehensive AI-powered legal assistance platform with intelligent document generation, real-time chat support, and case management. Features secure authentication, automated legal guidance, and responsive design for both legal professionals and individuals seeking legal help.',
      technologies: ['Next.js', 'Google Gemini AI', 'Supabase', 'TypeScript', 'Tailwind CSS'],
      github: 'https://github.com/surajnreddy02/pocketlaw-ai-compass',
      live: 'https://pocketlawai.netlify.app/',
      image: 'https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'AI-powered legal consultation',
        'Smart document generation with 150+ templates',
        'Comprehensive case management system',
        'Multi-persona AI assistant',
        'Secure user authentication',
        'Mobile-responsive design'
      ],
      highlights: [
        'Integrated Google Gemini AI for intelligent legal responses',
        'Built with Supabase for real-time database synchronization',
        'Implemented advanced document versioning',
        'Added voice-to-text integration for accessibility',
        'Used TypeScript for type safety'
      ],
      challenges: [
        'Implementing secure multi-tenant architecture',
        'Creating complex persona-based AI responses',
        'Building real-time document collaboration',
        'Handling sensitive legal information securely'
      ]
    },
    {
      id: 5,
      title: 'DripDrop',
      description: 'Modern Android clothing store app with intuitive product catalog, secure checkout, and personalized user experience.',
      longDescription: 'A modern Android application for seamless online clothing shopping, featuring a visually engaging UI, secure checkout, and personalized user experience. Designed for both customers and store admins, the app streamlines browsing, cart management, and order processing.',
      technologies: ['Android', 'Java', 'Kotlin', 'SQLite', 'Retrofit'],
      github: 'https://github.com/udayca12/Online-Clothing-Store-App-DripDrop',
      live: null,
      image: 'https://images.pexels.com/photos/5872361/pexels-photo-5872361.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Intuitive product catalog with advanced search',
        'Secure user authentication',
        'Shopping cart with real-time updates',
        'Integrated payment gateway',
        'Order history and tracking',
        'Admin panel for inventory management'
      ],
      highlights: [
        'Built with Android (Java/Kotlin) and XML layouts',
        'Implemented MVVM architecture for maintainable code',
        'Used LiveData and ViewModel for reactive UI updates',
        'Integrated Retrofit for RESTful API communication',
        'Implemented Glide for efficient image loading'
      ],
      challenges: [
        'Ensuring secure authentication and data privacy',
        'Optimizing image loading for low-latency browsing',
        'Handling edge cases in cart and order management',
        'Designing for scalability with large product catalogs',
        'Creating responsive layouts for various device sizes'
      ]
    }
  ];

  const openProjectModal = (project) => {
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
                      {project.live && (
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
                      )}
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