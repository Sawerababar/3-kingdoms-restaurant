import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CraftVideoStage } from './components/CraftVideoStage';
import { MenuSection } from './components/MenuSection';
import { InstagramWall } from './components/InstagramWall';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { ReservationModal } from './components/ReservationModal';
import { DeliveryPartnerModal } from './components/DeliveryPartnerModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { MenuItem, CartItem, SpiceLevel } from './types';
import { CULINARY_REELS } from './data/restaurantData';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function MainApp() {
  const { mode } = useTheme();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState('UberEats');

  const handleOpenDeliveryModal = (partner?: string) => {
    if (partner) setSelectedPartner(partner);
    setDeliveryModalOpen(true);
  };

  // Add to Cart handler
  const handleAddToCart = (item: MenuItem, selectedSpice?: SpiceLevel) => {
    const spice = selectedSpice !== undefined ? selectedSpice : item.spiceLevel;
    
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (ci) => ci.item.id === item.id && ci.selectedSpice === spice
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prev, { item, quantity: 1, selectedSpice: spice }];
      }
    });

    // Automatically open order bag drawer
    setCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const isNight = mode === 'night';

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-red-600 selection:text-white ${
      isNight ? 'bg-[#0a0a0a] text-stone-100' : 'bg-[#FAF8F5] text-stone-900'
    }`}>
      {/* Header Bar */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        onOpenReservation={() => setReservationOpen(true)}
        onOpenDeliveryModal={handleOpenDeliveryModal}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Banner with Dish Carousel */}
        <Hero
          onAddToCart={handleAddToCart}
          onOpenReservation={() => setReservationOpen(true)}
          onOpenReelModal={() => {}}
        />

        {/* Master Chef Craft Video & Recipe Process Stage */}
        <CraftVideoStage onAddToCart={handleAddToCart} />

        {/* Full Categorized Interactive Menu */}
        <MenuSection onAddToCart={handleAddToCart} />

        {/* Instagram Wall */}
        <InstagramWall />

        {/* Verified Google Reviews */}
        <ReviewsSection />

        {/* Location & Opening Hours */}
        <LocationSection onOpenDeliveryModal={handleOpenDeliveryModal} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Reservation Table Modal */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />

      {/* Delivery Partner Login/Signup Portal Modal */}
      <DeliveryPartnerModal
        isOpen={deliveryModalOpen}
        onClose={() => setDeliveryModalOpen(false)}
        initialPartner={selectedPartner}
      />

      {/* Cart & Order Checkout Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

