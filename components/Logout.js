'use client'
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { usePathname } from 'next/navigation'
// components
import Button from './Button'
import Link from 'next/link'

export default function Logout() {
    const { currentUser, logout } = useAuth();
    const pathname = usePathname();

    if (!currentUser) return null;

    if (pathname === '/') {
        return (
            <Link href='/dashboard'>
                <Button text='Go To Dashboard' />
            </Link>
        )
    }

    return (
        <Button text='Log Out' clickHandler={logout} />
    )
}
