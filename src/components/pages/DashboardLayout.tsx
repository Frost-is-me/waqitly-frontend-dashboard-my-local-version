import Header from "./DashboardHeader"
import SideBar from "./DashboardSidebar"
import { SidebarProvider } from "../ui/sidebar"
import { Outlet } from "react-router-dom"
const DashboardLayout = () => {
    return (
        <SidebarProvider>
            <div className={`min-h-screen flex w-full bg-background text-foreground theme-transition`}>
                <SideBar />
                <div className="flex-1 flex flex-col bg-background">
                    <Header />
                    <main className="flex-1 p-8  bg-background">
                        <Outlet  />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default DashboardLayout