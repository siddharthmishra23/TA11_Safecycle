import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
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
import IterationOneApp from "./../../iteration1/src/App";

import IterationTwoApp from "./../../iteration2/src/App"
function App() {
  useEffect(() => {
    AOS.init({});
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
          <Route path="/travel" element={<Travel />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/iteration1/*" element={<IterationOneApp />} />
          <Route path="/iteration2/*" element={<IterationTwoApp />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
