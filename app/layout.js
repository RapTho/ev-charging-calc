import "./globals.css";

import Logo from "./components/Logo";
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
        <div className="container">
          <div className="logo">
            <Logo />
          </div>
          <div className="header">{/* <Header /> */}</div>
          <div className="content">{children}</div>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
