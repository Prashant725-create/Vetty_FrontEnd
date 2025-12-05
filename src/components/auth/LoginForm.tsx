import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        toast.success('Login successful!');
        navigate('/board');
      } else {
        toast.error('Invalid credentials. Try admin@test.com / admin123');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-xl overflow-hidden">
          <div className="bg-secondary px-8 py-6">
            <h1 className="text-3xl font-bold text-secondary-foreground">Log in</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 bg-background border-border"
                required
              />
            </div>
            
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 bg-background border-border"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
            
            <p className="text-center text-muted-foreground">
              or, sign up
            </p>
          </form>
        </div>
        
        <p className="mt-4 text-center text-sm text-secondary-foreground/70">
          Demo: admin@test.com / admin123
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
