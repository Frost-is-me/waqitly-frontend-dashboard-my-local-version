import { useTranslation } from "react-i18next";
import { IconChevronDown } from "@tabler/icons-react";


const LanguageSwitcher  = () => {
    const {i18n} = useTranslation()  
    const ChangeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    };

    return(
        <>
        <div className="relative">
            <select 
            value={i18n.language}
            onChange={(e) => ChangeLanguage(e.target.value)}
            className="appearance-none border rounded-lg px-10 pr-10 mr-5 h-9 bg-gray-100 rtl:mr-3"
            >
                <option className="" value="en">EN</option>
                <option className="" value="ar">AR</option>
                
            </select>
            <img className="absolute right-23 rtl:right-21 top-2 w-5 h-5 pointer-events-none" src="../../icons/svg/language.svg" alt="" />
            <IconChevronDown className="absolute right-8 rtl:right-6 top-2.5 w-5 h-5 text-gray-400 " />
        </div>
        </>
    )
}

export default LanguageSwitcher;

//This is the LanguageSwitcher component it gives you a select bar to change from a Language to another