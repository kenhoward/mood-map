'use client'
import Dashboard from "@/components/Dashboard";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import Main from "@/components/Main";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
    const { currentUser, loading } = useAuth();
    
    let children = (
        <Login />
    )
    
    if (loading) {
        children = (
            <Loading />
        )
    }

    if (currentUser) {
        children = (
            <Dashboard />
        )
    }

    return (
        <Main>
            {children}
        </Main>
    )
}
