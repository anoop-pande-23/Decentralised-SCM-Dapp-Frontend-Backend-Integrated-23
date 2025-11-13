// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { registerUser } from '@/api/api';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { toast } from 'sonner';
// import { UserPlus, ArrowLeft } from 'lucide-react';
// import Navbar from '@/components/Navbar';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     role: 'user',
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       await registerUser(formData);
//       toast.success('Registration successful! Please login.');
//       navigate('/login');
//     } catch (error: any) {
//       toast.error(error || 'Registration failed');
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
//                 <UserPlus className="h-8 w-8 text-primary" />
//               </div>
//               <h1 className="text-3xl font-bold">Create Account</h1>
//               <p className="mt-2 text-muted-foreground">Join ProductHub today</p>
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

//               <div className="space-y-2">
//                 <Label htmlFor="role">Role</Label>
//                 <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select your role" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="user">User</SelectItem>
//                     <SelectItem value="vendor">Vendor</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? 'Creating account...' : 'Create Account'}
//               </Button>
//             </form>

//             <div className="mt-6 text-center text-sm">
//               <span className="text-muted-foreground">Already have an account? </span>
//               <Link to="/login" className="font-medium text-primary hover:underline">
//                 Login here
//               </Link>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '@/api/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { UserPlus, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 🧠 Backend expects "username", not "email"
      const payload = {
        username: formData.email,  // map email → username
        password: formData.password,
        // optional: map 'user' role to 'customer' (backend default)
        role: formData.role === 'user' ? 'customer' : formData.role,
      };

      await registerUser(payload);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error || 'Registration failed');
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
                <UserPlus className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">Create Account</h1>
              <p className="mt-2 text-muted-foreground">Join ProductHub today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
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

              {/* Password Field */}
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

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="vendor">Vendor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            {/* Already have an account */}
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?{' '}
              </span>
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Login here
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
