
import { ThemeProvider } from "next-themes";
import { Fira_Code } from "next/font/google";
import Providers from "@/lib/providers";
import AuthProvider from "@/lib/providers/SessionProvider";
import Head from "next/head";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Toaster } from 'sonner';
// Load the font with the desired weights
const firaCode = Fira_Code({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-fira-code",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={firaCode.variable}>
            <Head>
                <title>My Next.js App</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <a
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap"
                />
            </Head>
            <body className="font-mono">
                <AuthProvider>
                    <Providers>
                        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
                            <SidebarProvider>
                                <AppSidebar />
                                <main className="min-h-screen w-full px-4">
                                    <SidebarTrigger />
                                    {children}
                                    <Toaster position="top-right" richColors />
                                </main>
                            </SidebarProvider>
                        </ThemeProvider>
                    </Providers>
                </AuthProvider>
            </body>
        </html>
    );
}