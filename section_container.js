// components/SectionContainer.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const fadeInVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

let focusTimeout;
const debounceFocus = (title) => {
  clearTimeout(focusTimeout);
  focusTimeout = setTimeout(() => {
    localStorage.setItem('lastActiveSection', title);
  }, 200);
};

const SectionContainer = ({ title, borderColor, textColor, children, blur = 'sm' }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const lastSection = localStorage.getItem('lastActiveSection');
    if (lastSection === title && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [title]);

  const handleFocus = () => {
    debounceFocus(title);
  };

  return (
    <motion.section
      ref={sectionRef}
      onFocus={handleFocus}
      onMouseEnter={handleFocus}
      initial={fadeInVariant.initial}
      animate={fadeInVariant.animate}
      transition={fadeInVariant.transition}
      className={`bg-white/60 backdrop-blur-${blur} p-4 rounded-2xl shadow-inner border border-${borderColor} hover:shadow-lg focus-within:shadow-lg transition-all duration-200 outline-none`}
      role="region"
      aria-label={title}
      tabIndex={-1}
    >
      <h2 className={`text-xl font-semibold mb-2 text-${textColor}`}>{title}</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {children}
      </div>
    </motion.section>
  );
};

export default SectionContainer;
