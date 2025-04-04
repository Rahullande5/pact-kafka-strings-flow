
import React from 'react';
import { GitFork } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-spring to-spring-dark text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Spring Boot Kafka Pact Demo</h1>
        </div>
        <div className="flex items-center space-x-4">
          <a 
            href="https://github.com/yourusername/spring-kafka-pact-demo" 
            className="flex items-center gap-1 hover:text-spring-light transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitFork size={18} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
