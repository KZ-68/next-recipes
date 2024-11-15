import React, { useCallback, useEffect, useState } from 'react'
import ThemeSwitcher from './ThemeSwitcher';

const ThemeSwitcherScroll = () => {

    const [scrollY, setScrollY] = useState(0);

    const onScroll = useCallback(event => {
        const { scrollY } = window;
        console.log("scrollY", scrollY);
        setScrollY(window.scrollY);
    }, []);

    useEffect(() => {

        //add eventlistener to window
        window.addEventListener("scroll", onScroll, { passive: true });
        // remove event on unmount to prevent a memory leak with the cleanup
        return () => {
        window.removeEventListener("scroll", onScroll, { passive: true });
        }

    }, []);

    return (
        <div>
            {scrollY > 80 ? 
            (
            <div className="fixed top-4 right-4">
            <ThemeSwitcher/>
            </div>
            ):
            (
            <div className="hidden absolute top-4 right-4">
            <ThemeSwitcher />
            </div>
            )
            }
        </div>
    )
}

export default ThemeSwitcherScroll

