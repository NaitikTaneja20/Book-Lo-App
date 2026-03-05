'use client';
import { CartProvider } from '@/hooks/use-cart';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import type { SiteSettings } from '@/lib/types';

type ProvidersProps = Omit<ThemeProviderProps, 'children'> & {
  children: React.ReactNode;
  settings: SiteSettings;
};

export function Providers({ children, settings, ...props }: ProvidersProps) {
    return (
        <NextThemesProvider {...props} attribute="class" defaultTheme="light">
            <CartProvider settings={settings}>
                {children}
                <Toaster />
            </CartProvider>
        </NextThemesProvider>
    );
}
