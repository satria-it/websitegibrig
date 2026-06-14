import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/sections/Hero';
import ArtistSection from '../components/sections/Artist';
import Packages from '../components/sections/Packages';
import Gallery from '../components/sections/Gallery';
import Testimonials from '../components/sections/Testimonials';
import Booking from '../components/sections/Booking';

const Home = () => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main>
        <Hero />
        <ArtistSection />
        <Packages />
        <Gallery />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
