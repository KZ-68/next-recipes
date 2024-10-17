"use client"

import { MoonIcon, SunIcon } from "lucide-react";

interface ThemeSwitcherProps {
    darkMode: boolean;
    lightMode: boolean;
}

export const ThemeSwitcher:React.FC<ThemeSwitcherProps> = ({darkMode, lightMode}) => {

    async function toggleDarkMode() {
        darkMode = true;
        lightMode = false;
        const key = "darkMode";
        const value:any = true;
        localStorage.setItem(key, value);
        return darkMode;
    }

    async function toggleLightMode() {
        lightMode = true;
        darkMode = false;
        const key = "lightMode";
        const value:any = true;
        localStorage.setItem(key, value);
        return lightMode;
    } 
    
    return (
      <div className="flex flex-col justify-center">
        {(lightMode = true) ? (
            <div className="flex flex-col justify-center">
                <button onClick={toggleDarkMode}>
                    <MoonIcon size={36}/>
                </button>
                <button className="hidden" onClick={toggleLightMode}>
                    <SunIcon />
                </button>
            </div>
        ): (
            <div className="flex flex-col justify-center">
                <button className="hidden" onClick={toggleDarkMode}>
                    <MoonIcon size={36}/>
                </button>
                <button onClick={toggleLightMode}>
                    <SunIcon />
                </button>
            </div>
        )}
    
      </div>
    )
  };