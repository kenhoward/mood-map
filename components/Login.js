'use client'
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Button from './Button';
import { Fugaz_One } from 'next/font/google';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'], display: "swap" });

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [authenticating, setAuthenticating] = useState(false);
    const { signup, login } = useAuth();

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = async () => {
        if (!email || !password || password.length < 6) {
            alert('Please fill in all fields and ensure the password is at least 6 characters long.');
            return;
        }
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        setAuthenticating(true);

        try {
            if (isRegister) {
                console.log('Signing up a new user');
                await signup(email, password);
            } else {
                console.log('Logging in a user');
                await login(email, password);
            }
        } catch (err) {
            console.error(`Error on submit - Firebase Error Code: ${err.code}`);
            console.error(`Firebase Error Message: ${err.message}`);
            alert(`Authentication Error: ${err.message}`);
        } finally {
            setAuthenticating(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const toggleRegistration = () => setIsRegister((prev) => !prev);

    return (
        <div className='flex flex-col flex-1 justify-center items-center gap-4'>
            <div
                className={`textGradient text-4xl sm:text-5xl md:text-6xl sm:leading-tight md:leading-tight ${fugaz.className}`}
            >
                {isRegister ? 'Register' : 'Log In'}
            </div>
            <p>Start Logging Your Mood!</p>
            <input
                className='text-majesticPurple w-full max-w-[300px] md:max-w-[500px] mx-auto px-4 py-2 sm:py-3 border border-solid border-[#e056fd] rounded-full bg-transparent placeholder-majesticPurple font-bold hover:placeholder-neonPink hover:border-neonPink focus:text-majesticPurple focus:bg-transparent focus:outline-none'
                placeholder='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <input
                className='text-majesticPurple w-full max-w-[300px] md:max-w-[500px] mx-auto px-4 py-2 sm:py-3 border border-solid border-[#e056fd] rounded-full bg-transparent placeholder-majesticPurple font-bold hover:placeholder-neonPink hover:border-neonPink focus:text-majesticPurple focus:bg-transparent focus:outline-none'
                placeholder='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <div className='max-w-[300px] md:max-w-[500px] w-full mx-auto'>
                <Button clickHandler={handleSubmit} text={authenticating ? 'Authenticating...' : 'Submit'} full />
            </div>
            <p>
                {isRegister ? "Already have an account?" : "Don't have an account?"}{' '}
                <button onClick={toggleRegistration} className='text-majesticPurple font-bold'>
                    {isRegister ? 'Log In' : 'Sign Up'}
                </button>
            </p>
        </div>
    );
}
