import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, Zap, Code, Target } from 'lucide-react';
import Modal from './Modal';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  github?: string;
  live?: string;
  image?: string;
  features: string[];
  challenges: string[];
  highlights: string[];
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="project-modal">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">{project.title}</h2>
          <p className="text-base text-secondary leading-relaxed">{project.longDescription}</p>
        </div>

        {/* Project Image */}
        {/* The image below uses w-full (100% width of container) and fixed height (h-48 for mobile, md:h-64 for desktop).
            The aspect ratio is variable, determined by the container's width and fixed height, with object-cover cropping the image as needed. */}
        {project.image && (
          <div className="mb-6">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 md:h-64 object-cover rounded-lg border border-custom"
            />
          </div>
        )}

        {/* Technology Stack */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Code className="w-4 h-4 text-accent" />
            <h3 className="text-lg font-semibold text-primary">Tech Stack</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-secondary border border-light rounded-md text-xs font-medium text-secondary hover:border-accent transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Star className="w-4 h-4 text-accent" />
            <h3 className="text-lg font-semibold text-primary">Key Features</h3>
          </div>
          <ul className="space-y-2">
            {project.features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-2 text-sm text-secondary"
              >
                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Technical Highlights */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Zap className="w-4 h-4 text-accent" />
            <h3 className="text-lg font-semibold text-primary">Technical Highlights</h3>
          </div>
          <ul className="space-y-2">
            {project.highlights.map((highlight, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-2 text-sm text-secondary"
              >
                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <span>{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Challenges Solved */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Target className="w-4 h-4 text-accent" />
            <h3 className="text-lg font-semibold text-primary">Challenges Solved</h3>
          </div>
          <ul className="space-y-2">
            {project.challenges.map((challenge, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-2 text-sm text-secondary"
              >
                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <span>{challenge}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Footer with Links */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-custom">
          {project.github && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-secondary border border-light rounded-lg hover:border-accent transition-colors text-sm"
            >
              <Github size={16} />
              <span>View Code</span>
            </motion.a>
          )}
          {project.live && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 btn-primary rounded-lg text-sm"
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </motion.a>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProjectModal;