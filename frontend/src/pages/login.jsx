import { useState } from 'react';
import { MessageCircle, UserRound, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../Store/useAuthStore';

import MetaTags from '../../components/MetaTags';
import QuickLoginButton from '../../components/QuickLoginButton';

const Login = () => {
    const { login , errorMessage } = useAuthStore();
    const [dataForm, setDataForm] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(dataForm);
    };
    return (
            <div className="relative w-full max-w-md">
                {/* Helmet for SEO */}
                <MetaTags
                title="Login | iTalks"
                description="Login to your iTalks account to chat, connect, and share your thoughts instantly with friends and communities."
                keywords="iTalks, login, chat app, messaging, social network, connect, sign in"
                />
                {/* Logo Section */}
                <div className="text-center mb-8 relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 mb-4 shadow-lg shadow-indigo-500/30">
                        <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                        iTalks
                    </h1>
                    <p className="text-slate-400">Connect, Chat, Collaborate</p>
                </div>

                {/* Sign Up Card */}
                <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-800 p-8 relative">
                    <QuickLoginButton />
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
                        <p className="text-slate-400 text-sm">Login to access your account</p>
                    </div>
                    { errorMessage ? <p className='text-red-500 text-sm text-center'> {errorMessage} </p> : null}
                    {/* Form */}
                    <div className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                                    focusedField === 'email' ? 'text-indigo-400' : 'text-slate-500'
                                }`} />
                                <input
                                    type="email"
                                    placeholder="alexsteve2000@gmail.com"
                                    value={dataForm.email}
                                    onChange={(e) => setDataForm({ ...dataForm, email: e.target.value })}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full bg-slate-800 text-white pl-11 pr-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 placeholder:text-slate-500"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                                    focusedField === 'password' ? 'text-indigo-400' : 'text-slate-500'
                                }`} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Your Password"
                                    value={dataForm.password}
                                    onChange={(e) => setDataForm({ ...dataForm, password: e.target.value })}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full bg-slate-800 text-white pl-11 pr-11 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 placeholder:text-slate-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                        >
                            Login
                        </button>

                        {/* Login Link */}
                        <Link to={'/signup'} className=" block text-center pt-2">
                            <button
                                type="button"
                                className="text-slate-400 hover:text-indigo-400 text-sm transition-colors inline-flex items-center gap-2 group"
                            >
                                Create a new account?
                                <span className="text-indigo-400 group-hover:text-indigo-300 font-medium">
                                    SignUp
                                </span>
                            </button>
                        </Link>
                    </div>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-2 bg-slate-900 text-slate-500">Coming Soon</span>
                        </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-750 text-slate-300 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-200">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            <span className="text-sm font-medium">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-750 text-slate-300 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-200">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                            <span className="text-sm font-medium">GitHub</span>
                        </button>
                    </div>
                </div>
            </div>
    );
}

export default Login;
