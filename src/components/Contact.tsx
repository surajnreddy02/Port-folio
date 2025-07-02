import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import ContactModal from './ContactModal';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'surajnreddy02@gmail.com',
      href: 'mailto:surajnreddy02@gmail.com',
      description: 'Send me an email'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@surajnreddy02',
      href: 'https://github.com/surajnreddy02',
      description: 'Check out my code'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Suraj N Reddy',
      href: 'https://www.linkedin.com/in/surajnreddy02/',
      description: 'Connect professionally'
    }
  ];

  return (
    <section id="contact" className="section min-h-screen bg-primary">
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
              Contact
            </h2>
            <p className="text-secondary max-w-2xl mx-auto">
              Let's build something great together. Reach out through any of these channels.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid md:grid-cols-3 gap-6 mb-12"
            >
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="bg-card border border-custom rounded-xl p-6 card-hover group text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                      {method.label}
                    </h3>
                    <p className="text-secondary text-sm mb-2">{method.value}</p>
                    <p className="text-muted text-xs">{method.description}</p>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Send Message Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsContactModalOpen(true)}
                className="px-8 py-4 btn-primary rounded-lg font-semibold flex items-center space-x-2 mx-auto"
              >
                <Send size={20} />
                <span>Send Message</span>
              </motion.button>
              <p className="text-muted text-sm mt-4">
                Or click here to send me a direct message
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
};

export default Contact;