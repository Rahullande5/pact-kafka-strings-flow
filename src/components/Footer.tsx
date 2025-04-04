
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2025 Spring Boot Kafka Pact Demo</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-spring transition-colors">Documentation</a>
            <a href="#" className="hover:text-spring transition-colors">API</a>
            <a href="#" className="hover:text-spring transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
