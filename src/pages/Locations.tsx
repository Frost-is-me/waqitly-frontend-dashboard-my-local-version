
function Locations() {

  const isArabic = document.documentElement.dir === "rtl";
  const isRTL = document.documentElement.dir = isArabic ? "rtl" : "ltr";
  
  return (
    <div className={`min-h-screen ${ isRTL ? "rtl" : "ltr"}`}> 
      <div className="flex flex-col md:flex-row h-screen">    
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
    
      </div>
      </div>
    </div>
  );
}
export default Locations;