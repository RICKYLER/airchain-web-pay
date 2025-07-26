'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MdMessage, MdHelp, MdSettings, MdInfo, MdChat } from 'react-icons/md';
import './ChatbotServiceButtons.css';

const services = [
  { label: 'Message', icon: <MdMessage />, tooltip: 'Send a message' },
  { label: 'Help', icon: <MdHelp />, tooltip: 'Get help' },
  { label: 'Settings', icon: <MdSettings />, tooltip: 'Settings' },
  { label: 'Info', icon: <MdInfo />, tooltip: 'Information' },
  { label: 'Support', icon: <img src="/images/support.png" alt="Support" className="service-icon-img" />, tooltip: 'Contact support' },
];

const getRadius = () => {
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 500) return 60;
    if (window.innerWidth < 800) return 70;
  }
  return 90;
};

const START_ANGLE = (-80 * Math.PI) / 180; // -80 degrees in radians
const END_ANGLE = (-160 * Math.PI) / 180; // -160 degrees in radians

const ChatbotServiceButtons = () => {
  const [open, setOpen] = useState(false);
  const [radius, setRadius] = useState(getRadius());
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleResize() {
      setRadius(getRadius());
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [open]);

  return (
    <div className="chatbot-circle-menu right" ref={menuRef}>
      <button
        className="circle-main-btn"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open chatbot services"
      >
        <MdChat size={28} />
        {/* Notification badge (static for now) */}
        <span className="notification-badge" aria-label="2 unread messages">2</span>
      </button>
      {services.map((service, idx) => {
        // Reverse order for right arc
        const revIdx = services.length - 1 - idx;
        const angle = START_ANGLE + ((END_ANGLE - START_ANGLE) * revIdx) / (services.length - 1);
        const x = open ? Math.cos(angle) * radius : 0;
        const y = open ? Math.sin(angle) * radius : 0;
        return (
          <button
            key={service.label}
            className={`circle-menu-option radial ${open ? 'open' : ''}`}
            style={{
              transform: `translate(${x}px, ${y}px) scale(${open ? 1 : 0.5})`,
              opacity: open ? 1 : 0,
              pointerEvents: open ? 'auto' : 'none',
              transitionDelay: open ? `${idx * 0.04}s` : `${(services.length-idx) * 0.03}s`,
            }}
            aria-label={service.tooltip}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            <span className="service-icon">{service.icon}</span>
            <span className="tooltip">{service.tooltip}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ChatbotServiceButtons; 