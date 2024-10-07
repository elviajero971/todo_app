// src/components/Notification.js
import React, { useEffect, useState } from 'react';

const Notification = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (message) {
      // Show notification and start the auto-hide timer
      setIsVisible(true);

      const timer = setTimeout(() => {
        // Set visibility to false to trigger the translate animation
        setIsVisible(false);

        // After 500ms, which is the length of the animation, remove the notification
        setTimeout(() => {
          onClose();
        }, 500); // Match the animation duration
      }, 3000); // Notification stays visible for 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-4 right-4 bg-red-500 text-white p-3 rounded-lg shadow-lg flex items-center space-x-4 transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
      }`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="bg-white text-red-500 px-2 py-1 rounded hover:bg-gray-200 transition"
      >
        x
      </button>
    </div>
  );
};

export default Notification;
