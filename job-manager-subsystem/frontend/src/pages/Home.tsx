import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-4 p-8 bg-card rounded-lg shadow-lg border border-border max-w-lg w-full">
        <h1 className="text-4xl font-bold tracking-tight text-primary">DevVision Job Manager</h1>
        <p className="text-muted-foreground text-lg">
          Welcome to the Job Manager Subsystem.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link to="/auth/register" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium">
            Get Started
          </Link>
          <Link to="/auth/login" className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors font-medium">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
