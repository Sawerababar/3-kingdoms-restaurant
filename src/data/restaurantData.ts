import { MenuItem, MenuCategory, Review, VideoReel } from '../types';

export const RESTAURANT_INFO = {
  name: "3 Kingdoms",
  chineseName: "三國蜀菜",
  tagline: "Authentic Sichuan Noodle & Asian Street Food House",
  shortDesc: "Brisbane's premier destination for hand-crafted Sichuan noodle soups, slow-braised Roujiamo, Bobo chicken skewers, and slow-simmered 12-hour broths.",
  address: "Shop 32, Uptown Brisbane (Elizabeth St Entrance), 91 Queen St, Brisbane City QLD 4000",
  shortAddress: "Uptown Brisbane, Elizabeth St, CBD",
  phone: "(07) 3012 8702",
  internationalPhone: "+61 7 3012 8702",
  email: "hello@3kingdomsbrisbane.com.au",
  instagram: "@3kingdoms_brisbane",
  instagramUrl: "https://www.instagram.com/3kingdoms_brisbane",
  googleMapsUrl: "https://maps.app.goo.gl/4acpcNY9wq4vPzGX8",
  rating: 4.8,
  reviewCount: 384,
  hours: [
    { days: "Monday – Thursday", time: "10:30 AM – 9:00 PM" },
    { days: "Friday", time: "10:30 AM – 9:30 PM" },
    { days: "Saturday – Sunday", time: "11:00 AM – 9:00 PM" },
  ],
  deliveryPartners: [
    { name: "UberEats", url: "https://www.ubereats.com", badge: "Fast Delivery" },
    { name: "DoorDash", url: "https://www.doordash.com", badge: "0$ Delivery Fee Available" },
    { name: "Fantuan", url: "https://www.fantuanorder.com", badge: "Exclusive Deals" },
    { name: "EatClub", url: "https://www.eatclub.com.au", badge: "Special Dining Offers" },
  ]
};

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "noodles",
    name: "Sichuan Noodle Soups",
    icon: "🍜",
    description: "Authentic handmade wheat & glass noodles in rich slow-simmered broths with imported Sichuan peppers."
  },
  {
    id: "roujiamo",
    name: "Crispy Roujiamo",
    icon: "🥪",
    description: "Legendary Chinese Hamburgers — golden flaky flatbread filled with tender braised meats."
  },
  {
    id: "skewers",
    name: "Bobo Chicken & Skewers",
    icon: "🍢",
    description: "Aromatic cold oil Bobo chicken pot and charcoal-roasted Sichuan spice skewers."
  },
  {
    id: "dimsum",
    name: "Wontons & Dumplings",
    icon: "🥟",
    description: "Handmade daily with silky wrappers, house chili oil, and savory pork & chive fillings."
  },
  {
    id: "rice",
    name: "Rice Bowls & Specialties",
    icon: "🍚",
    description: "Hearty Sichuan style claypot rice, Taiwanese braised pork, and cumin beef bowls."
  },
  {
    id: "drinks",
    name: "Artisanal Teas & Drinks",
    icon: "🧋",
    description: "Refreshing brown sugar boba, sour plum juice, and cold herbal teas to complement the spice."
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // Noodles
  {
    id: "n1",
    name: "Signature Sichuan Spicy Beef Noodle Soup",
    chineseName: "红烧牛肉面",
    category: "noodles",
    price: 18.80,
    description: "Tender 8-hour braised beef shank served over bouncy noodles in a rich, spicy Sichuan beef bone broth topped with bok choy and fresh coriander.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 2,
    popular: true,
    chefRecommended: true,
    cookingTime: "12 mins",
    ingredients: ["Hand-pulled Noodles", "Braised Beef Shank", "12-Hour Beef Bone Broth", "Sichuan Chili Oil", "Bok Choy", "Coriander"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-chef-mixing-noodle-ingredients-in-a-bowl-43407-large.mp4"
  },
  {
    id: "n2",
    name: "Sichuan Hot & Sour Glass Noodle Soup",
    chineseName: "正宗重庆酸辣粉",
    category: "noodles",
    price: 16.80,
    description: "Silky sweet potato glass noodles in a tangy black vinegar and numbingly spicy chili broth, loaded with crispy roasted peanuts, soybeans, and preserved vegetables.",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 3,
    popular: true,
    ingredients: ["Sweet Potato Glass Noodles", "Zhenjiang Black Vinegar", "Roasted Peanuts", "Crispy Soybeans", "Sichuan Peppercorn Oil", "Mustard Greens"]
  },
  {
    id: "n3",
    name: "Traditional Dan Dan Noodles with Minced Pork",
    chineseName: "成都担担面",
    category: "noodles",
    price: 17.50,
    description: "Classic Chengdu dry-stirred noodles dressed in a silky dark sesame-peanut sauce, topped with crispy spiced minced pork, preserved Yibin sui mi ya cai, and chili oil.",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 2,
    chefRecommended: true,
    ingredients: ["Fresh Thin Wheat Noodles", "Crispy Pork Mince", "Roasted Sesame Paste", "Sui Mi Ya Cai", "Chili Sauce", "Spring Onions"]
  },
  {
    id: "n4",
    name: "Clear Broth Braised Beef Noodle Soup",
    chineseName: "清汤牛肉面",
    category: "noodles",
    price: 18.50,
    description: "A comforting non-spicy broth simmered with star anise, ginger, and daikon radish, served with melt-in-your-mouth beef brisket and green scallions.",
    image: "https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 0,
    ingredients: ["Beef Brisket", "Daikon Radish", "Clear Beef Consommé", "Fresh Wheat Noodles", "Scallions", "Ginger"]
  },
  {
    id: "n5",
    name: "Dry Stirred Spicy Cumin Beef Noodles",
    chineseName: "孜然牛肉干拌面",
    category: "noodles",
    price: 18.90,
    description: "Wok-seared beef slices tossed with roasted cumin, bell peppers, fresh garlic, and dry chili noodles.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 2,
    ingredients: ["Wok-Seared Beef", "Ground Cumin", "Garlic", "Sichuan Dried Chili", "Flat Noodles", "Bell Peppers"]
  },

  // Roujiamo
  {
    id: "r1",
    name: "Crispy Cumin Pork Roujiamo (Chinese Hamburger)",
    chineseName: "腊汁肉夹馍",
    category: "roujiamo",
    price: 9.80,
    description: "Freshly baked crisp-layer flatbread stuffed with finely chopped 12-hour braised pork belly, infused with aromatic master broth.",
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 1,
    popular: true,
    chefRecommended: true,
    ingredients: ["Baked Flaky Bun", "Slow-Braised Pork Belly", "Master Broth", "Green Peppers", "Scallions"]
  },
  {
    id: "r2",
    name: "Spicy Beef & Pepper Roujiamo",
    chineseName: "香辣牛肉肉夹馍",
    category: "roujiamo",
    price: 10.50,
    description: "Shredded beef brisket sauteed with roasted cumin and crushed Sichuan chili peppers tucked into a hot flaky pastry.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 2,
    popular: true,
    ingredients: ["Crispy Layer Bun", "Spiced Beef Brisket", "Roasted Cumin", "Chili Flakes", "Capsicum"]
  },
  {
    id: "r3",
    name: "Mushroom & Tofu Roujiamo (V)",
    chineseName: "素食香菇豆腐馍",
    category: "roujiamo",
    price: 8.90,
    description: "Braised king oyster mushrooms and smoked pressed tofu cooked in five-spice broth inside a golden flaky bun.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 0,
    vegetarian: true,
    ingredients: ["Flaky Crispy Bun", "King Oyster Mushrooms", "Pressed Smoked Tofu", "Five-Spice Broth"]
  },

  // Skewers
  {
    id: "s1",
    name: "Authentic Leshan Bobo Chicken Pot (Chicken & Veg Skewers)",
    chineseName: "乐山钵钵鸡",
    category: "skewers",
    price: 22.00,
    description: "A signature Sichuan specialty: 12 assorted skewers (chicken, lotus root, black fungus, quail eggs, kelp) steeped in a ice-chilled red pepper sesame broth.",
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 3,
    popular: true,
    chefRecommended: true,
    ingredients: ["Tender Chicken Breast", "Lotus Root Slices", "Black Wood Ear Fungus", "Quail Eggs", "Sichuan Red Pepper Sesame Oil"]
  },
  {
    id: "s2",
    name: "Charcoal Cumin Lamb Skewers (4 skewers)",
    chineseName: "孜然羊肉串",
    category: "skewers",
    price: 13.80,
    description: "Succulent Australian lamb cubes dusted with coarse sea salt, roasted cumin seeds, and spicy chili powder.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 2,
    popular: true,
    ingredients: ["Australian Lamb Shoulder", "Toasted Cumin Seeds", "Chili Powder", "Sea Salt"]
  },
  {
    id: "s3",
    name: "Spicy Grilled Enoki Mushroom Skewers",
    chineseName: "烤金针菇串",
    category: "skewers",
    price: 8.80,
    description: "Enoki mushroom bundles brushed with garlic oil, Sichuan pepper paste, and toasted sesame seeds.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 1,
    vegetarian: true,
    ingredients: ["Enoki Mushrooms", "Garlic Chili Butter", "Toasted Sesame", "Spring Onions"]
  },

  // Dim Sum / Wontons
  {
    id: "d1",
    name: "Chengdu Wontons in Red Chili Oil",
    chineseName: "成都红油抄手",
    category: "dimsum",
    price: 14.80,
    description: "Handmade pork wontons bathed in a velvety sauce of sweet aromatic soy sauce, crushed garlic, and bright red Sichuan chili oil.",
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 2,
    popular: true,
    chefRecommended: true,
    ingredients: ["Fresh Pork Wontons", "House Red Chili Oil", "Sweet Aromatic Soy", "Minced Garlic", "Toasted Sesame"]
  },
  {
    id: "d2",
    name: "Pan-Seared Pork & Chive Dumplings (8 pcs)",
    chineseName: "煎饺",
    category: "dimsum",
    price: 13.80,
    description: "Juicy minced pork and fresh chive dumplings with a crispy lace skirt bottom, served with black vinegar dip.",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 0,
    popular: true,
    ingredients: ["Pork Mince", "Garlic Chives", "Crispy Lace Batter", "Zhenjiang Black Vinegar"]
  },

  // Rice
  {
    id: "rc1",
    name: "Braised Pork Belly Rice Bowl (Lu Rou Fan)",
    chineseName: "招牌卤肉饭",
    category: "rice",
    price: 16.90,
    description: "Melt-in-your-mouth slow-cooked pork belly braised with fried shallots and soy glaze over steamed jasmine rice, served with tea-marinated egg.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 0,
    popular: true,
    ingredients: ["Braised Pork Belly", "Jasmine Rice", "Tea Egg", "Pickled Mustard Radish", "Crispy Shallots"]
  },
  {
    id: "rc2",
    name: "Sichuan Mapo Tofu with Minced Beef Rice",
    chineseName: "麻婆豆腐饭",
    category: "rice",
    price: 16.50,
    description: "Silken tofu cooked in authentic Pixian doubanjiang chili paste, ground beef, and numbing green Sichuan peppercorn oil over rice.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 3,
    chefRecommended: true,
    ingredients: ["Silken Tofu", "Pixian Chili Bean Paste", "Ground Beef", "Green Sichuan Peppercorns", "Jasmine Rice"]
  },

  // Drinks
  {
    id: "dr1",
    name: "Brown Sugar Boba Fresh Milk",
    chineseName: "黑糖珍珠鲜奶",
    category: "drinks",
    price: 7.50,
    description: "Warm slow-cooked brown sugar tapioca pearls served with chilled fresh cream milk.",
    image: "https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 0,
    popular: true,
    ingredients: ["Brown Sugar Tapioca Pearls", "Fresh Whole Milk", "Brown Sugar Syrup"]
  },
  {
    id: "dr2",
    name: "Traditional Homemade Sour Plum Juice",
    chineseName: "冰镇酸梅汤",
    category: "drinks",
    price: 6.00,
    description: "A traditional cooling Sichuan herbal beverage brewed with smoked plums, hawthorn berries, sweet osmanthus, and rock sugar.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 0,
    chefRecommended: true,
    ingredients: ["Smoked Wumei Plums", "Hawthorn Berries", "Osmanthus Blossoms", "Rock Sugar"]
  },
  {
    id: "dr3",
    name: "Chilled Jasmine Green Tea with Lime",
    chineseName: "青柠茉莉绿茶",
    category: "drinks",
    price: 5.80,
    description: "Freshly brewed fragrant jasmine blossom tea shaken over ice with fresh Australian limes.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800",
    spiceLevel: 0,
    vegetarian: true,
    ingredients: ["Jasmine Green Tea", "Fresh Squeezed Limes", "Honey Syrup"]
  }
];

export const CULINARY_REELS: VideoReel[] = [
  {
    id: "reel1",
    title: "Sichuan Beef Noodle Craftsmanship",
    subtitle: "Hand-Pulled Noodles & 12-Hour Master Broth",
    chefName: "Master Chef Feny",
    rating: 4.9,
    videoThumb: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=1000",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    dishName: "Signature Sichuan Spicy Beef Noodle",
    ingredients: ["Fresh Wheat Flour", "Sichuan Pepper Oil", "12-hr Beef Bone Stock", "Braised Shank"],
    steps: [
      { stepNumber: 1, title: "Kneading & Pulling", description: "Fresh wheat dough is hand-pulled 50+ times to create springy, elastic noodle strands." },
      { stepNumber: 2, title: "Sichuan Chili Infusion", description: "House chili oil crafted with toasted Sichuan peppers & fragrant spices." },
      { stepNumber: 3, title: "12-Hour Bone Simmer", description: "Rich beef marrow broth simmered continuously with star anise and cinnamon." }
    ]
  }
];

export const GOOGLE_REVIEWS: Review[] = [
  {
    id: "rev1",
    author: "Jessica T. (Brisbane Foodie)",
    rating: 5,
    date: "1 week ago",
    comment: "Hands down the best Sichuan noodle bowl in Brisbane City! The broth in the Beef Noodle Soup is super rich with the exact amount of numbing peppercorn spice. Roujiamo was so flaky and juicy! 10/10.",
    dishRecommended: "Signature Sichuan Beef Noodle Soup & Roujiamo",
    source: "Google Maps",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "rev2",
    author: "Marcus Chen",
    rating: 5,
    date: "2 weeks ago",
    comment: "Authentic Chengdu street food flavors in Uptown Brisbane. The Hot & Sour Glass Noodles (酸辣粉) brought back instant memories of Sichuan. Super fast service and wonderful atmosphere!",
    dishRecommended: "Hot & Sour Glass Noodles",
    source: "Google Maps",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "rev3",
    author: "Sarah K.",
    rating: 5,
    date: "A month ago",
    comment: "The Bobo Chicken pot is an absolute MUST TRY! Loved the cold chili oil dip with toasted sesame seeds. Paired with their brown sugar boba milk, it balances the spice perfectly.",
    dishRecommended: "Bobo Chicken & Brown Sugar Boba",
    source: "Google Maps",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "rev4",
    author: "David Lawson",
    rating: 5,
    date: "3 weeks ago",
    comment: "Generous portions, crisp Roujiamo buns, and very reasonable prices right inside Uptown Elizabeth St entrance. I come here at least twice a week during lunch break!",
    dishRecommended: "Cumin Pork Roujiamo & Dan Dan Noodles",
    source: "Google Maps",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: "ig1",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=600",
    likes: "1.2k",
    comments: "84",
    caption: "A steamy bowl of our 12-hour braised Sichuan Beef Noodle Soup on a chilly Brisbane afternoon 🍜🔥 #3Kingdoms #BrisbaneEats #SichuanNoodles",
    isReel: true
  },
  {
    id: "ig2",
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=600",
    likes: "892",
    comments: "42",
    caption: "Listen to that crunch! Thousand-layer flaky Roujiamo stuffed with succulent cumin pork. #ChineseHamburger #UptownBrisbane",
    isReel: true
  },
  {
    id: "ig3",
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=600",
    likes: "1.5k",
    comments: "105",
    caption: "The iconic Leshan Bobo Chicken pot soaked in sesame red pepper oil. Who's grabbing skewers with us tonight? 🍢",
    isReel: false
  },
  {
    id: "ig4",
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=600",
    likes: "740",
    comments: "38",
    caption: "Silky dumplings submerged in house-made roasted chili oil & sweet aromatic soy sauce! 🥟❤️",
    isReel: false
  }
];
