"use client"

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
      <div>
        {(lightMode = true) ? (
            <div>
                <button onClick={toggleDarkMode}>Dark Mode</button>
                <button className="hidden" onClick={toggleLightMode}>Light Mode</button>
            </div>
        ): (
            <div>
                <button className="hidden" onClick={toggleDarkMode}>Dark Mode</button>
                <button onClick={toggleLightMode}>Light Mode</button>
            </div>
        )}
    
      </div>
    )
  };