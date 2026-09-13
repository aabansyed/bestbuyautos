import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Auction from "./pages/Auction";
import Blog from "./pages/Blog";
import BlogList from "./pages/admin/BlogList";
import BlogForm from "./pages/admin/BlogForm";
import BlogDetail from "./pages/BlogDetail";
import BannerManager from "./pages/admin/BannerManager";
import PartnersManager from "./pages/admin/PartnersManager";
import CeoMessage from "./pages/CeoMessage";
import ContactUs from "./pages/ContactUs";
import HowToBuy from "./pages/HowToBuy";
import OurCompany from "./pages/OurCompany";
import InventoryBrowse from "./pages/InventoryBrowse";
import OurPartners from "./pages/OurPartners";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FaqManager from "./pages/admin/FaqManager";
import Reviews from "./pages/Reviews";
import { AuthProvider } from "./lib/AuthContext";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import CarsList from "./pages/admin/CarsList";
import CarForm from "./pages/admin/CarForm";
import Overview from "./pages/admin/Overview";
import "./styles/global.css";
import "./styles/admin.css";
import CompanyContent from "./pages/admin/CompanyContent";
function NotFound() {
  return (
    <div style={{ padding: "160px 5% 100px", minHeight: "60vh", color: "#fff", textAlign: "center" }}>
      <h1>404 — Page not found</h1>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="auction" element={<Auction />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="ceo-message" element={<CeoMessage />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="how-to-buy" element={<HowToBuy />} />
            <Route path="our-company" element={<OurCompany />} />
            <Route path="our-partners" element={<OurPartners />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="inventory" element={<InventoryBrowse />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="cars" element={<CarsList />} />
            <Route path="cars/new" element={<CarForm />} />
            <Route path="cars/:id" element={<CarForm />} />
            <Route path="company" element={<CompanyContent />} />
   <Route path="faqs" element={<FaqManager />} />
          <Route path="banner" element={<BannerManager />} />
 <Route path="partners" element={<PartnersManager />} />
 <Route path="blog" element={<BlogList />} />
<Route path="blog/new" element={<BlogForm />} />
<Route path="blog/:id" element={<BlogForm />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}