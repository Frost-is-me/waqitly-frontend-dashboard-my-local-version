// src/pages/Dash_Board.tsx this is the dashboard page for the admin panel and it contains the sidebar and the main content area
//the style is done using tailwind css and it is only for demo purposes only it will be changed later when the Ui/UX design is done
import {useTotalBooking, useTotalPending} from "../hooks/useBookingsStatus"
import useRevenue from "../hooks/useConfirmedRevenue";
import useTranslations from "../hooks/useTranslations";
import useAveragePrice from "@/hooks/useAverage";
import LanguageSwitcher from "../components/shared/LanguageSwitcher";
import { ChartAreaInteractive } from "@/components/shared/chart-area-interactive";
import EventCards from "@/components/ui/UpcomingEventsCard";
import DropMenu from "@/components/ui/DropDown";
import { Link } from "react-router-dom"

function Dashboard() {
  const {t} = useTranslations()
  const TotalBooking = useTotalBooking()
  const Pending = useTotalPending()
  const Revenue = useRevenue()
  const AveragePrice = useAveragePrice()
  const isArabic = document.documentElement.dir === "rtl";
  const isRTL = document.documentElement.dir = isArabic ? "rtl" : "ltr";
  
  return (
    <div className={`bg-gray-100 min-h-screen ${ isRTL ? "rtl" : "ltr"}`}> 
      <div className="flex flex-col md:flex-row h-screen">    
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-custom-blue text-zinc-200 shadow-md">
          <div style={{ borderBottom: '1px solid #ffffff'}} className="p-5 pb-5.5 ">
            <h1 className="text-xl font-bold flex items-center">
              {t("dashboard.title")}
            </h1>
            <p className="text-custom-blue-foreground text-sm mt-1">{t("dashboard.Welcome")}</p>
          </div>
          <nav className="p-5 pl-2 pr-2">
            <div className="mb-2 text-custom-blue-foreground font-semibold">
              <ul>
                <li>
                  <Link to="/" className="block py-2 px-4 rounded-lg hover:bg-custom-blue-hover hover:text-white sidebar-hover-effect transition-all duration-300 ease-in-out cursor-pointer
                  "
                  
                  >
                    <img 
                    src="../../icons/svg/Overview.svg" 
                    alt="Overview icon" 
                    className="inline-block w-4 h-4 mb-1 mr-3 align-middle rtl:ml-3"
                    />
                    {t("dashboard.Overview")}
                  </Link>
                </li>
                <li>
                  <Link to="Calendar" className="block py-2 px-4 rounded-lg hover:bg-custom-blue-hover hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
                    <img 
                    src="../../icons/svg/Calendar.svg" 
                    alt="Calendar icon" 
                    className="inline-block w-4 h-4 mb-1 mr-3 align-middle rtl:ml-3"
                    />
                    {t("dashboard.Calendar")}
                  </Link>
                </li>
                <li>
                  <Link to="/CreateService" className="block py-2 px-4 rounded-lg hover:bg-custom-blue-hover hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
                    <img 
                    src="../../icons/svg/Settings.svg" 
                    alt="Create a Service icon" 
                    className="inline-block w-4 h-4 mb-1 mr-3 align-middle rtl:ml-3"
                    />
                    {t("dashboard.Create a Service")}
                  </Link>
                </li>
                <li>
                  <Link to="/Reservations" className="block py-2 px-4 rounded-lg hover:bg-custom-blue-hover hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
                    <img 
                    src="../../icons/svg/Team.svg" 
                    alt="Reservations" 
                    className="inline-block w-4 h-4 mb-1 mr-3 align-middle rtl:ml-3"
                    />
                    {t("dashboard.Reservations")}
                  </Link>
                </li>
                <li>
                  <Link to="/Locations" className="block py-2 px-4 rounded-lg hover:bg-custom-blue-hover hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
                    <img 
                    src="../../icons/svg/Locations.svg" 
                    alt="Locations icon" 
                    className="inline-block w-4 h-4 mb-1 mr-3 align-middle rtl:ml-3"
                    />
                    {t("dashboard.Locations")}
                  </Link>
                </li>
                <li>
                  <Link to="/Analytics" className="block py-2 px-4 rounded-lg hover:bg-custom-blue-hover hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
                    <img 
                    src="../../icons/svg/Overview.svg" 
                    alt="Analytics icon" 
                    className="inline-block w-4 h-4 mb-1 mr-3 align-middle rtl:ml-3"
                    />
                    {t("dashboard.Analytics")}
                  </Link>
                </li>
                <li>
                  <Link to="/Team" className="block py-2 px-4 rounded-lg hover:bg-custom-blue-hover hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
                    <img 
                    src="../../icons/svg/Team.svg" 
                    alt="Team icon" 
                    className="inline-block w-4 h-4 mb-1 mr-3 align-middle rtl:ml-3"
                    />
                    {t("dashboard.Team")}
                  </Link>
                </li>
                <li>
                  <Link to="#" className="block py-2 px-4 rounded-lg hover:bg-custom-blue-hover hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
                    <img 
                    src="../../icons/svg/Settings.svg" 
                    alt="Settings icon" 
                    className="inline-block w-4 h-4 mb-1 mr-3 align-middle rtl:ml-3"
                    />
                    {t("dashboard.Settings")}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="relative flex items-center justify-between mb-6 bg-custom-blue " style={{padding: "1.7rem"}}>
            <h1 className="text-4xl pl-4 font-montagu text-custom-blue-foreground">{t("dashboard.Overview")}</h1>
            <DropMenu />
            <LanguageSwitcher />
            <div className="w-full absolute top-23.5 right-2 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 m-2">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm text-gray-500 mb-2">{t("dashboard.Total Bookings")}</div>
              <div className="text-2xl font-bold text-gray-800">{TotalBooking}</div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm text-gray-500 mb-2">{t("dashboard.Pending")}</div>
              <div className="text-2xl font-bold text-gray-800">{Pending}</div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm text-gray-500 mb-2">{t("dashboard.Confirmed Revenue")}</div>
              <div className="text-2xl font-bold text-gray-800 rtl:">
              {Revenue ? Revenue.toFixed(2) : "0.00"}
              <span className="rtl:inline pl-2">IQD</span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm text-gray-500 mb-2">{t("dashboard.Average Price")}</div>
              <div className="text-2xl font-bold text-gray-800">
                {AveragePrice ? AveragePrice.toFixed(2) : "0.00"}
                <span className="rtl:inline pl-2">IQD</span>
              </div>
            </div>
          </div>
    
            <div className="mb-6">
              <ChartAreaInteractive />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 m-2">
              
               <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{t("dashboard.Customer Rating")}</h2>
    
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 text-2xl">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                  <span className="ml-2 text-gray-700 font-medium">4.8/5</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 w-16">5 {t("dashboard.stars")}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div className="h-full bg-yellow-400 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">85%</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 w-16">4 {t("dashboard.stars")}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div className="h-full bg-yellow-400 rounded-full" style={{width: '12%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">12%</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 w-16">3 {t("dashboard.stars")}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div className="h-full bg-yellow-400 rounded-full" style={{width: '2%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">2%</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 w-16">2 {t("dashboard.stars")}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div className="h-full bg-yellow-400 rounded-full" style={{width: '1%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">1%</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 w-16">1 {t("dashboard.stars")}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div className="h-full bg-yellow-400 rounded-full" style={{width: '0%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">0%</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">Based on 247 reviews</p>
                </div>
              </div>
              <EventCards />
          </div>
          
        </div>
      </div>
    </div>
  );
}
export default Dashboard;