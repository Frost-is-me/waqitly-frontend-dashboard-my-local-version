import useTranslations from "../../hooks/useTranslations";
import { Link } from "react-router-dom"
import { 
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarGroupLabel } from "@/components/ui/sidebar"
  import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  PlusSquare,
  Users,
  BarChart3,
  MapPin,
  Settings,} from "lucide-react";
const SideBar = () => {
    const {state} = useSidebar()
    const {t, i18n} = useTranslations()
    const isRTL = i18n.language === "ar"
return (

        <Sidebar collapsible="icon" className="bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out" side={`${isRTL ? "right" : "left"}`}>
          <SidebarHeader className={`bg-sidebar ${ state === "expanded" ? "border-b border-sidebar-border" : ""} transition-colors duration-300`}>
            <SidebarGroupLabel className="text-lg font-bold px-4 py-6 text-sidebar-foreground transition-colors duration-300">
                {state === "expanded" ? (
              <>
              {t("dashboard.title")}
              </>
                ) : "" }
            </SidebarGroupLabel> 
          </SidebarHeader>
          <SidebarContent className="bg-sidebar overflow-hidden transition-all duration-300">
            <SidebarMenu className={`${isRTL ? 'mr-1' : 'ml-1'} transition-transform duration-300 `}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-brand-orange hover:text-white">
                  <Link to="/" className="text-sidebar-foreground font-medium">
                    <LayoutDashboard />
                    <span>{t("dashboard.Overview")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-brand-orange hover:text-white">
                  <Link to="/Calendar" className="text-sidebar-foreground font-medium">
                    <Calendar />
                    <span>{t("dashboard.Calendar")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-brand-orange hover:text-white">
                  <Link to="/CreateService" className="text-sidebar-foreground font-medium">
                    <PlusSquare />
                    <span>{t("dashboard.Create a Service")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-brand-orange hover:text-white">
                  <Link to="/Reservations" className="text-sidebar-foreground font-medium">
                    <ClipboardList />
                    <span>{t("dashboard.Reservations")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-brand-orange hover:text-white">
                  <Link to="/Locations" className="text-sidebar-foreground font-medium">
                    <MapPin />
                    <span>{t("dashboard.Locations")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-brand-orange hover:text-white">
                  <Link to="/Analytics" className="text-sidebar-foreground font-medium">
                    <BarChart3 />
                    <span>{t("dashboard.Analytics")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-brand-orange hover:text-white">
                  <Link to="/Team" className="text-sidebar-foreground font-medium">
                    <Users />
                    <span>{t("dashboard.Team")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-brand-orange hover:text-white">
                  <Link to="#" className="text-sidebar-foreground font-medium">
                    <Settings />
                    <span>{t("dashboard.Settings")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

)
}

export default SideBar