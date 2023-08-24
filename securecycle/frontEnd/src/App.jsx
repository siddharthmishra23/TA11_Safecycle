import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Home from "./pages/Home";
import Travel from "./pages/Travel";
import Resources from "./pages/Resources";

function App() {
  //   const [isAuthenticated, setIsAuthenticated] = useState(false);

  //   if (!isAuthenticated) {
  //     return <Login onLogin={() => setIsAuthenticated(true)} />;
  //   }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
