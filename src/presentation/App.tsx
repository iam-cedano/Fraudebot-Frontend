import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@presentation/App.css";
import Home from "@presentation/pages/home/Home";
import Contact from "@presentation/pages/contact/Contact";
import Search from "@presentation/pages/search/Search";
import NotFound from "@presentation/pages/404/NotFound";
import Report from "@presentation/pages/report/Report";
import { DependencyProvider } from "@presentation/providers/DependencyProvider";
import { APP_ROUTES } from "@/common/app-routes";

function App() {
  return (
    <DependencyProvider>
      <BrowserRouter>
        <Routes>
          <Route path={APP_ROUTES.home} element={<Home />} />
          <Route path={APP_ROUTES.contact} element={<Contact />} />
          <Route path={APP_ROUTES.search} element={<Search />} />
          <Route path={APP_ROUTES.organization} element={<Report type="organization" />} />
          <Route path={APP_ROUTES.scammer} element={<Report type="scammer" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DependencyProvider>
  );
}

export default App;
