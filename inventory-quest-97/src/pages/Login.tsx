// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { loginUser } from '@/api/api';
// import { useAuth } from '@/context/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card } from '@/components/ui/card';
// import { toast } from 'sonner';
// import { LogIn, ArrowLeft } from 'lucide-react';
// import Navbar from '@/components/Navbar';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const response = await loginUser(formData);
//       login(response.token, response.role);
//       toast.success('Login successful!');
//       navigate('/dashboard');
//     } catch (error: any) {
//       toast.error(error || 'Login failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="container mx-auto px-4 py-12">
//         <div className="mx-auto max-w-md">
//           <Button
//             variant="ghost"
//             onClick={() => navigate('/')}
//             className="mb-6 gap-2"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back
//           </Button>

//           <Card className="glass-card p-8">
//             <div className="mb-6 text-center">
//               <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
//                 <LogIn className="h-8 w-8 text-primary" />
//               </div>
//               <h1 className="text-3xl font-bold">Welcome Back</h1>
//               <p className="mt-2 text-muted-foreground">Login to your account</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="you@example.com"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                   required
//                 />
//               </div>

//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? 'Logging in...' : 'Login'}
//               </Button>
//             </form>

//             <div className="mt-6 text-center text-sm">
//               <span className="text-muted-foreground">Don't have an account? </span>
//               <Link to="/register" className="font-medium text-primary hover:underline">
//                 Register here
//               </Link>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '@/api/api';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { LogIn, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 🧠 Backend expects "username", not "email"
      const payload = {
        username: formData.email, // 👈 map email → username
        password: formData.password,
      };

      const response = await loginUser(payload);
      login(response.token, response.user.role); // ✅ corrected to get role from response.user
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-md">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <Card className="glass-card p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <LogIn className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="mt-2 text-muted-foreground">Login to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email (used as username) */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                Don't have an account?{' '}
              </span>
              <Link
                to="/register"
                className="font-medium text-primary hover:underline"
              >
                Register here
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
