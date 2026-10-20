import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Auction from "./pages/Auction";
import Blog from "./pages/Blog";
import BlogList from "./pages/admin/BlogList";
import QueriesManager from "./pages/admin/QueriesManager";
import BlogForm from "./pages/admin/BlogForm";
import BlogDetail from "./pages/BlogDetail";
import InvoiceRequests from "./pages/admin/InvoiceRequests";
import BankDetails from "./pages/BankDetails";
import BankingDetails from "./pages/admin/BankingDetails";
import BannerManager from "./pages/admin/BannerManager";
import StockCars from "./pages/StockCars";
import PartnersManager from "./pages/admin/PartnersManager";
import CeoMessage from "./pages/CeoMessage";
import OurCompanyManager from "./pages/admin/OurCompanyManager";
import HowToBuyManager from "./pages/admin/HowToBuyManager";
import ContactUs from "./pages/ContactUs";
import HowToBuy from "./pages/HowToBuy";
import PolicyManager from "./pages/admin/PolicyManager";
import OurCompany from "./pages/OurCompany";
import InventoryBrowse from "./pages/InventoryBrowse";
import OurPartners from "./pages/OurPartners";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FaqManager from "./pages/admin/FaqManager";
import Reviews from "./pages/Reviews";
import GalleryManager from "./pages/admin/GalleryManager";
import { AuthProvider } from "./lib/AuthContext";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import CarsList from "./pages/admin/CarsList";
import EmailQueries from "./pages/admin/EmailQueries"; 
import CarForm from "./pages/admin/CarForm";
import CatalogManager from "./pages/admin/CatalogManager";
import Overview from "./pages/admin/Overview";
import AuctionCarsList from "./pages/admin/AuctionCarsList";
import AuctionCarForm from "./pages/admin/AuctionCarForm";
import MediaManager from "./pages/admin/MediaManager";
import SiteSettingsManager from "./pages/admin/SiteSettingsManager";
import CompanyContent from "./pages/admin/CompanyContent";
import { SiteSettingsProvider } from "./lib/siteSettings";
import { CurrencyProvider } from "./lib/CurrencyContext";
import "./styles/global.css";
import "./styles/admin.css";

function NotFound() {
  return (
    <div style={{ padding: "160px 5% 100px", minHeight: "60vh", color: "#fff", textAlign: "center" }}>
      <h1>404 — Page not found</h1>
    </div>
  );
}

// Public site: currency provider sirf yahan lagta hai
function PublicLayout() {
  return (
    <CurrencyProvider>
      <Layout />
    </CurrencyProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SiteSettingsProvider>
          <Routes>
            {/* ---------- PUBLIC ROUTES (currency switcher chalega) ---------- */}
            <Route element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="stock-cars" element={<StockCars />} />
              <Route path="auction" element={<Auction />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogDetail />} />
              <Route path="ceo-message" element={<CeoMessage />} />
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="how-to-buy" element={<HowToBuy />} />
              <Route path="our-company" element={<OurCompany />} />
              <Route path="bank-details" element={<BankDetails />} />
              <Route path="our-partners" element={<OurPartners />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="inventory" element={<InventoryBrowse />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* ---------- ADMIN ROUTES (alag, currency ke baghair) ---------- */}
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
              <Route path="catalog" element={<CatalogManager />} />
              <Route path="company" element={<CompanyContent />} />
              <Route path="faqs" element={<FaqManager />} />
              <Route path="banner" element={<BannerManager />} />
              <Route path="media" element={<MediaManager />} />
              <Route path="partners" element={<PartnersManager />} />
              <Route path="blog" element={<BlogList />} />
              <Route path="blog/new" element={<BlogForm />} />
              <Route path="blog/:id" element={<BlogForm />} />
              <Route path="how-to-buy" element={<HowToBuyManager />} />
              <Route path="auction-cars" element={<AuctionCarsList />} />
              <Route path="auction-cars/new" element={<AuctionCarForm />} />
              <Route path="auction-cars/:id" element={<AuctionCarForm />} />
              <Route path="privacy-policy" element={<PolicyManager />} />
              <Route path="queries" element={<QueriesManager />} />
              <Route path="our-company" element={<OurCompanyManager />} />
              <Route path="gallery" element={<GalleryManager />} />
              <Route path="banking" element={<BankingDetails />} />
              <Route path="settings" element={<SiteSettingsManager />} />
                 <Route path="invoice-requests" element={<InvoiceRequests />} />
              <Route path="email-queries" element={<EmailQueries />} />
            </Route>
          </Routes>
        </SiteSettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}