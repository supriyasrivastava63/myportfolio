export const quotes = {
  positivity: [
    {
      text: "Every morning is a new beginning. Take a deep breath and start again.",
      author: "Anonymous"
    },
    {
      text: "The sun is a daily reminder that we too can rise again from the darkness, that we too can shine our own light.",
      author: "S. Ajna"
    },
    {
      text: "Good morning! May your day be filled with positive thoughts and beautiful moments.",
      author: "Anonymous"
    },
    {
      text: "Wake up with determination. Go to bed with satisfaction.",
      author: "Anonymous"
    },
    {
      text: "Today is a new day with new opportunities. Make it count!",
      author: "Anonymous"
    },
    {
      text: "The morning is the most important part of the day. It sets the tone for everything that follows.",
      author: "Anonymous"
    },
    {
      text: "Every sunrise is a new chapter in your life. Write a good one.",
      author: "Anonymous"
    },
    {
      text: "Good morning! May your coffee be strong and your Monday be short.",
      author: "Anonymous"
    }
  ],
  gratitude: [
    {
      text: "Gratitude turns what we have into enough.",
      author: "Anonymous"
    },
    {
      text: "When you arise in the morning, think of what a precious privilege it is to be alive - to breathe, to think, to enjoy, to love.",
      author: "Marcus Aurelius"
    },
    {
      text: "Thank you for this new day. Thank you for this new chance to live and love.",
      author: "Anonymous"
    },
    {
      text: "The more grateful I am, the more beauty I see.",
      author: "Mary Davis"
    },
    {
      text: "Gratitude is the fairest blossom which springs from the soul.",
      author: "Henry Ward Beecher"
    }
  ],
  productivity: [
    {
      text: "The early bird catches the worm. Rise and shine!",
      author: "Anonymous"
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill"
    },
    {
      text: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson"
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs"
    },
    {
      text: "Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort.",
      author: "Paul J. Meyer"
    }
  ],
  motivation: [
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt"
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt"
    },
    {
      text: "Don't limit your challenges. Challenge your limits.",
      author: "Anonymous"
    },
    {
      text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
      author: "Zig Ziglar"
    },
    {
      text: "The only limit to our realization of tomorrow will be our doubts of today.",
      author: "Franklin D. Roosevelt"
    }
  ]
};

export const getRandomQuote = (category = null) => {
  if (category && quotes[category]) {
    const categoryQuotes = quotes[category];
    return categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
  }
  
  // Get random quote from any category
  const allCategories = Object.keys(quotes);
  const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
  const categoryQuotes = quotes[randomCategory];
  return categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
}; 