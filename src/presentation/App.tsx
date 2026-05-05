import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@presentation/App.css";
import Home from "@presentation/pages/home/Home";
import Contact from "@presentation/pages/contact/Contact";
import Search from "@presentation/pages/search/Search";
import NotFound from "@presentation/pages/404/NotFound";
import { DependencyProvider } from "./providers/DependencyProvider";

function App() {
  return (
    <DependencyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DependencyProvider>
  );
}

export default App;
