// src/pages/Dash_Board.tsx this is the dashboard page for the admin panel and it contains the sidebar and the main content area
//the style is done using tailwind css and it is only for demo purposes only it will be changed later when the Ui/UX design is done
import useTotalBooking from "../hooks/useTotalBookings";
import useRevenue from "../hooks/useConfirmedRevenue";
import useTranslation from "../hooks/useTranslations";
import LanguageSwitcher from "../components/shared/LanguageSwitcher";

function Dashboard() {
  const {t} = useTranslation()
  const TotalBooking = useTotalBooking()
  const Revenue = useRevenue()
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row h-screen">    
        {/* Sidebar - unchanged as requested */}
        <div className="w-full md:w-64 bg-gradient-to-b from-purple-900 to-purple-800 text-zinc-200 shadow-md">
          <div className="p-5 border-b border-purple-600">
            <h1 className="text-xl font-bold flex items-center">
              <i className="fas fa-tachometer-alt mr-2"></i> {t("dashboard.title")}
            </h1>
            <p className="text-purple-200 text-sm mt-1">Welcome, admin!</p>
          </div>
          <nav className="p-5 pl-2 pr-2">
            <div className="mb-2 text-purple-200 font-semibold">
              <div className="text-purple-300 text-xs uppercase font-bold pl-3 py-2">
                Navigation
              </div>
              <ul>
                <li>
                  <a href="#" className="block py-2 px-4 rounded-lg hover:bg-purple-700 hover:text-white sidebar-hover-effect transition-all duration-300 ease-in-out cursor-pointer">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 rounded-lg hover:bg-purple-700 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
                    Calendar
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 rounded-lg hover:bg-purple-700 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
                    Create a Space
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 rounded-lg hover:bg-purple-700 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
                    Reports
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 rounded-lg hover:bg-purple-700 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
                    Team
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
            <LanguageSwitcher />
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm text-gray-500 mb-2">TotalBooking</div>
              <div className="text-2xl font-bold text-gray-800">{TotalBooking}</div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm text-gray-500 mb-2">Confirmed Revenue</div>
              <div className="text-2xl font-bold text-gray-800">IQD {Revenue ? Revenue : "0.00"}</div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm text-gray-500 mb-2">Projected Revenue</div>
              <div className="text-2xl font-bold text-gray-800">IQD 0.00</div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm text-gray-500 mb-2">Total Revenue (Approx.)</div>
              <div className="text-2xl font-bold text-gray-800">IQD 0.00</div>
            </div>
          </div>
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Bookings */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Bookings</h3>
              </div>
              
              <div className="text-center py-10">
                <div className="mb-4 text-gray-400">
                  <i className="fas fa-calendar-times text-4xl"></i>
                </div>
                <p className="text-gray-500 mb-6">You don't have any Bookings for today.</p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                  Go to Calendar
                </button>
              </div>
            </div>
            
            {/* Right Column - Activity Feed */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Activity Feed</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-full mr-3">
                    <i className="fas fa-user-plus"></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">New user registered</p>
                    <p className="text-sm text-gray-600">John Doe joined the platform</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-green-100 text-green-600 rounded-full mr-3">
                    <i className="fas fa-calendar-check"></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Booking confirmed</p>
                    <p className="text-sm text-gray-600">Meeting Room A booked for tomorrow</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-full mr-3">
                    <i className="fas fa-building"></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">New space added</p>
                    <p className="text-sm text-gray-600">Conference Room B is now available</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-yellow-100 text-yellow-600 rounded-full mr-3">
                    <i className="fas fa-exclamation-circle"></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Payment reminder</p>
                    <p className="text-sm text-gray-600">Invoice #1234 is due in 3 days</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Coming up Next Section */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Coming up Next</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-medium text-gray-800">Team Meeting</p>
                <p className="text-sm text-gray-600">Tomorrow, 10:00 AM</p>
                <p className="text-xs text-gray-500">Conference Room A</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="font-medium text-gray-800">Client Presentation</p>
                <p className="text-sm text-gray-600">Jun 15, 2:30 PM</p>
                <p className="text-xs text-gray-500">Meeting Room B</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <p className="font-medium text-gray-800">Workshop</p>
                <p className="text-sm text-gray-600">Jun 18, 9:00 AM</p>
                <p className="text-xs text-gray-500">Training Room</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;