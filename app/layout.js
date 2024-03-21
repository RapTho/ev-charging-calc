import "./globals.scss";

import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "EV charger dashboard",
  description: "Visualization to display NeoVac home charger data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
