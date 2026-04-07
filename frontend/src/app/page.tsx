import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MenuSection from "@/components/MenuSection";
import AIWidget from "@/components/AIWidget";
import BookingTerminal from "@/components/BookingTerminal";
import SignatureDishes from "@/components/SignatureDishes";
import DynamicMenu from "@/components/DynamicMenu";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="w-full min-h-screen bg-carbon overflow-hidden flex flex-col items-center">
      <HeroSection />
      <AboutSection />
      <SignatureDishes />
      <MenuSection />
      <BookingTerminal />
      <DynamicMenu />
      <ReviewsSection />
      <AIWidget />

      <Footer />
    </main>
  );
}
