import React, { useRef, useEffect, useState } from 'react';
import { Download, RefreshCw, Settings, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';
import { getRandomQuote, getRandomBackground } from '../data';

const ImageGenerator = () => {
  const canvasRef = useRef(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customName, setCustomName] = useState('');
  const [selectedQuoteCategory, setSelectedQuoteCategory] = useState('');
  const [selectedBackgroundCategory, setSelectedBackgroundCategory] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const generateImage = async () => {
    setIsGenerating(true);
    
    try {
      const quote = getRandomQuote(selectedQuoteCategory || null);
      const background = getRandomBackground(selectedBackgroundCategory || null);
      
      // Create canvas
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Set canvas size for WhatsApp (9:16 aspect ratio)
      canvas.width = 720;
      canvas.height = 1280;
      
      // Load background image
      const bgImage = new Image();
      bgImage.crossOrigin = 'anonymous';
      
      bgImage.onload = () => {
        // Draw background with overlay
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
        
        // Add dark overlay for better text visibility
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add gradient overlay
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(255, 165, 0, 0.2)');
        gradient.addColorStop(0.5, 'rgba(255, 140, 0, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 69, 0, 0.2)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Text styling
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        // Draw "Good Morning" text
        ctx.font = 'bold 72px "Dancing Script", cursive';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Good Morning', canvas.width / 2, 300);
        
        // Add custom name if provided
        if (customName.trim()) {
          ctx.font = 'bold 48px "Dancing Script", cursive';
          ctx.fillText(customName, canvas.width / 2, 380);
        }
        
        // Draw quote
        ctx.font = '24px "Playfair Display", serif';
        ctx.fillStyle = '#ffffff';
        
        // Word wrap for quote
        const maxWidth = canvas.width - 80;
        const words = quote.text.split(' ');
        let line = '';
        let y = 500;
        
        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;
          
          if (testWidth > maxWidth && i > 0) {
            ctx.fillText(line, canvas.width / 2, y);
            line = words[i] + ' ';
            y += 35;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, canvas.width / 2, y);
        
        // Draw author
        ctx.font = 'italic 18px "Inter", sans-serif';
        ctx.fillStyle = '#fbbf24';
        ctx.fillText(`— ${quote.author}`, canvas.width / 2, y + 50);
        
        // Add decorative elements
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
        
        // Add sparkles
        for (let i = 0; i < 5; i++) {
          const x = 100 + (i * 120);
          const yPos = 200 + (i % 2 * 50);
          ctx.font = '24px Arial';
          ctx.fillStyle = '#fbbf24';
          ctx.fillText('✨', x, yPos);
        }
        
        // Convert canvas to image
        const imageData = canvas.toDataURL('image/png');
        setGeneratedImage(imageData);
      };
      
      bgImage.src = background.url;
      
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.download = `good-morning-${new Date().toISOString().split('T')[0]}.png`;
      link.href = generatedImage;
      link.click();
    }
  };

  useEffect(() => {
    generateImage();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-morning-800 mb-4">
          Good Morning Generator
        </h1>
        <p className="text-lg text-morning-600">
          Create beautiful morning messages with motivational quotes
        </p>
      </div>

      {/* Settings Panel */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Customize Your Message
          </h2>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-morning-600 hover:text-morning-700"
          >
            {showSettings ? 'Hide' : 'Show'} Settings
          </button>
        </div>
        
        {showSettings && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name (Optional)
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Enter your name"
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quote Category
              </label>
              <select
                value={selectedQuoteCategory}
                onChange={(e) => setSelectedQuoteCategory(e.target.value)}
                className="input-field"
              >
                <option value="">Random</option>
                <option value="positivity">Positivity</option>
                <option value="gratitude">Gratitude</option>
                <option value="productivity">Productivity</option>
                <option value="motivation">Motivation</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Category
              </label>
              <select
                value={selectedBackgroundCategory}
                onChange={(e) => setSelectedBackgroundCategory(e.target.value)}
                className="input-field"
              >
                <option value="">Random</option>
                <option value="nature">Nature</option>
                <option value="flowers">Flowers</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={generateImage}
          disabled={isGenerating}
          className="btn-primary flex items-center justify-center"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate New Image
            </>
          )}
        </button>
        
        {generatedImage && (
          <button
            onClick={downloadImage}
            className="btn-secondary flex items-center justify-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Image
          </button>
        )}
      </div>

      {/* Image Preview */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
        <div className="flex justify-center">
          {generatedImage ? (
            <div className="relative">
              <img
                src={generatedImage}
                alt="Generated Good Morning message"
                className="max-w-full h-auto rounded-lg shadow-lg"
                style={{ maxHeight: '600px' }}
              />
            </div>
          ) : (
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <RefreshCw className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-spin" />
                <p className="text-gray-500">Generating your morning message...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden Canvas for Image Generation */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageGenerator; 