import { HeroSection } from '../components/HeroSection';
import { FeaturedWork } from '../components/FeaturedWork';
import { ContactSection } from '../components/ContactSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Floating Brand Mark - Server rendered - Responsive */}
      <div className="fixed top-4 left-4 md:top-8 md:left-8 z-50">
        <div className="text-lg md:text-2xl font-extralight tracking-widest">
          <span className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">
            ROSHAN
          </span>
        </div>
      </div>

      {/* Static Floating Organic Elements - Server rendered - Responsive */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large screens */}
        <div className="hidden lg:block absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-50/40 to-purple-50/30 rounded-full blur-3xl top-[5%] right-[8%]" />
        <div className="hidden lg:block absolute w-[450px] h-[450px] bg-gradient-to-r from-pink-50/20 to-orange-50/25 rounded-full blur-3xl bottom-[15%] left-[2%]" />
        <div className="hidden lg:block absolute w-[350px] h-[350px] bg-gradient-to-r from-green-50/30 to-cyan-50/20 rounded-full blur-3xl top-[55%] right-[25%]" />
        <div className="hidden lg:block absolute w-[280px] h-[280px] bg-gradient-to-r from-violet-50/25 to-indigo-50/20 rounded-full blur-3xl top-[25%] left-[15%]" />
        
        {/* Medium screens */}
        <div className="hidden md:block lg:hidden absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-50/40 to-purple-50/30 rounded-full blur-3xl top-[8%] right-[5%]" />
        <div className="hidden md:block lg:hidden absolute w-[300px] h-[300px] bg-gradient-to-r from-pink-50/20 to-orange-50/25 rounded-full blur-3xl bottom-[20%] left-[5%]" />
        <div className="hidden md:block lg:hidden absolute w-[250px] h-[250px] bg-gradient-to-r from-green-50/30 to-cyan-50/20 rounded-full blur-3xl top-[60%] right-[15%]" />
        
        {/* Small screens */}
        <div className="md:hidden absolute w-[250px] h-[250px] bg-gradient-to-r from-blue-50/30 to-purple-50/20 rounded-full blur-3xl top-[10%] right-[0%]" />
        <div className="md:hidden absolute w-[200px] h-[200px] bg-gradient-to-r from-pink-50/15 to-orange-50/20 rounded-full blur-3xl bottom-[25%] left-[0%]" />
        <div className="md:hidden absolute w-[180px] h-[180px] bg-gradient-to-r from-green-50/25 to-cyan-50/15 rounded-full blur-3xl top-[65%] right-[10%]" />
      </div>

      {/* Static Side Artistic Elements - Server rendered - Responsive */}
      <div className="hidden md:flex fixed left-4 md:left-8 top-1/2 transform -translate-y-1/2">
        <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
      </div>
      
      <div className="hidden md:flex fixed right-4 md:right-8 top-1/3">
        <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
      </div>

      {/* Bottom Artistic Element - Server rendered - Responsive */}
      <div className="hidden sm:flex fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-1 h-12 md:h-16 bg-gradient-to-t from-transparent via-gray-300 to-transparent" />
      </div>

      {/* Client Components */}
      <HeroSection />
      <FeaturedWork />
      <ContactSection />
    </div>
  );
}