import useTranslations from "../hooks/useTranslations";
import LanguageSwitcher from "../components/shared/LanguageSwitcher";
import { Link } from "react-router-dom"
import EventCards from "@/components/ui/UpcomingEventsCardCalenadr";
import RenderDates from "@/components/ui/DatesRender";
import MainCalendar from "@/components/ui/MainCalendar";
function Calendar() {
  const {t} = useTranslations()

  const isArabic = document.documentElement.dir === "rtl";
  const isRTL = document.documentElement.dir = isArabic ? "rtl" : "ltr"

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
                  <Link to="/Calendar" className="block py-2 px-4 rounded-lg hover:bg-custom-blue-hover hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
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
        <div className="flex-1 overflow-y-auto bg-gray-100">
          {/* Header */}
          <div className="relative flex items-center justify-between mb-6 bg-custom-blue " style={{padding: "1.7rem"}}>
            <h1 className="text-4xl pl-4 font-montagu text-custom-blue-foreground">{t("dashboard.Calendar")}</h1>
            <LanguageSwitcher />
            <div className="w-full absolute top-23.5 right-2 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
          <div className="flex flex-col xl:flex-row gap-6 p-8 items-start">
            <div className="w-full xl:w-auto">
            <MainCalendar />
            </div>
            <div className="w-full xl:flex-1">
              <EventCards />
            </div>
          </div>
          <div className="flex flex-col xl:flex-1 bg-white p-5 m-5 ml-8 mr-8 rounded-2xl shadow-xl border-1">
            <div className="rounded-2xl overflow-y-auto h-100 ">
              <RenderDates />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Calendar;