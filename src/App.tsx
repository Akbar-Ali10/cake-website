import { useState, useEffect, useCallback } from 'react';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import CataloguePage from '@/pages/CataloguePage';
import CakeDetailPage from '@/pages/CakeDetailPage';
import CustomCakesPage from '@/pages/CustomCakesPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import type { Cake } from '@/config/siteConfig';
import { businessConfig } from '@/config/siteConfig';
import { useCart } from '@/context/CartContext';

type Page = 'home' | 'catalogue' | 'cake-detail' | 'custom' | 'cart' | 'checkout' | 'about' | 'contact' | 'admin-login' | 'admin-dashboard';

const pageTitles: Record<string, string> = {
  home: `${businessConfig.name} — ${businessConfig.tagline}`,
  catalogue: `Our Cakes — ${businessConfig.name}`,
  'cake-detail': `Cake Details — ${businessConfig.name}`,
  custom: `Custom & Event Cakes — ${businessConfig.name}`,
  cart: `Your Cart — ${businessConfig.name}`,
  checkout: `Checkout — ${businessConfig.name}`,
  about: `About Us — ${businessConfig.name}`,
  contact: `Contact Us — ${businessConfig.name}`,
};

const pageDescriptions: Record<string, string> = {
  home: `Freshly baked cakes for every celebration in Karachi, Pakistan. Order birthday, wedding, anniversary and custom cakes on WhatsApp.`,
  catalogue: `Browse our full range of freshly baked cakes. Birthday, chocolate, wedding, anniversary and custom cakes available. Order on WhatsApp.`,
  'cake-detail': `Select your cake size, flavour and quantity. Order on WhatsApp with 30% advance payment.`,
  custom: `Custom cakes for weddings, birthdays, engagements and special events in Karachi. Contact us on WhatsApp to discuss your design.`,
  cart: `Review your cake order and proceed to checkout.`,
  checkout: `Complete your cake order with delivery details and 30% advance payment via Easypaisa, JazzCash or bank transfer.`,
  about: `Learn about ${businessConfig.name}, a home-based bakery in Karachi crafting beautiful, freshly baked cakes for every celebration.`,
  contact: `Contact ${businessConfig.name} in Karachi. Order cakes on WhatsApp. Delivery available within Karachi only.`,
  'admin-login': `Admin Login — ${businessConfig.name}`,
  'admin-dashboard': `Admin Dashboard — ${businessConfig.name}`,
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const path = window.location.pathname.toLowerCase();
    if (path === '/admin') return 'admin-login';
    if (path === '/admin/dashboard') return 'admin-dashboard';
    return 'home';
  });
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null);
  const { addToCart } = useCart();

  const navigate = useCallback((page: string) => {
    if (page === 'about') {
      setCurrentPage('home');
      window.history.pushState({}, '', '/');
      requestAnimationFrame(() => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      return;
    }

    if (page === 'admin-login') {
      setCurrentPage('admin-login');
      window.history.pushState({}, '', '/admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'admin-dashboard') {
      setCurrentPage('admin-dashboard');
      window.history.pushState({}, '', '/admin/dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentPage(page as Page);
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCakeClick = useCallback(
    (cake: Cake) => {
      setSelectedCake(cake);
      setCurrentPage('cake-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const handleQuickAdd = useCallback(
    (cake: Cake) => {
      const firstSize = cake.sizes[0];
      const firstFlavour = cake.flavours[0];
      addToCart({
        cakeId: cake.id,
        cakeName: cake.name,
        image: cake.image,
        sizeLabel: firstSize.label,
        weight: firstSize.weight,
        flavourLabel: firstFlavour.label,
        unitPrice: firstSize.price,
        quantity: 1,
      });
    },
    [addToCart]
  );

  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/admin') {
        setCurrentPage('admin-login');
        return;
      }
      if (path === '/admin/dashboard') {
        setCurrentPage('admin-dashboard');
        return;
      }
      setCurrentPage('home');
    };

    window.addEventListener('popstate', handleLocation);
    handleLocation();

    return () => {
      window.removeEventListener('popstate', handleLocation);
    };
  }, []);

  useEffect(() => {
    document.title = pageTitles[currentPage] || businessConfig.name;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageDescriptions[currentPage] || '');
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
      case 'about':
        return <HomePage onNavigate={navigate} onCakeClick={handleCakeClick} onQuickAdd={handleQuickAdd} />;
      case 'cake-detail':
        if (!selectedCake) {
          return <CataloguePage onCakeClick={handleCakeClick} onQuickAdd={handleQuickAdd} />;
        }
        return <CakeDetailPage cake={selectedCake} onBack={() => navigate('catalogue')} />;
      case 'custom':
        return <CustomCakesPage />;
      case 'cart':
        return <CartPage onNavigate={navigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={navigate} />;
      case 'catalogue':
        return <CataloguePage onCakeClick={handleCakeClick} onQuickAdd={handleQuickAdd} />;
      case 'contact':
        return <ContactPage />;
      case 'admin-login':
        return <AdminLoginPage />;
      case 'admin-dashboard':
        return <AdminDashboardPage />;
      default:
        return <HomePage onNavigate={navigate} onCakeClick={handleCakeClick} onQuickAdd={handleQuickAdd} />;
    }
  };

  const isAdminRoute = currentPage === 'admin-login' || currentPage === 'admin-dashboard';

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col scroll-smooth">
      {!isAdminRoute && <Header onNavigate={navigate} currentPage={currentPage} />}
      <main className="flex-1">{renderPage()}</main>
      {!isAdminRoute && <Footer onNavigate={navigate} />}
      {!isAdminRoute && <FloatingWhatsApp />}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
