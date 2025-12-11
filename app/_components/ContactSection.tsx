'use client';
import toast, {Toaster} from 'react-hot-toast'
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Github, Linkedin } from 'lucide-react';
import React from 'react';

// Reusing your existing social links structure for consistency
const contactInfo = [
  {
    icon: Mail,
    text: 'your-email@example.com',
    link: 'mailto:sahilbhaisharma1212@example.com',
    color: 'hover:text-red-500',
    type: 'Email',
  },
  {
    icon: MapPin,
    text: 'Mumbai, India',
    link: '#',
    color: 'hover:text-green-500',
    type: 'Location',
  },
  {
    icon: Github,
    text: 'Github Profile',
    link: 'https://github.com/SahilSharma1212',
    color: 'hover:text-indigo-500',
    type: 'Social',
  },
  {
    icon: Linkedin,
    text: 'LinkedIn Profile',
    link: 'https://www.linkedin.com/in/sahil-sharma-822a752a9/',
    color: 'hover:text-blue-500',
    type: 'Social',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const FormInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & { label: string }
> = ({ label, ...props }) => (
  <motion.div variants={itemVariants} className="mb-6">
    <label htmlFor={props.id} className="block text-sm font-medium text-white/80 mb-2">
      {label}
    </label>
    <input
      {...props}
      className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white 
                 focus:ring-2 focus:ring-white/20 focus:border-white/20 outline-none 
                 transition duration-300 placeholder:text-white/40"
    />
  </motion.div>
);

const FormTextarea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }
> = ({ label, ...props }) => (
  <motion.div variants={itemVariants} className="mb-6">
    <label htmlFor={props.id} className="block text-sm font-medium text-white/80 mb-2">
      {label}
    </label>
    <textarea
      {...props}
      rows={4}
      className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white 
                 focus:ring-2 focus:ring-white/20 focus:border-white/20 outline-none 
                 transition duration-300 placeholder:text-white/40 resize-none"
    />
  </motion.div>
);

const ContactCard: React.FC<typeof contactInfo[0]> = ({
  icon: Icon,
  text,
  link,
  color,
  type,
}) => {
  const CardContent = (
    <div
      className="flex items-center gap-4 p-4 rounded-xl border border-white/10 
                 bg-white/5 backdrop-blur-xl transition duration-300"
    >
      <Icon className={`h-6 w-6 text-white/80 transition-colors ${color}`} />
      <div>
        <p className="text-xs font-semibold uppercase text-[#999]">{type}</p>
        <p className="text-sm text-white/90 break-all">{text}</p>
      </div>
    </div>
  );

  if (link && link !== '#') {
    return (
      <motion.a
        variants={itemVariants}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {CardContent}
      </motion.a>
    );
  }
  return <motion.div variants={itemVariants}>{CardContent}</motion.div>;
};

const ContactSection = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.email || !formData.message) return;

  try {
    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailId: formData.email,
        message: formData.message,
      }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      toast.success("Message sent successfully!",{
        style:{
          backgroundColor:"#333",
          color:"white"
        }
      });
      setFormData({ email: "", message: "" }); // Clear form
    } else {
      toast.error(data.error || "Failed to send message.");
    }
  } catch (err) {
    toast.error("Something went wrong. Please try again.");
    console.error(err);
  }
};

  return (
    <section id="contact" className="py-20 max-md:py-16 px-20 max-md:px-10">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        <motion.h2
          variants={itemVariants}
          className="text-5xl max-sm:text-3xl font-bold font-serif text-white mb-4 text-center"
        >
          Get In Touch
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg text-white/70 mb-12 max-w-2xl mx-auto text-center"
        >
          Ready to turn ideas into reality? Send me a message, and let&apos;s start building something great together.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 p-8 rounded-2xl border border-white/10 bg-[#222] shadow-2xl"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Send a Message</h3>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  id="name"
                  label="Your Name"
                  type="text"
                  placeholder="Sahil Sharma"
                  required
                />

                <FormInput
                  id="email"
                  label="Your Email"
                  type="email"
                  placeholder="sahil@example.dev"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <FormTextarea
                id="message"
                label="Your Message"
                placeholder="I have an exciting opportunity I'd like to discuss..."
                required
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />

              <motion.button
                variants={itemVariants}
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto mt-4 flex items-center justify-center gap-2 px-8 py-3 
                           text-white font-semibold rounded-xl bg-[#333] hover:bg-[#444] 
                           transition duration-300 shadow-lg "
              >
                Send Message <Send className="h-5 w-5" />
              </motion.button>
            </form>
          </motion.div>

          <div className="lg:col-span-1 flex flex-col gap-6">
            {contactInfo.map((item, index) => (
              <ContactCard key={index} {...item} />
            ))}
          </div>
        </div>
      </motion.div>
      <Toaster/>
    </section>
  );
};

export default ContactSection;
