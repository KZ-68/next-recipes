'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';

const ThemeSwitcher = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div className={window.scrollY < 80 ? 'flex flex-col my-4 py-2 px-2 justify-center bg-slate-800 rounded-full text-primary-green' : 'flex flex-col my-4 py-2 px-2 justify-center bg-indigo-500 rounded-full text-primary-green' }>
            {theme === "dark" ? (
                <button onClick={() => {setTheme('light');  console.log("Theme set to dark but in reality it is", theme) }}><SunIcon className={window.scrollY < 80 ? 'text-yellow-400' : 'text-white'} size={36}/></button>
            ):(
                <button onClick={() => setTheme('dark')}><MoonIcon className={window.scrollY < 80 ? '' : 'text-white'} size={36} /></button>    
            )}	
		</div>
	);
};

export default ThemeSwitcher;