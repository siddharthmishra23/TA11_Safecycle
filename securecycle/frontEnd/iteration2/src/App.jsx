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
import IterationOneApp from "./../../iteration1/src/App"
import IterationThreeApp from "./../../iteration3/src/App"



//import IterationOneHome from "./iterationOne/src/pages/Home";
//import IterationOneResource from "./iterationOne/src/pages/Resources";

//import IterationTwoApp from "./src/iterationTwo/src/App"
function App() {
  useEffect(() => {
    AOS.init({});
  }, []);
 // const [isAuthenticated, setIsAuthenticated] = useState(false);

  //if (!isAuthenticated) {
 //   return <Login onLogin={() => setIsAuthenticated(true)} />;
 // }
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/iteration1/*" element={<IterationOneApp />} />
          <Route path="/iteration3/*" element={<IterationThreeApp />} />

        </Routes>
      <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
