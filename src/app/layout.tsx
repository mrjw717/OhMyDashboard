import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getThemeFromCookies, generateThemeCSS, getThemeInitScript } from "@/infrastructure/theme";
import { AppProviders } from "@/providers";
import { Toaster } from "@/components/ui/sonner";
import { KeyboardShortcuts } from "@/features/keyboard-shortcuts";
;
import { GlobalBackgroundManager, NoiseOverlay } from "@/components/layout/backgrounds";
import { ToolWindowManager } from "@/features/command-menu";

/**
 * Geist Sans font configuration.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Geist Mono font configuration.
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Root layout metadata.
 */
export const metadata: Metadata = {
  title: "OhMyDashboard!",
  description: "An immersive Next.js dashboard workspace",
};

/**
 * Root layout component.
 * Wraps the entire application with theme providers, background effects, and global components.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { colors, isDark, colorScheme } = await getThemeFromCookies();
  const themeCSS = generateThemeCSS(colors as unknown as Record<string, string>);
  const themeInitScript = getThemeInitScript();
  const themeColor = `hsl(${colors.background})`;

  return (
    <html
      lang="en"
      className={isDark ? "dark" : ""}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content={isDark ? "dark" : "light"} />
        <meta name="theme-color" content={themeColor} />
        <style
          id="theme-inline"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `:root{${themeCSS}} html { background: transparent !important; } body { margin: 0; padding: 0; }`
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          id="disable-transitions"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var style = document.createElement('style');
                style.innerHTML = '* { transition: none !important; }';
                style.id = 'transition-blocker';
                
                var originalSetItem = localStorage.setItem;
                localStorage.setItem = function(key, value) {
                  if (key === 'color-scheme' || key === 'theme') {
                    if (!document.getElementById('transition-blocker')) {
                      document.head.appendChild(style);
                      setTimeout(function() {
                        var blocker = document.getElementById('transition-blocker');
                        if (blocker) blocker.remove();
                      }, 100);
                    }
                  }
                  originalSetItem.apply(this, arguments);
                };
              })();
            `,
          }}
        />
        <AppProviders initialColorScheme={colorScheme}>
          <GlobalBackgroundManager />
          <NoiseOverlay />
          <ToolWindowManager />

          {children}
          <Toaster />
          <KeyboardShortcuts />
          <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
            <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.005 0.01" numOctaves="3" result="noise" seed="5">
                <animate attributeName="baseFrequency" dur="45s" values="0.005 0.01;0.002 0.015;0.005 0.01" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" result="displaced" />
              <feSpecularLighting
                in="noise"
                surfaceScale="2"
                specularConstant="1.2"
                specularExponent="15"
                lightingColor={`hsl(${colors.foreground})`}
                result="specular"
              >
                <feDistantLight azimuth="45" elevation="60" />
              </feSpecularLighting>
              <feComposite in="specular" in2="displaced" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="final" />
            </filter>
          </svg>
        </AppProviders>
      </body>
    </html>
  );
}
