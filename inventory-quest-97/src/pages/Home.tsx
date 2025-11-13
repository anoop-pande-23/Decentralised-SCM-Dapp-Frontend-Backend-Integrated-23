import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { Package, ShoppingCart, TrendingUp, Shield, ArrowRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Package,
      title: 'Product Management',
      description: 'Easily add, update, and manage your product inventory',
    },
    {
      icon: ShoppingCart,
      title: 'Browse Products',
      description: 'View and explore all available products in one place',
    },
    {
      icon: TrendingUp,
      title: 'Real-time Updates',
      description: 'Get instant updates on product availability and pricing',
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your data is protected with industry-standard security',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ProductHub
            </span>
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Your all-in-one platform for managing and browsing products. Simple, fast, and secure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {isAuthenticated ? (
              <Button
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="gap-2 shadow-glow"
              >
                Go to Dashboard
                <ArrowRight className="h-5 w-5" />
              </Button>
            ) : (
              <>
                <Button
                  size="lg"
                  onClick={() => navigate('/register')}
                  className="gap-2 shadow-glow"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Why Choose ProductHub?</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to manage your products effectively
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glass-card group p-6 text-center transition-smooth hover:shadow-glow hover:-translate-y-1"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-smooth group-hover:scale-110">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="container mx-auto px-4 py-20">
          <Card className="glass-card gradient-card overflow-hidden">
            <div className="p-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Join ProductHub today and experience seamless product management
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/register')}
                className="gap-2 shadow-glow"
              >
                Create Your Account
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        </section>
      )}
    </div>
  );
};

export default Home;
