import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Features from '@/components/Features/Features';
import Gallery from '@/components/Gallery/Gallery';
import About from '@/components/About/About';
import Experience from '@/components/Experience/Experience';
import Services from '@/components/Services/Services';
import Testimonials from '@/components/Testimonials/Testimonials';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';
import MouseGlow from '@/components/MouseGlow/MouseGlow';

export default function Home() {
  return (
    <>
      <MouseGlow />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Gallery />
        <About />
        <Experience />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
