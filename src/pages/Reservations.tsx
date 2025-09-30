import useTranslations from "../hooks/useTranslations";
import LanguageSwitcher from "../components/shared/LanguageSwitcher";
import { Link } from "react-router-dom"
import { DataTable } from "@/components/ui/DataTable";

function Reservations() {
  const {t} = useTranslations()
  const isArabic = document.documentElement.dir === "rtl";
  const isRTL = document.documentElement.dir = isArabic ? "rtl" : "ltr";

  const tableData = [
  {
    id: 1,
    name: "Sarah Johnson",
    space: "Conference Room A",
    status: "reserved",
    startTime: "6:30pm",
    endTime: "8:00pm",
    totalPrice: "$150",
    date: "2024/2/10"
  },
  {
    id: 2,
    name: "Michael Chen",
    space: "Workshop Studio",
    status: "pending",
    startTime: "7:00pm",
    endTime: "9:30pm",
    totalPrice: "$275",
    date: "2024/2/11"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    space: "Executive Lounge",
    status: "done",
    startTime: "5:00pm",
    endTime: "6:45pm",
    totalPrice: "$320",
    date: "2024/2/12"
  },
  {
    id: 4,
    name: "David Thompson",
    space: "Creative Lab",
    status: "reserved",
    startTime: "6:00pm",
    endTime: "7:30pm",
    totalPrice: "$190",
    date: "2024/2/13"
  },
  {
    id: 5,
    name: "Jessica Williams",
    space: "Meeting Pod 3",
    status: "pending",
    startTime: "8:15pm",
    endTime: "10:00pm",
    totalPrice: "$210",
    date: "2024/2/14"
  }
]
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
                  <Link to="#" className="block py-2 px-4 rounded-lg hover:bg-custom-blue-hover hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
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
            <h1 className="text-4xl pl-4 font-montagu text-custom-blue-foreground">{t("dashboard.Reservations")}</h1>
            <LanguageSwitcher />
            <div className="w-full absolute top-23.5 right-2 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
          <div className=" m-5">
            <DataTable data={tableData} />
          </div>
    
        </div>
      </div>
    </div>
  );
}
export default Reservations;