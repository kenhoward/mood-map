import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Main from "@/components/Main";

export const metadata = {
    title: "Mood Map - Dashboard",
};

export default function DashboardPage() {
    // TODO add firebase authentication
    const isAuthenticated = false;
    let children = (
        <Login />
    )
    
    if (isAuthenticated) {
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