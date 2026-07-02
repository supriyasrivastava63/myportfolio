export const backgrounds = [
  {
    id: 1,
    name: "Sunrise Over Mountains",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "nature"
  },
  {
    id: 2,
    name: "Golden Sunrise",
    url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "nature"
  },
  {
    id: 3,
    name: "Morning Flowers",
    url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "flowers"
  },
  {
    id: 4,
    name: "Ocean Sunrise",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    category: "nature"
  },
  {
    id: 5,
    name: "Cherry Blossoms",
    url: "https://images.unsplash.com/photo-1522383225653-e1114a3f5b3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "flowers"
  },
  {
    id: 6,
    name: "Mountain Lake",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "nature"
  },
  {
    id: 7,
    name: "Sunrise Clouds",
    url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "nature"
  },
  {
    id: 8,
    name: "Tulip Garden",
    url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "flowers"
  },
  {
    id: 9,
    name: "Beach Sunrise",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    category: "nature"
  },
  {
    id: 10,
    name: "Rose Garden",
    url: "https://images.unsplash.com/photo-1522383225653-e1114a3f5b3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "flowers"
  }
];

export const getRandomBackground = (category = null) => {
  if (category) {
    const filteredBackgrounds = backgrounds.filter(bg => bg.category === category);
    if (filteredBackgrounds.length > 0) {
      return filteredBackgrounds[Math.floor(Math.random() * filteredBackgrounds.length)];
    }
  }
  
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
};

export const getBackgroundsByCategory = (category) => {
  return backgrounds.filter(bg => bg.category === category);
}; 