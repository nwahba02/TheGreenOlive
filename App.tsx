// Custom hook to scroll to top after navigation
import { useCallback } from 'react';

function useNavigateScroll() {
  const navigate = useNavigate();
  return useCallback((path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  }, [navigate]);
}
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Page, MenuItem, MenuType } from './types';
import { ICONS, MENU_DATA, EVENTS, GALLERY } from './constants';

/**
 * THEME PALETTE:
 * Green: #6ec471
 * Gold: #d9a74a
 * Cream: #f5f0e1
 */

// --- Sub-components ---

import { useState as useReactState } from 'react';

const HamburgerIcon = ({ open }: { open: boolean }) => (
  <div className="flex flex-col justify-center items-center w-8 h-8">
    <span className={`block h-1 w-7 bg-[#2a2a2a] rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
    <span className={`block h-1 w-7 bg-[#2a2a2a] rounded my-1 transition-all duration-300 ${open ? 'opacity-0' : ''}`}></span>
    <span className={`block h-1 w-7 bg-[#2a2a2a] rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
  </div>
);

const Navbar = () => {
  const navigateScroll = useNavigateScroll();
  const navItems: { label: string; path: string }[] = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Events', path: '/events' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];
  const [menuOpen, setMenuOpen] = useReactState(false);

  // Close menu on navigation
  const handleNav = (path: string) => {
    navigateScroll(path);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-[#d9a74a]/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-20">
        <div className="flex items-center cursor-pointer" onClick={() => handleNav('/')}> 
          <img src="/logo-2.svg" alt="The Green Olive Logo" className="h-12 mr-3 invert" />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[#2a2a2a] uppercase leading-none">THE GREEN OLIVE</span>
            <span className="text-[10px] tracking-[0.4em] text-[#d9a74a] font-bold uppercase leading-none mt-1.5 font-sans">Bar & Grill</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex space-x-10">
          {navItems.map(item => (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`text-xs font-bold tracking-widest uppercase transition-all pb-1 border-b-2 text-stone-400 border-transparent hover:text-[#6ec471]`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop Order Now */}
        <button
          onClick={() => window.open('https://tableagent.com/phoenix/the-green-olive-bar-and-grill/table-search/', '_blank')}
          className="hidden lg:block bg-[#2a2a2a] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#6ec471] transition-all shadow-xl"
        >
         Reserve Now
        </button>

        {/* Mobile/Tablet Hamburger */}
        <button
          className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full bg-[#2a2a2a]/5 hover:bg-[#d9a74a]/10 transition-all"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </div>
      {/* Mobile/Tablet Dropdown */}
      {menuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-[#d9a74a]/20 shadow-xl animate-in slide-in-from-top-4 duration-300 z-50">
          <div className="flex flex-col py-6 px-8 space-y-4">
            {navItems.map(item => (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`text-lg font-bold tracking-widest uppercase text-left transition-all pb-2 border-b-2 text-stone-400 border-transparent hover:text-[#6ec471]`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { window.open('https://tableagent.com/phoenix/the-green-olive-bar-and-grill/table-search/', '_blank'); setMenuOpen(false); }}
              className="mt-4 bg-[#2a2a2a] text-white px-8 py-4 rounded-full text-base font-bold uppercase tracking-widest hover:bg-[#6ec471] transition-all shadow-xl"
            >
              Reserve Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const navigateScroll = useNavigateScroll();
  return (
  <footer className="bg-[#1c1c1a] text-stone-500 py-20">
    <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-16">
      <div className="col-span-1 md:col-span-1">
        <h3 className="text-white text-lg font-bold mb-8 tracking-widest uppercase text-s">THE GREEN OLIVE</h3>
        <p className="text-sm leading-relaxed mb-8 font-light italic">
          Authentic Mediterranean cuisine, handcrafted pizzas, and fresh pastas served in a warm, inviting atmosphere in Litchfield Park, Arizona.
        </p>
        <div className="flex space-x-6">
          <a href="https://www.instagram.com/greenolivebarandgrill" target="_blank" rel="noopener noreferrer" className="hover:text-[#6ec471] transition-colors"><ICONS.Instagram /></a>
          <a href="mailto:thegreenolivebargrill@gmail.com" className="hover:text-[#6ec471] transition-colors"><ICONS.Mail /></a>
          <a href="tel:6023543424" className="hover:text-[#6ec471] transition-colors"><ICONS.Phone /></a>
          <a href="https://www.yelp.com/biz/the-green-olive-litchfield-park-2" target="_blank" rel="noopener noreferrer" className="hover:text-[#6ec471] transition-colors"><ICONS.Yelp /></a>
        </div>
      </div>
      <div>
        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-s">Location</h4>
        <p className="text-sm mb-3">4860 N Litchfield Rd #103-104</p>
        <p className="text-sm mb-3">Litchfield Park</p>
        <p className="text-sm">AZ 85340</p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-s">Hours</h4>
        <p className="text-sm">Mon - Sun: 10am - 9pm</p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-s">Connect</h4>
        <div className="flex items-center mb-4 space-x-3">
          <ICONS.Phone />
          <span className="text-sm font-medium">(602) 354-3424</span>
        </div>
        <div className="flex items-center space-x-3">
          <ICONS.Mail />
          <span className="text-sm font-medium">thegreenolivebargrill@gmail.com</span>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-20 pt-10 border-t border-stone-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-[10px] uppercase tracking-widest font-medium opacity-60">
        &copy; {new Date().getFullYear()} The Green Olive Bar and Grill.
      </div>
      <div className="flex space-x-10 text-[10px] font-bold uppercase tracking-widest">
        <button onClick={() => navigateScroll('/privacy')} className="hover:text-white transition-colors">Privacy</button>
        <button onClick={() => navigateScroll('/terms')} className="hover:text-white transition-colors">Terms</button>
        <button onClick={() => navigateScroll('/accessibility')} className="hover:text-white transition-colors">Accessibility</button>
      </div>
    </div>
  </footer>
  );
};


import { useState as useLocalState } from 'react';
import ReactMarkdown from 'react-markdown';
import privacyContent from './privacy-policy.md?raw';
import termsContent from './terms-of-service.md?raw';
import accessibilityContent from './accessibility.md?raw';

// --- Pages ---
const PrivacyPage = () => (
  <div className="pt-40 pb-32 px-6 max-w-4xl mx-auto animate-in fade-in prose prose-stone max-w-none">
    <ReactMarkdown>{privacyContent}</ReactMarkdown>
  </div>
);

const TermsPage = () => (
  <div className="pt-40 pb-32 px-6 max-w-4xl mx-auto animate-in fade-in prose prose-stone max-w-none">
    <ReactMarkdown>{termsContent}</ReactMarkdown>
  </div>
);

const AccessibilityPage = () => (
  <div className="pt-40 pb-32 px-6 max-w-4xl mx-auto animate-in fade-in prose prose-stone max-w-none">
    <ReactMarkdown>{accessibilityContent}</ReactMarkdown>
  </div>
);



const HomePage = ({ setActiveMenuType }: { setActiveMenuType: (t: MenuType) => void }) => {
  const navigateScroll = useNavigateScroll();
  const featuredItems = [
    MENU_DATA.find(item => item.name === 'Mixed Grill Plate'),
    MENU_DATA.find(item => item.name === 'Pappardelle'),
    MENU_DATA.find(item => item.name === 'Chicken Breast Special')
  ].filter(Boolean);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105 animate-pulse-slow">
          <img 
            src="/home.jpg" 
            alt="The Green Olive Restaurant Atmosphere" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <span className="text-[#d9a74a] font-bold uppercase tracking-[0.5em] text-xs mb-6 block animate-in slide-in-from-top-4 duration-1000">Feeling Hungry?</span>
          <h1 className="text-6xl md:text-9xl text-white font-bold mb-8 leading-none tracking-tighter uppercase animate-in slide-in-from-bottom-4 duration-1000">
            The Green Olive <br/><span className="text-[#6ec471] font-sans uppercase font-bold text-3xl md:text-5xl tracking-[0.2em] mt-4 block">Bar and Grill</span>
          </h1>
          <p className="text-stone-200 text-lg md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed font-light italic font-serif opacity-90">
           Fresh Mediterranean flavors served with Arizona warmth in the heart of Litchfield.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button 
              onClick={() => navigateScroll('/menu')}
              className="w-full sm:w-auto px-12 py-5 bg-[#6ec471] text-white font-bold rounded-full hover:bg-white hover:text-[#2a2a2a] transition-all shadow-2xl uppercase tracking-widest text-xs"
            >
              Explore Menus
            </button>
            <button 
               onClick={() => window.open('https://www.clover.com/online-ordering/the-green-olive-bar-and-litchfield-park', '_blank')}
               className="w-full sm:w-auto px-12 py-5 border border-white/30 text-white font-bold rounded-full hover:bg-white hover:text-[#2a2a2a] transition-all shadow-2xl uppercase tracking-widest text-xs"
            >
              Order Now
            </button>
          </div>
        </div>
      </section>

      {/* Welcome Section - Mediterranean Food */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 border border-[#d9a74a]/20 rounded-[40px] -z-10"></div>
            <img 
              src="/backround.jpg" 
              alt="Mediterranean Food at The Green Olive Bar and Grill in Litchfield Park Arizona" 
              className="rounded-[40px] shadow-2xl h-[650px] w-full object-cover" 
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-[#d9a74a] font-black uppercase tracking-[0.3em] text-[14px] mb-6 block">Mediterranean Food</span>
            <h2 className="text-5xl md:text-7xl mb-10 leading-[1.1] font-bold text-[#2a2a2a] uppercase tracking-tighter">Welcome to The Green Olive.</h2>
            <p className="text-stone-600 mb-6 leading-relaxed text-lg font-light">
              Tucked in the heart of Litchfield Park, Arizona, The Green Olive Bar and Grill welcomes every guest with a warm, inviting atmosphere where flavorful cuisine and friendly company naturally come together.
            </p>
            <p className="text-stone-600 mb-6 leading-relaxed text-lg font-light">
              Our menu highlights Mediterranean specialties, freshly prepared pastas, and handcrafted pizzas that appeal to many tastes. The Green Olive has quickly become a local favorite for families, friends, and food lovers alike.
            </p>
            <p className="text-stone-500 mb-12 leading-relaxed text-lg italic serif">
              "Every visit promises a memorable dining experience filled with comfort, flavor, and connection."
            </p>
            <button 
              onClick={() => navigateScroll('/about')}
              className="group flex items-center space-x-4 text-[#6ec471] font-bold uppercase tracking-widest text-s hover:translate-x-2 transition-transform"
            >
              <span>Our Story</span>
              <div className="w-12 h-[1px] bg-[#d9a74a] group-hover:w-16 transition-all"></div>
              <ICONS.ArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Mediterranean Specialties Section */}
      <section className="py-32 bg-[#f5f0e1]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div className="max-w-3xl">
              <span className="text-[#6ec471] font-black uppercase tracking-[0.3em] text-[14px] mb-6 block">Authentic Flavors</span>
              <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-[#2a2a2a]">Most Popular Dishes</h2>
            </div>
            <button onClick={() => navigateScroll('/menu')} className="text-stone-400 font-bold uppercase tracking-[0.2em] text-[14px] hover:text-[#6ec471] transition-colors mb-2">View Full Menu —</button>
          </div>
          <p className="text-stone-600 mb-16 leading-relaxed text-lg font-light max-w-4xl">
            At The Green Olive Bar and Grill, every dish begins with passion for authentic flavors and true quality. Our Mediterranean offerings showcase vibrant ingredients, including fresh herbs, savory spices, rich olive oil, and tender cuts of meat. The menu features classics like gyros, hummus, and falafel alongside flavorful kebabs and perfectly grilled seafood.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredItems.map((item, idx) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="h-[450px] rounded-[30px] overflow-hidden mb-8 relative">
                  <img
                    src={item.image ? item.image : `https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800&sig=${idx}`}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    style={
                      item.name === 'Chicken Breast Special'
                        ? { objectPosition: '80% center' }
                        : item.name === 'Mixed Grill Plate'
                        ? { objectPosition: '35% center' }
                        : undefined
                    }
                  />
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#d9a74a]">{item.price}</span>
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-[#2a2a2a] mb-3">{item.name}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed font-light line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-stone-500 mt-12 leading-relaxed text-base font-light italic text-center max-w-3xl mx-auto">
            Our Mediterranean plates transport your taste buds directly to the sun-kissed shores of the Mediterranean Sea. Each bite is carefully crafted to balance tradition with a modern twist.
          </p>
        </div>
      </section>

      {/* Legacy of Celebration Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-5">
              <span className="text-[#d9a74a] font-black uppercase tracking-[0.3em] text-[14px] mb-6 block">Atmosphere</span>
              <h2 className="text-5xl md:text-7xl mb-10 leading-tight font-bold text-[#2a2a2a] uppercase tracking-tighter">Your Event, Elevated.</h2>
              <p className="text-stone-600 mb-12 leading-relaxed text-xl font-light">
                From high-energy galas to intimate, candlelight engagements, we transform our space to mirror the soul of your celebration.
              </p>
              <button 
                onClick={() => navigateScroll('/events')}
                className="px-12 py-5 bg-[#2a2a2a] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#6ec471] transition-all shadow-xl"
              >
                Events 2026
              </button>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="relative group rounded-[40px] overflow-hidden h-[400px] shadow-2xl">
                  <video 
                    src="/Turkish%20Night.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    controls
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="relative group rounded-[40px] overflow-hidden h-[300px] shadow-2xl">
                  <img src="/24107ECD-0AA8-4FCD-B4CB-7B7AE18B5A57.JPEG" alt="Events at The Green Olive Bar and Grill" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-6 pt-16">
                <div className="relative group rounded-[40px] overflow-hidden h-[300px] shadow-2xl">
                  <img src="/2EEE2E2B-F367-4525-8CA4-BB25F2B3E760.JPEG" alt="Private Events in Litchfield Park Arizona" className="w-full h-full object-cover" />
                </div>
                <div className="relative group rounded-[40px] overflow-hidden h-[400px] shadow-2xl">
                  <img src="/4488A75E-D8FA-4D3F-88D4-B2CD607FEFC5.JPEG" alt="Celebrations at The Green Olive" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pizza & Pasta Section */}
      <section className="py-32 bg-[#f5f0e1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-10 bg-[#6ec471]/5 rounded-full blur-3xl -z-10"></div>
            <img 
              src="/pasta.jpg" 
              alt="Handcrafted Pizza at The Green Olive Bar and Grill Litchfield Park" 
              className="rounded-[60px] shadow-2xl w-full h-[420px] object-cover relative z-10"
              style={{ objectPosition: '60% center' }}
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-[#6ec471] font-black uppercase tracking-[0.3em] text-[14px] mb-6 block">Italian-Inspired Comfort</span>
            <h2 className="text-5xl md:text-7xl mb-10 leading-tight font-bold text-[#2a2a2a] uppercase tracking-tighter">Pasta & Pizza.</h2>
            <p className="text-stone-600 mb-6 leading-relaxed text-lg font-light">
              No visit feels complete without enjoying one of our signature pizzas. Each pizza is hand-tossed, topped with premium cheeses, savory meats, and farm-fresh vegetables, then baked to golden perfection.
            </p>
            <p className="text-stone-600 mb-6 leading-relaxed text-lg font-light">
              Whether you crave a classic Margherita or a bold Mediterranean-inspired creation, our pizzas satisfy every palate. With crusts crispy outside yet soft and chewy inside, every bite becomes a delightful experience.
            </p>
            <p className="text-stone-500 mb-12 leading-relaxed text-base font-light italic serif">
              For those who crave Italian-inspired comfort, our hearty pastas feature creamy Alfredo, rich marinara, or light olive oil and garlic sauce—crafted with fresh ingredients and bold flavors.
            </p>
            <button 
              onClick={() => navigateScroll('/menu')}
              className="px-12 py-5 bg-[#2a2a2a] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#d9a74a] transition-all shadow-xl"
            >
              View Full Menu
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const MenuSection = ({ title, items, image }: { title: string, items: MenuItem[], image?: string }) => (
  <div className="mb-24">
    <div className="flex flex-col md:flex-row gap-8 mb-12">
      {image && (
        <div className="w-full md:w-72 h-48 rounded-[30px] overflow-hidden shadow-xl flex-shrink-0">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex-1">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#2a2a2a] uppercase tracking-tighter">
          {title}
        </h2>
        <div className="w-24 h-1 bg-[#d9a74a] rounded-full"></div>
        {title === 'Platters' && items[0]?.menuType === 'Lunch/Dinner' && (
          <p className="text-stone-400 italic text-sm mt-6 font-light">
            Platters served with choice of 2 sides: rice, salad or fries. Served with warm pita bread.
          </p>
        )}
        {title === 'Mediterranean Feast' && (
          <div className="mt-4">
            <p className="text-[#2a2a2a] text-base font-semibold">Includes Pita bread and our famous green jalapeno sauce</p>
            <p className="text-stone-500 text-sm font-light italic">min. 10 people</p>
          </div>
        )}
        {title === 'Party Trays To Go' && (
          <div className="mt-4">
            <p className="text-[#2a2a2a] text-base font-semibold">Feeds 10-12</p>
          </div>
        )}
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-12">
      {items.map((item, idx) => (
        <div key={item.id} className="group pb-6 border-b-2 border-[#b0b0b0] last:border-b-0">
          <div className="flex justify-between items-baseline mb-2">
            <h3 className="text-lg font-bold text-[#2a2a2a] uppercase tracking-tight group-hover:text-[#6ec471] transition-colors">{item.name}</h3>
            <div className="flex-1 mx-4 border-b border-dotted border-[#d9a74a]/20 opacity-50"></div>
            <span className="text-lg font-bold text-[#d9a74a]">{item.price}</span>
          </div>
          {item.description && (
            <p className="text-stone-500 text-sm leading-relaxed max-w-[95%] font-light italic">{item.description}</p>
          )}
          {item.name === 'Panini Tray' && (
            <p className="text-[#2a2a2a] text-xs font-semibold mt-2">*Comes With Garlic Bread</p>
          )}
          {item.popular && (
            <span className="inline-block mt-3 text-[8px] uppercase tracking-[0.2em] font-black text-[#6ec471] bg-[#6ec471]/10 px-3 py-1 rounded-full">House Selection</span>
          )}
        </div>
      ))}
    </div>
  </div>
);

const MenuPage = ({ activeMenuType, setActiveMenuType }: { activeMenuType: MenuType, setActiveMenuType: (t: MenuType) => void }) => {
  const menuTypes: MenuType[] = ['Brunch', 'Lunch/Dinner', 'Drinks', 'Catering'];

  // Explicit ordering for sections
  const brunchSectionOrder = ['Breakfast', 'Wraps', 'Paninis', 'House Dip', 'Extra Sauces', 'Sides', 'Coffee', 'Mimosas'];
  const lunchDinnerSectionOrder = ['Starters', 'Salads', 'Platters', 'Pizza', 'Pastas', 'Kids Menu', 'Desserts'];
  const drinksSectionOrder = ['Cocktails', 'Wine List (Sparkling)', 'Wine List (White)', 'Wine List (Pink)', 'Wine List (Red)', 'Wine List (Red Blend)', 'Draft Beer', 'Bottle Beer'];
  const cateringSectionOrder = ['Mediterranean Feast', 'Protein Choice', 'Side Choice', 'Salad Choice', 'Party Trays To Go'];
  const itemsInActiveMenu = MENU_DATA.filter(item => item.menuType === activeMenuType);
  
  let sections: string[] = [];
  if (activeMenuType === 'Brunch') sections = brunchSectionOrder;
  else if (activeMenuType === 'Lunch/Dinner') sections = lunchDinnerSectionOrder;
  else if (activeMenuType === 'Drinks') sections = drinksSectionOrder;
  else if (activeMenuType === 'Catering') sections = cateringSectionOrder;

  const validSections = sections.filter(s => itemsInActiveMenu.some(item => item.section === s));

  // Hero images for each menu type
  const heroImages: Record<string, string> = {
    'Brunch': '/craigrootimaging_GO-317-scaled.jpg',
    'Lunch/Dinner': '/craigrootimaging_GO-254-scaled.jpg',
    'Drinks': '/craigrootimaging_GO-415-scaled.jpg',
    'Catering': '/2.jpg',
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Banner */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImages[activeMenuType]} 
            alt={`${activeMenuType} Menu`} 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <span className="text-[#d9a74a] font-black uppercase tracking-[0.4em] text-[14px] mb-6 block">The Collection</span>
          <h1 className="text-6xl md:text-9xl mb-6 tracking-tighter uppercase font-bold text-white">Our Menu</h1>
          <p className="text-stone-200 max-w-2xl mx-auto leading-relaxed text-xl italic font-serif font-light">
            A curated selection of Mediterranean flavors crafted with passion.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        {/* Menu Type Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-20 bg-white rounded-full shadow-2xl p-4 max-w-fit mx-auto">
          {menuTypes.map(type => (activeMenuType === type ? 
            <button key={type} className="px-10 py-4 rounded-full text-[14px] font-black uppercase tracking-[0.2em] bg-[#6ec471] text-white shadow-lg transition-all">{type}</button> :
            <button key={type} onClick={() => setActiveMenuType(type)} className="px-10 py-4 rounded-full text-[12px] font-black uppercase tracking-[0.2em] text-stone-400 hover:text-[#6ec471] transition-all">{type}</button>
          ))}
        </div>

        {/* Menu Sections */}
        <div className="animate-in slide-in-from-bottom-8 duration-700 pb-32">
          {validSections.map(section => (
            <MenuSection 
              /*key={section}*/ 
              title={section} 
              items={itemsInActiveMenu.filter(item => item.section === section)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const GalleryPage = () => (
  <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto animate-in fade-in">
    <div className="text-center mb-24">
      <span className="text-[#d9a74a] font-black uppercase tracking-[0.4em] text-[14px] mb-6 block">Visual Gallery</span>
      <h1 className="text-6xl md:text-9xl mb-8 tracking-tighter uppercase font-bold text-[#2a2a2a]">Our Gallery</h1>
      <p className="text-stone-500 italic font-serif text-xl font-light">A visual journey through the soul of The Green Olive.</p>
    </div>
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
      {GALLERY.filter(img => img.url.startsWith('/gal/')).map(img => (
        <div key={img.id} className="relative group overflow-hidden rounded-[40px] border border-[#d9a74a]/10 shadow-xl">
          <img src={img.url} alt="Gallery photo" className="w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        </div>
      ))}
    </div>
  </div>
);

function EventsPage() {
  const navigateScroll = useNavigateScroll();
  return (
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto animate-in fade-in">
      <div className="text-center mb-24">
        <span className="text-[#6ec471] font-black uppercase tracking-[0.4em] text-[14px] mb-6 block">The Calendar</span>
        <h1 className="text-6xl md:text-9xl mb-8 tracking-tighter uppercase font-bold text-[#2a2a2a]">Our Events</h1>
        <p className="text-stone-500 italic font-serif text-xl font-light">Join us for a curated series of Mediterranean-inspired gatherings.</p>
      </div>
      <div className="space-y-16">
        {EVENTS.map(event => (
          <div key={event.id} className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[60px] overflow-hidden shadow-2xl border border-[#d9a74a]/5">
            <div className="h-[500px] lg:h-full">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
            </div>
            <div className="p-16 flex flex-col justify-center bg-[#f5f0e1]/10">
              <span className="text-[#d9a74a] font-black text-[12px] tracking-[0.3em] uppercase mb-6">{event.date}</span>
              <h2 className="text-5xl mb-8 font-bold uppercase tracking-tighter text-[#2a2a2a]">{event.title}</h2>
              <p className="text-stone-600 mb-10 leading-relaxed text-xl font-light">{event.description}</p>
              <button 
                onClick={() => navigateScroll('/contact')}
                className="bg-[#6ec471] text-white px-12 py-5 rounded-full font-bold w-fit hover:bg-[#2a2a2a] transition-all shadow-xl uppercase tracking-widest text-xs">
                Request Invitation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const AboutPage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="animate-in fade-in">
    {/* Hero Section */}
    <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/backround.jpg" 
          alt="The Green Olive Bar and Grill" 
          className="w-full h-full object-cover brightness-[0.4]"
        />
      </div>
      <div className="relative z-10 text-center px-6">
        <span className="text-[#d9a74a] font-black uppercase tracking-[0.4em] text-[14px] mb-6 block">Our Story</span>
        <h1 className="text-6xl md:text-9xl tracking-tighter uppercase font-bold text-white">Who We Are</h1>
      </div>
    </section>

    {/* Who We Are Section */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-[#6ec471] font-black uppercase tracking-[0.3em] text-[14px] mb-6 block">About Us</span>
            <h2 className="text-4xl md:text-6xl mb-10 tracking-tighter uppercase font-bold text-[#2a2a2a]">Passionate About <span className="text-[#6ec471]">Flavor</span></h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-6 font-light">
              At The Green Olive Bar and Grill, we're passionate about sharing the vibrant, bold flavors of Mediterranean cuisine with our community. From fresh prepared hummus drizzled in olive oil to our famous green jalapeño sauce, every dish is crafted with love and authenticity.
            </p>
            <p className="text-stone-600 text-lg leading-relaxed mb-8 font-light">
              We're not just a restaurant — we're an experience. Whether you're dining in or planning a large event, our team is here to serve you with fresh ingredients, rich cultural traditions, and exceptional hospitality.
            </p>
          </div>
          <div className="relative rounded-[40px] overflow-hidden shadow-2xl">
            <img src="/craigrootimaging_GO-233-scaled.jpg" alt="Restaurant Interior" className="w-full h-[500px] object-cover" />
          </div>
        </div>
      </div>
    </section>

    {/* What We Offer Section */}
    <section className="py-24 bg-[#f5f0e1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-[#d9a74a] font-black uppercase tracking-[0.3em] text-[14x] mb-6 block">What We Offer</span>
          <h2 className="text-4xl md:text-6xl tracking-tighter uppercase font-bold text-[#2a2a2a]">More Than a Meal</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-10 rounded-[30px] shadow-xl text-center hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-[#6ec471] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl font-bold">01</span>
            </div>
            <h3 className="text-lg font-bold uppercase tracking-tight text-[#2a2a2a] mb-4">Full-Service Catering</h3>
            <p className="text-stone-500 text-sm leading-relaxed font-light">Weddings, private dinners, and large events — we do it all with excellence.</p>
          </div>
          <div className="bg-white p-10 rounded-[30px] shadow-xl text-center hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-[#d9a74a] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl font-bold">02</span>
            </div>
            <h3 className="text-lg font-bold uppercase tracking-tight text-[#2a2a2a] mb-4">Fusion Cuisine</h3>
            <p className="text-stone-500 text-sm leading-relaxed font-light">Mediterranean flavors tailored to your preferences and dietary needs.</p>
          </div>
          <div className="bg-white p-10 rounded-[30px] shadow-xl text-center hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-[#6ec471] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl font-bold">03</span>
            </div>
            <h3 className="text-lg font-bold uppercase tracking-tight text-[#2a2a2a] mb-4">Live Music Nights</h3>
            <p className="text-stone-500 text-sm leading-relaxed font-light">Join us for great tunes and good vibes — a unique dining experience!</p>
          </div>
          <div className="bg-white p-10 rounded-[30px] shadow-xl text-center hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-[#d9a74a] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl font-bold">04</span>
            </div>
            <h3 className="text-lg font-bold uppercase tracking-tight text-[#2a2a2a] mb-4">Wine Tasting Events</h3>
            <p className="text-stone-500 text-sm leading-relaxed font-light">Seasonal wine tasting experiences — save the date for our next event!</p>
          </div>
        </div>
      </div>
    </section>

    {/* Events & Catering Section */}
    <section className="py-24 bg-[#1c1c1a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative rounded-[40px] overflow-hidden shadow-2xl">
            <img src="/craigrootimaging_GO-388-scaled.jpg" alt="Event Catering" className="w-full h-[500px] object-cover" />
          </div>
          <div>
            <span className="text-[#d9a74a] font-black uppercase tracking-[0.3em] text-[14px] mb-6 block">Events & Catering</span>
            <h2 className="text-4xl md:text-6xl mb-10 tracking-tighter uppercase font-bold text-white">Make It <span className="text-[#6ec471]">Unforgettable</span></h2>
            <p className="text-stone-300 text-lg leading-relaxed mb-8 font-light">
              Let us help make your next event unforgettable. We cater events of all sizes — from intimate gatherings to grand weddings. Our expert team works with you to design the perfect menu that blends tradition, flavor, and celebration.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-[20px] p-8 mb-8">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Reserve Your Date Today</h3>
              <div className="space-y-3">
                <a href="tel:6023543424" className="flex items-center space-x-3 text-[#d9a74a] hover:text-[#6ec471] transition-colors">
                  <span className="text-xl">📞</span>
                  <span className="text-lg font-medium">(602) 354-3424</span>
                </a>
                <a href="tel:3237052736" className="flex items-center space-x-3 text-[#d9a74a] hover:text-[#6ec471] transition-colors">
                  <span className="text-xl">📞</span>
                  <span className="text-lg font-medium">(323) 705-2736</span>
                </a>
              </div>
            </div>
            <button 
              onClick={() => setPage('contact')}
              className="px-12 py-5 bg-[#6ec471] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#d9a74a] transition-all shadow-xl"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Customer Testimonial */}
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <span className="text-[#6ec471] font-black uppercase tracking-[0.3em] text-[14px] mb-6 block">Customer Love</span>
        <h2 className="text-3xl md:text-5xl mb-12 tracking-tighter uppercase font-bold text-[#2a2a2a]">What Our Guests Say</h2>
        <div className="bg-[#f5f0e1] rounded-[40px] p-12 shadow-xl relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-6xl text-[#d9a74a]">"</div>
          <p className="text-stone-600 text-xl leading-relaxed italic font-light mb-8">
            New Mediterranean restaurant and they are great! Julianna provided excellent service and the food was amazing! We had the spicy potatoes and dip trio to start. The pita bread was so soft and fresh! We ordered the gyro, beef kabobs, and a pizza and would definitely order them again. Great atmosphere and beautiful decor. Highly recommend!
          </p>
          <div className="flex items-center justify-center space-x-1">
            {[1,2,3,4,5].map(star => (
              <span key={star} className="text-2xl text-[#d9a74a]">★</span>
            ))}
          </div>
          <p className="text-stone-400 font-bold uppercase tracking-widest text-xs mt-4">— Happy Guest</p>
        </div>
      </div>
    </section>
  </div>
);

const ContactPage = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
      alert('Thank you for your message! We will get back to you soon.');
    }, 2000);
  };

  return (
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto animate-in fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
        <div>
          <span className="text-[#6ec471] font-black uppercase tracking-[0.4em] text-[14px] mb-8 block">Get In Touch</span>
          <h1 className="text-6xl md:text-9xl mb-12 tracking-tighter uppercase font-bold text-[#2a2a2a]">Contact</h1>
          <p className="text-stone-700 mb-16 text-xl font-light">
            Have a question or want to learn more? Send us a message and we'll get back to you as soon as possible.
          </p>
          <div className="space-y-12">
            <div className="flex items-start space-x-8">
              <div className="bg-[#6ec471] p-5 rounded-[20px] text-white shadow-lg">
                <ICONS.MapPin />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2 uppercase tracking-tight text-[#2a2a2a]">Visit Us</h4>
                <p className="text-stone-500 font-light">Litchfield Park, Arizona</p>
              </div>
            </div>
            <div className="flex items-start space-x-8">
              <div className="bg-[#d9a74a] p-5 rounded-[20px] text-white shadow-lg">
                <ICONS.Phone />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2 uppercase tracking-tight text-[#2a2a2a]">Call Us</h4>
                <p className="text-stone-500 font-light">(602) 354-3424</p>
                <p className="text-stone-500 font-light">(323) 705-2736</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-12 md:p-16 rounded-[60px] shadow-2xl border border-[#d9a74a]/10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-[12px] font-black uppercase tracking-[0.3em] text-stone-400 mb-4">Your Name</label>
              <input required value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} className="w-full bg-[#f5f0e1]/20 border-b border-[#d9a74a]/20 py-4 focus:outline-none focus:border-[#6ec471] transition-all text-sm font-medium" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-[12px] font-black uppercase tracking-[0.3em] text-stone-400 mb-4">Email Address</label>
              <input required type="email" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} className="w-full bg-[#f5f0e1]/20 border-b border-[#d9a74a]/20 py-4 focus:outline-none focus:border-[#6ec471] transition-all text-sm font-medium" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-[12px] font-black uppercase tracking-[0.3em] text-stone-400 mb-4">Your Message</label>
              <textarea required value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} rows={5} className="w-full bg-[#f5f0e1]/20 border-b border-[#d9a74a]/20 py-4 focus:outline-none focus:border-[#6ec471] transition-all text-sm font-medium resize-none" placeholder="How can we help you?" />
            </div>
            <button disabled={submitted} className="w-full bg-[#2a2a2a] text-white py-6 rounded-[30px] font-bold hover:bg-[#6ec471] transition-all disabled:opacity-50 shadow-2xl uppercase tracking-[0.4em] text-[10px]">
              {submitted ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeMenuType, setActiveMenuType] = useState<MenuType>('Lunch/Dinner');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen flex flex-col selection:bg-[#6ec471] selection:text-white bg-[#f5f0e1]">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage setPage={() => {}} setActiveMenuType={setActiveMenuType} />} />
          <Route path="/menu" element={<MenuPage activeMenuType={activeMenuType} setActiveMenuType={setActiveMenuType} />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
