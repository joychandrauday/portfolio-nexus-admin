import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Fira_Code } from "next/font/google";
import Providers from "@/lib/providers";
import AuthProvider from "@/lib/providers/SessionProvider";
import { Toaster } from "sonner";
import Head from "next/head";

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
            <body className="font-mono bg-current">
                <AuthProvider>
                    <Providers>
                        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
                            {children}
                            <Toaster position='top-center' richColors />
                        </ThemeProvider>
                    </Providers>
                </AuthProvider>
            </body>
        </html>
    );
}
