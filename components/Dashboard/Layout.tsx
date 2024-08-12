import DashboardHeader from "./Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <DashboardHeader />
            {children}
        </>
    )
}