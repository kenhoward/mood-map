'use client'
import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import Button from './Button';
// fonts
import { Fugaz_One } from 'next/font/google';
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'], display: "swap" })

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [authenticating, setAuthenticating] = useState(false);
    const { signup, login } = useAuth();

    const handleSubmit = async () => {
        if (!email || !password || password.length < 6) return;

        setAuthenticating(true);
        try {
            if (isRegister) {
                console.log('signing up a new user')
                await signup(email, password);
            } else {
                console.log('logging in a user')
                await login(email, password);
            }
        } catch (err) {
            console.error(`Error on submit: ${err.message}`)
        } finally {
            setAuthenticating(false);
        }
    }

    const toggleRegistration = () => setIsRegister((prev) => !prev);

    return (
        <div className='flex flex-col flex-1 justify-center items-center gap-4'>
            <div
                className={`textGradient text-4xl sm:text-5xl md:text-6xl sm:leading-tight md:leading-tight ${fugaz.className}`}
            >
                {isRegister ? 'Log In' : 'Register'}
            </div>
            <p>Start Logging Your Mood!</p>
            <input
                className='text-majesticPurple w-full max-w-[300px] md:max-w-[500px] mx-auto px-4 py-2 sm:py-3 border border-solid border-[#e056fd] rounded-full bg-transparent placeholder-majesticPurple font-bold hover:placeholder-neonPink hover:border-neonPink focus:text-majesticPurple focus:bg-transparent focus:outline-none'
                placeholder='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className='text-majesticPurple w-full max-w-[300px] md:max-w-[500px] mx-auto px-4 py-2 sm:py-3 border border-solid border-[#e056fd] rounded-full bg-transparent placeholder-majesticPurple font-bold hover:placeholder-neonPink hover:border-neonPink focus:text-majesticPurple focus:bg-transparent focus:outline-none'
                placeholder='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className='max-w-[300px] md:max-w-[500px] w-full mx-auto'>
                <Button clickHandler={handleSubmit} text={authenticating ? 'Authenticating...' : 'Submit'} full />
            </div>
            <p>
                {isRegister ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button onClick={toggleRegistration} className='text-majesticPurple font-bold'>
                    {isRegister ? 'Sign Up' : 'Log In'}
                </button>
            </p>
        </div>
    );
}
