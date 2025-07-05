import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send } from 'lucide-react';
import Modal from './Modal';

interface FormData {
  username: string;
  email: string;
  message: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const response = await fetch('/.netlify/functions/sendContactEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.username,
          email: data.email,
          message: data.message,
        }),
      });
      if (!response.ok) throw new Error('Failed to send');
      setSubmitStatus('success');
      reset();
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 2000);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="contact-modal">
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-2">Send Message</h2>
          <p className="text-secondary">Let's start a conversation</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-secondary mb-2">
              Username
            </label>
            <input
              {...register('username', { required: 'Username is required' })}
              type="text"
              id="username"
              className="form-input w-full"
              placeholder="Your username"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
              Email Address
            </label>
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              id="email"
              className="form-input w-full"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
              Message
            </label>
            <textarea
              {...register('message', { required: 'Message is required' })}
              id="message"
              rows={6}
              className="form-input w-full resize-none"
              placeholder="Tell me about your project or just say hello..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 btn-primary rounded-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send size={18} />
                <span>Send Message</span>
              </>
            )}
          </motion.button>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-center"
            >
              Thanks for your message! I'll get back to you soon.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-center"
            >
              Sorry, there was an error sending your message. Please try again.
            </motion.div>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default ContactModal;