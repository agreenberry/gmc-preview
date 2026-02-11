import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, User, Lock, CheckCircle2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { User as UserType } from '@/types';
import { toast } from 'sonner';
interface AccountSetupPageProps {
    user: UserType;
    onComplete: (data: { username: string; displayName: string; password: string }) => void;
}

export function AccountSetupPage({ user, onComplete }: AccountSetupPageProps) {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateUsername = (value: string): boolean => {
        setErrors({});
        if (value.length < 3) {
            setErrors({ username: 'Username must be at least 3 characters' });
            return false;
        }
        if (value.length > 20) {
            setErrors({ username: 'Username must be less than 20 characters' });
            return false;
        }
        if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
            setErrors({ username: 'Username can only contain letters, numbers, hyphens, and underscores' });
            return false;
        }
        return true;
    };

    const validateDisplayName = (value: string): boolean => {
        setErrors({});
        if (value.length < 2) {
            setErrors({ displayName: 'Display name must be at least 2 characters' });
            return false;
        }
        if (value.length > 50) {
            setErrors({ displayName: 'Display name must be less than 50 characters' });
            return false;
        }
        return true;
    };

    const validatePassword = (value: string): boolean => {
        setErrors({});
        if (value.length < 8) {
            setErrors({ password: 'Password must be at least 8 characters' });
            return false;
        }
        if (!/[A-Z]/.test(value)) {
            setErrors({ password: 'Password must contain at least one uppercase letter' });
            return false;
        }
        if (!/[a-z]/.test(value)) {
            setErrors({ password: 'Password must contain at least one lowercase letter' });
            return false;
        }
        if (!/[0-9]/.test(value)) {
            setErrors({ password: 'Password must contain at least one number' });
            return false;
        }
        return true;
    };

    const validateConfirmPassword = (value: string): boolean => {
        setErrors({});
        if (value !== password) {
            setErrors({ confirmPassword: 'Passwords do not match' });
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (step === 1) {
            if (validateUsername(username)) {
                setStep(2);
            }
        } else if (step === 2) {
            if (validateDisplayName(displayName)) {
                setStep(3);
            }
        } else if (step === 3) {
            if (validatePassword(password) && validateConfirmPassword(confirmPassword)) {
                // Complete setup
                onComplete({ username, displayName, password });
                navigate('/dashboard');
            }
        }
    };

    const handleBack = () => {
        setErrors({});
        setStep(step - 1);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleNext();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-0">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border-2 border-gold mb-4">
                        <Shield className="w-8 h-8 text-gold" />
                    </div>
                    <h1 className="text-3xl font-bold text-gold mb-2">Complete Your Quest</h1>
                    <p className="text-gray-400">Set up your account to join the adventure</p>
                </div>

                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        {[1, 2, 3].map((num) => (
                            <React.Fragment key={num}>
                                <div
                                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${num < step
                                            ? 'bg-gold border-gold'
                                            : num === step
                                                ? 'border-gold bg-gold/10'
                                                : 'border-gray-700 bg-black'
                                        }`}
                                >
                                    {num < step ? (
                                        <CheckCircle2 className="w-5 h-5 text-black" />
                                    ) : (
                                        <span
                                            className={`text-sm font-bold ${num === step ? 'text-gold' : 'text-gray-600'
                                                }`}
                                        >
                                            {num}
                                        </span>
                                    )}
                                </div>
                                {num < 3 && (
                                    <div
                                        className={`flex-1 h-0.5 mx-2 transition-colors ${num < step ? 'bg-gold' : 'bg-gray-800'
                                            }`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Username</span>
                        <span>Display Name</span>
                        <span>Password</span>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-gray-900 border-2 border-gold rounded-lg p-8">
                    {/* Step 1: Username */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <User className="w-5 h-5 text-gold" />
                                    <h2 className="text-xl font-bold text-gold">Choose Your Username</h2>
                                </div>
                                <p className="text-sm text-gray-400 mb-4">
                                    This is your unique identifier. You can use letters, numbers, hyphens, and underscores.
                                </p>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="w-full px-4 py-3 bg-black border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors"
                                    placeholder="adventurer_123"
                                    autoFocus
                                    aria-describedby={errors.username ? 'username-error' : undefined}
                                    aria-invalid={!!errors.username}
                                />
                                {errors.username && (
                                    <p id="username-error" className="text-red-400 text-sm mt-2" role="alert">
                                        {errors.username}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Display Name */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <User className="w-5 h-5 text-gold" />
                                    <h2 className="text-xl font-bold text-gold">Choose Your Display Name</h2>
                                </div>
                                <p className="text-sm text-gray-400 mb-4">
                                    This is how others will see you. You can use your real name or a character name.
                                </p>
                                <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-2">
                                    Display Name
                                </label>
                                <input
                                    id="displayName"
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="w-full px-4 py-3 bg-black border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors"
                                    placeholder="The Brave Adventurer"
                                    autoFocus
                                    aria-describedby={errors.displayName ? 'displayName-error' : undefined}
                                    aria-invalid={!!errors.displayName}
                                />
                                {errors.displayName && (
                                    <p id="displayName-error" className="text-red-400 text-sm mt-2" role="alert">
                                        {errors.displayName}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Password */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Lock className="w-5 h-5 text-gold" />
                                    <h2 className="text-xl font-bold text-gold">Secure Your Account</h2>
                                </div>
                                <p className="text-sm text-gray-400 mb-4">
                                    Create a strong password with at least 8 characters, including uppercase, lowercase, and numbers.
                                </p>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                className="w-full px-4 py-3 pr-12 bg-black border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors"
                                                placeholder="••••••••"
                                                autoFocus
                                                aria-describedby={errors.password ? 'password-error' : undefined}
                                                aria-invalid={!!errors.password}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gold transition-colors"
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p id="password-error" className="text-red-400 text-sm mt-2" role="alert">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="confirmPassword"
                                                type={showPassword ? 'text' : 'password'}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                className="w-full px-4 py-3 pr-12 bg-black border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors"
                                                placeholder="••••••••"
                                                aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                                                aria-invalid={!!errors.confirmPassword}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gold transition-colors"
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && (
                                            <p id="confirmPassword-error" className="text-red-400 text-sm mt-2" role="alert">
                                                {errors.confirmPassword}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-8">
                        {step > 1 && (
                            <button
                                onClick={handleBack}
                                className="px-6 py-3 border-2 border-gray-700 rounded-lg text-gray-300 hover:border-gold hover:text-gold transition-colors font-medium"
                            >
                                Back
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            className="flex-1 px-6 py-3 bg-gold text-black rounded-lg font-bold hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
                        >
                            {step === 3 ? 'Complete Setup' : 'Continue'}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Help Text */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Need help? <a href="/help" className="text-gold hover:underline">Contact Support</a>
                </p>
            </div>
        </div>
    );
}