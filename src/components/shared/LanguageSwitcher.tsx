import { useTranslation } from "react-i18next";

const LanguageSwitcher  = () => {
    const {i18n} = useTranslation()

    const ChangeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    };

    return(
        <>
            <select 
            value={i18n.language}
            onChange={(e) => ChangeLanguage(e.target.value)}
            className="border rounded py-1 px-2"
            >
                <option value="en">English</option>
                <option value="ar">العربية</option>
            </select>
        </>
    )
}

export default LanguageSwitcher;

//This is the LanguageSwitcher component it gives you a select bar to change from a Language to another