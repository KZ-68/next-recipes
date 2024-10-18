import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider } from "next-themes";

const merriWeather = Merriweather({
  weight: ["300", "400", "700", "900"],
  style: ["italic", "normal"],
  subsets: ["latin"],
  display: "swap"
})

export const metadata: Metadata = {
  title: "Next Recipes",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${merriWeather.className} antialiased dark:bg-slate-800`}>
          <ThemeProvider>
          <header>
            <nav className="flex flex-row justify-between pr-20 bg-slate-800 text-white">
              <NavBar />
              <div className="flex flex-row gap-3">
                <ThemeSwitcher />
                <SignedOut>
                  <SignInButton />
                  <SignUpButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </nav>
          </header>
            <main className='min-h-screen p-6'>
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
