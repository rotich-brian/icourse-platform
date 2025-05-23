import React, { useState} from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/authUtils/AuthProvider';
import { Navigate } from "react-router-dom";

export default function SignInPage() {

    const { isAuthenticated, login, error, loading } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
  
    const router = useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // setError('');

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            if (!response.ok) {
                throw new Error('Email and Password do not match!');
            }

            const data = await response.json();
            const token = data.token;
            const userdata = data.userData;

            await login(token, userdata);

        } catch (err) {
            // setError(err.message);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    return !isAuthenticated ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-3">
            <Card className="w-full max-w-md p-6 space-y-6 bg-white">
                <div className="flex flex-col items-center space-y-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-900">Sign in to your account</h1>
                </div>

                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email address</label>
                            <Input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                placeholder="name@example.com" 
                                onChange={handleInputChange}
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <Input 
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleInputChange}
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm mt-2">{error}</div>
                        )}

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" type="checkbox" disabled={isLoading} />
                                <label htmlFor="remember" className="text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>
                            <Button variant="link" className="text-sm text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </Button>
                        </div>

                        <Button 
                            className="w-full bg-indigo-600 hover:bg-indigo-700 mt-4" 
                            disabled={isLoading}
                        >
                            <div className="flex items-center justify-center gap-2">
                                {isLoading && (
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle 
                                            className="opacity-25" 
                                            cx="12" 
                                            cy="12" 
                                            r="10" 
                                            stroke="currentColor" 
                                            strokeWidth="4"
                                        />
                                        <path 
                                            className="opacity-75" 
                                            fill="currentColor" 
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                )}
                                <span>{isLoading ? 'Signing in...' : 'Sign in'}</span>
                            </div>
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="flex items-center justify-center space-x-2" disabled={isLoading}>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            <span>Google</span>
                        </Button>
                        <Button variant="outline" className="flex items-center justify-center space-x-2" disabled={isLoading}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            <span>GitHub</span>
                        </Button>
                    </div>

                    <div className="text-center text-sm text-gray-600">
                        Not a member?{' '}
                        <Link to="/new">
                            <Button variant="link" className="text-indigo-600 hover:text-indigo-500">
                                Start a 14 day free trial
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    ) : <Navigate to="/dashboard" />;
}