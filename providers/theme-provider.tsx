// This component wraps your application to provide dark/light mode functionality.
// It uses the `next-themes` library for seamless theme management.

"use client" // Marks this as a Client Component, as `next-themes` relies on browser APIs.

import { ThemeProvider as NextThemesProvider } from "next-themes" // Import ThemeProvider from next-themes
import type { ThemeProviderProps } from "next-themes" // Import types for ThemeProvider props

// ThemeProvider component definition.
// It simply re-exports the `NextThemesProvider` from `next-themes`.
// All props passed to this component will be forwarded to `NextThemesProvider`.
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
