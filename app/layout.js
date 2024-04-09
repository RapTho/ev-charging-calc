import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata = {
  title: "EV charger dashboard",
  description: "Visualization to display NeoVac home charger data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <div className="hidden flex-col md:flex"> */}
          <div className="container">
            <div className="header">
              <div className="flex h-16 items-center pr-4">
                <Header />
              </div>
            </div>
            <div className="content">{children}</div>
            <div className="footer">
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
