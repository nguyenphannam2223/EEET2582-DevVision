import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Briefcase, Search, Users, Shield, ArrowRight, CheckCircle2, Sparkles, Globe } from 'lucide-react';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        {/* Background blobs for aesthetics */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider animate-in fade-in slide-in-from-bottom-3 duration-1000">
              <Sparkles className="w-3 h-3" />
              <span>Next Generation Job Management</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
              Redefining Recruitment with <span className="text-primary italic">DevVision</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
              The ultimate platform for companies to find top talent and manage their workforce with unprecedented ease and precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
              {isAuthenticated ? (
                <Link to="/company/jobs">
                  <Button size="lg" className="h-14 px-8 text-lg gap-2 group shadow-lg shadow-primary/20">
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/auth/register">
                    <Button size="lg" className="h-14 px-8 text-lg gap-2 group shadow-lg shadow-primary/20">
                      Get Started for Free
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/auth/login">
                    <Button variant="outline" size="lg" className="h-14 px-8 text-lg">
                      View Demo
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Trusted by section */}
            <div className="pt-16 opacity-50 flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-default">
                <Globe className="w-6 h-6" /> <span className="font-bold text-xl uppercase tracking-tighter">GlobalCo</span>
              </div>
              <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-default">
                <Shield className="w-6 h-6" /> <span className="font-bold text-xl uppercase tracking-tighter">SafeTech</span>
              </div>
              <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-default">
                <Users className="w-6 h-6" /> <span className="font-bold text-xl uppercase tracking-tighter">TalentHub</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Why Choose DevVision?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our comprehensive suite of tools empowers your HR team to focus on what matters most: picking the right people.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Job Management",
                desc: "Create, track, and manage job postings with a powerful, intuitive interface.",
                icon: Briefcase,
                color: "bg-blue-500"
              },
              {
                title: "Advanced Search",
                desc: "Find the perfect match with our intelligent, full-text candidate search engine.",
                icon: Search,
                color: "bg-purple-500"
              },
              {
                title: "Application Tracking",
                desc: "Manage the entire candidate lifecycle from initial application to final offer.",
                icon: CheckCircle2,
                color: "bg-emerald-500"
              }
            ].map((feature) => (
              <div key={feature.title} className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-primary px-8 py-16 md:px-16 text-center text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/40">
            {/* Minimal background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

            <div className="max-w-3xl mx-auto space-y-8 relative">
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                Ready to transform your hiring process?
              </h2>
              <p className="text-xl text-primary-foreground/80">
                Join hundreds of forward-thinking companies already using DevVision to find their next superstar.
              </p>
              <div className="pt-4">
                <Link to="/auth/register">
                  <Button variant="secondary" size="lg" className="h-14 px-10 text-lg font-bold hover:scale-105 transition-transform">
                    Start Your Journey Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
