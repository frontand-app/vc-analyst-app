import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const EmailConfirm: React.FC = () => {
  const [status, setStatus] = useState<'processing' | 'success' | 'error' | 'already_confirmed'>('processing');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        // Get the URL hash parameters (Supabase sends confirmation data in the hash)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');

        // Also check URL search params as fallback
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        const tokenHash = searchParams.get('token_hash');

        if (type === 'signup' && accessToken && refreshToken) {
          // Handle email confirmation via hash parameters
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });

          if (error) {
            console.error('Email confirmation error:', error);
            setError(error.message);
            setStatus('error');
            return;
          }

          if (data.user) {
            setStatus('success');
            // Redirect to dashboard after successful confirmation
            setTimeout(() => {
              navigate('/dashboard');
            }, 3000);
          }
        } else if (token && tokenHash) {
          // Handle email confirmation via token parameters
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: 'email'
          });

          if (error) {
            console.error('Email confirmation error:', error);
            setError(error.message);
            setStatus('error');
            return;
          }

          if (data.user) {
            setStatus('success');
            setTimeout(() => {
              navigate('/dashboard');
            }, 3000);
          }
        } else {
          // Check if user is already confirmed
          const { data: session } = await supabase.auth.getSession();
          if (session?.session?.user?.email_confirmed_at) {
            setStatus('already_confirmed');
          } else {
            setError('Invalid or missing confirmation parameters');
            setStatus('error');
          }
        }
      } catch (err) {
        console.error('Email confirmation error:', err);
        setError('An unexpected error occurred during email confirmation');
        setStatus('error');
      }
    };

    handleEmailConfirmation();
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {status === 'processing' && 'Confirming Email...'}
            {status === 'success' && 'Email Confirmed!'}
            {status === 'already_confirmed' && 'Already Confirmed'}
            {status === 'error' && 'Confirmation Failed'}
          </CardTitle>
          <CardDescription>
            {status === 'processing' && 'Please wait while we confirm your email address'}
            {status === 'success' && 'Your email has been successfully confirmed'}
            {status === 'already_confirmed' && 'Your email is already confirmed'}
            {status === 'error' && 'There was a problem confirming your email'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center">
          {status === 'processing' && (
            <div className="space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
              <p className="text-muted-foreground">
                Processing your email confirmation...
              </p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="space-y-4">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto" />
              <p className="text-muted-foreground">
                Welcome to VC Analyst! You'll be redirected to your dashboard shortly.
              </p>
              <Button onClick={() => navigate('/dashboard')} className="w-full">
                Go to Dashboard
              </Button>
            </div>
          )}

          {status === 'already_confirmed' && (
            <div className="space-y-4">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto" />
              <p className="text-muted-foreground">
                You're all set! Your email is already confirmed.
              </p>
              <Button onClick={() => navigate('/dashboard')} className="w-full">
                Go to Dashboard
              </Button>
            </div>
          )}
          
          {status === 'error' && (
            <div className="space-y-4">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              <div className="space-y-2">
                <Button onClick={() => navigate('/auth')} className="w-full">
                  Back to Sign In
                </Button>
                <Button variant="outline" onClick={() => window.location.reload()} className="w-full">
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailConfirm; 