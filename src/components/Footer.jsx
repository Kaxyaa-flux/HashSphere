import React, { useState } from 'react';
import { Code2, Heart, Send, CheckCircle2 } from 'lucide-react';
import { submitFeedback } from '../services/api';
import toast from 'react-hot-toast';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await submitFeedback(formData);
      setIsSubmitted(true);
      toast.success('Feedback submitted successfully!');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      toast.error('Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950/50 mt-12 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-2xl font-bold">Hash<span className="gradient-text">Sphere</span></p>
              <p className="text-base text-slate-400 mt-2 max-w-md">Explore the World of Blockchain, One Hash at a Time. Learn, interact, and discover the future of Web3.</p>
            </div>
            
            <div className="mt-8 flex flex-col gap-2 text-sm text-slate-400">
              <p className="flex items-center gap-1">
                Developed with <Heart className="w-4 h-4 text-purple-500 fill-purple-500" /> by <span className="text-white font-medium">Developer</span>
              </p>
              <p>Batch: <span className="text-white font-medium">Web3 Innovators</span></p>
              <a 
                href="https://github.com/Kaxyaa-flux/HashSphere" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors mt-2"
              >
                <Code2 className="w-5 h-5" /> GitHub Repository
              </a>
            </div>
          </div>
          
          <div className="glass-panel p-6">
            <h3 className="text-lg font-bold mb-4">Send Feedback</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                />
              </div>
              <textarea 
                placeholder="Message" 
                rows="3"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 resize-none"
              ></textarea>
              <button 
                type="submit" 
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                  isSubmitted ? 'bg-green-600/20 text-green-500 border border-green-500/30' : 
                  'gradient-bg text-white hover:opacity-90'
                }`}
              >
                {isSubmitting ? 'Sending...' : 
                 isSubmitted ? <><CheckCircle2 className="w-4 h-4" /> Sent</> : 
                 <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </form>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
