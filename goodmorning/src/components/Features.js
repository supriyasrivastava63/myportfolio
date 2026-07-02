import React from 'react';
import { Image, Download, Sparkles, Heart, Smartphone, Palette } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Beautiful Designs",
      description: "Generate stunning Good Morning images with elegant typography and beautiful backgrounds."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Motivational Quotes",
      description: "Curated collection of positive, gratitude, productivity, and motivational quotes."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Customizable",
      description: "Add your name, choose quote categories, and select background themes."
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Easy Download",
      description: "Download high-quality PNG images optimized for WhatsApp sharing."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Optimized",
      description: "Perfect 9:16 aspect ratio designed specifically for mobile sharing."
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: "High Quality",
      description: "720x1280 resolution with beautiful gradients and text effects."
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our Generator?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create beautiful, personalized morning messages that will brighten anyone's day
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-morning-500 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features; 