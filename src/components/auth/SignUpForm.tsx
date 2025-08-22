import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/auth/AuthProvider';

export const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirect = params.get('redirect') || '/';

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
            onChange={(e) => setEmail(e.target.value)}
              />
            </div>
        <div>
          <Label htmlFor="password">Password</Label>
              <Input
                id="password"
            type="password" 
                value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        {success && <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">{success}</div>}
        <Button className="w-full" onClick={async () => {
          try {
            setError(null);
            setSuccess(null);
            await signUp(email, password);
            setSuccess('Account created! Please check your email for a confirmation link to complete setup.');
          } catch (e: any) {
            setError(e.message || 'Sign-up failed');
          }
        }}>Sign Up</Button>
      </CardContent>
    </Card>
  );
}; 