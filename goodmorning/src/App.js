import React from 'react';
import Header from './components/Header';
import ImageGenerator from './components/ImageGenerator';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-morning-50 to-morning-100">
      <Header />
      <main>
        <ImageGenerator />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App; 