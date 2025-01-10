'use client'
import React from 'react'
import { useAuth } from '@/context/AuthContext';
// components
import Button from './Button';
import Link from 'next/link';

export default function CallToAction() {
    const { currentUser } = useAuth();

    if (currentUser) {
        return (
            <div className='max-w-[600px] mx-auto w-full md:w-auto'>
                <Link href={'/dashboard'}>
                    <Button text='Go To Dashboard' darkStyle full />
                </Link>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-2 gap-4 w-fit mx-auto'>
            <Link href='/dashboard'>
                <Button text='Sign Up' />
            </Link>
            <Link href='/dashboard'>
                <Button text='Log In' darkStyle />
            </Link>
        </div>
    )
}
