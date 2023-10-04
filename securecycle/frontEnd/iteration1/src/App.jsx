import { Router,Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Home from "./pages/Home";
import Travel from "./pages/Travel";
import Resources from "./pages/Resources";
//import Aboutus from "./pages/Aboutus";
import AOS from "aos";
import ScrollToTop from "./components/ScrollUp";
import IterationTwoApp from "./../../iteration2/src/App"
import IterationThreeApp from "./../../iteration3/src/App"

function IterationOneApp() {
  console.log("Rendering IterationOneApp");
 useEffect(() => {
    AOS.init({});
  }, []);
  {/*
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }
*/}
  return (
   <div>

        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/travel" element={<Travel />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/iteration2/*" element={<IterationTwoApp />} />
          <Route path="/iteration3/*" element={<IterationThreeApp />} />

        </Routes>
      <Footer />
    </div>
  );
}

export default IterationOneApp;
