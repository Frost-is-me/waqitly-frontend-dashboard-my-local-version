import { useEffect } from "react";
import useTranslations from "./hooks/useTranslations";
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dash_Board"
import Reservations from "./pages/Reservations";
import Team from "./pages/Team";
import Create_service from "./pages/Create_service";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import Locations from "./pages/Locations";
function App() {

  const {i18n} = useTranslations()
  useEffect(() => {
    const isArabic = i18n.language === "ar";
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/Reservations" element={<Reservations />}/>
      <Route path="/Team" element={<Team />}/>
      <Route path="/CreateService" element={<Create_service />}/>
      <Route path="/Calendar" element={<Calendar />}/>
      <Route path="/Analytics" element={<Analytics />}/>
      <Route path="/Locations" element={<Locations />}/>
    </Routes>
    </>
  )
}

export default App
