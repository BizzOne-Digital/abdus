import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { VisionPage } from "./pages/VisionPage";
import { Ward1Page } from "./pages/Ward1Page";
import { CommunityPage } from "./pages/CommunityPage";
import { ContactPage } from "./pages/ContactPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="vision" element={<VisionPage />} />
          <Route path="ward-1" element={<Ward1Page />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
