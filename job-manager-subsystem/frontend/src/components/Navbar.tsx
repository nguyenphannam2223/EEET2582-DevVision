import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Briefcase, Search, User, LogOut, Menu, X, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Jobs', href: '/company/jobs', icon: Briefcase, protected: true },
    { name: 'Search', href: '/company/search', icon: Search, protected: true },
    { name: 'Profile', href: '/company/profile', icon: User, protected: true },
  ];

  const filteredLinks = navLinks.filter(link => !link.protected || isAuthenticated);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-border py-2'
          : 'bg-transparent border-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Rocket className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            DevVision
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {filteredLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary',
                location.pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </Link>
          ))}
          
          <div className="h-6 w-px bg-border mx-2" />

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden lg:inline-block">
                Welcome, <span className="font-semibold text-foreground">{user?.email?.split('@')[0] || 'User'}</span>
              </span>
              <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/auth/login">
                <Button variant="ghost" size="sm">Log In</Button>
              </Link>
              <Link to="/auth/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-muted-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {filteredLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 py-2 text-sm font-medium border-b border-border last:border-0',
                  location.pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <Button variant="outline" onClick={logout} className="w-full justify-start gap-3">
                <LogOut className="w-5 h-5" />
                Logout
              </Button>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Log In</Button>
                </Link>
                <Link to="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full justify-start">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
