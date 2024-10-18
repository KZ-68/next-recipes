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
		<div className="flex flex-col justify-center bg-slate-800 text-primary-green">
            {theme === "dark" ? (
                <button onClick={() => {setTheme('light');  console.log("Theme set to dark but in reality it is", theme) }}><SunIcon size={36}/></button>
            ):(
                <button onClick={() => setTheme('dark')}><MoonIcon size={36} /></button>    
            )}	
		</div>
	);
};

export default ThemeSwitcher;