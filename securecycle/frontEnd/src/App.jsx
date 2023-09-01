import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Home from "./pages/Home";
import Travel from "./pages/Travel";
import Resources from "./pages/Resources";
import Aboutus from "./pages/Aboutus";
import AOS from "aos";
import ScrollToTop from "./components/ScrollUp";

function App() {
  useEffect(() => {
    AOS.init({
      // You can also pass any AOS options here. For example:
      // duration: 1000,
    });
  }, []);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/travel" element={<Travel />} /> */}
          <Route path="/resources" element={<Resources />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
