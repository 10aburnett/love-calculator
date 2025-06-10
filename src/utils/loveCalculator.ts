// Love Calculator Utility Functions

function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '') // Remove spaces
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove combining diacritical marks
    .replace(/[^a-z0-9]/g, ''); // Remove any remaining special characters, keep only letters and numbers
}

export function hashNamesToScore(name1: string, name2: string): number {
  const str = normalizeString(name1) + normalizeString(name2);
  let hash = 0;
  
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash % 101);
}

export interface LoveMessage {
  message: string;
  emoji: string;
  shareText: string;
}

export interface EasterEgg {
  score: number;
  message: string;
  emoji: string;
  shareText: string;
}

// Easter egg combinations with custom scores and messages
export const easterEggs: Record<string, EasterEgg> = {
  "taylorswifttraviskelce": {
    score: 98,
    message: "A love story in the making! 🏈🎤❤️",
    emoji: "🏈",
    shareText: "Love story in the making! 🏈🎤"
  },
  "willsmithjadapinkettsmith": {
    score: 9,
    message: "Toxic entanglement detected. 🚩💔",
    emoji: "🚩",
    shareText: "Entanglement detected! 🚩"
  },
  "blakelivelyryanreynolds": {
    score: 99,
    message: "Hollywood power couple energy! ✨💑",
    emoji: "✨",
    shareText: "Hollywood power couple! ✨💑"
  },
  "johnnydeppamberheard": {
    score: 5,
    message: "A legal battle is not a love story. ⚖️💔",
    emoji: "⚖️",
    shareText: "Legal battle ≠ love story ⚖️"
  },
  "barackobamamichelleobama": {
    score: 100,
    message: "Presidential-level love detected. 🇺🇸💖",
    emoji: "🇺🇸",
    shareText: "Presidential love! 🇺🇸💖"
  },
  "tomhollandzendaya": {
    score: 95,
    message: "Swinging through life together perfectly. 🕸️💞",
    emoji: "🕸️",
    shareText: "Swinging through life together! 🕸️"
  },
  "jayzbeyonce": {
    score: 97,
    message: "Love on top — forever. 🎶👑",
    emoji: "👑",
    shareText: "Love on top! 🎶👑"
  },
  "cristianoronaldogeorginarodriguez": {
    score: 92,
    message: "A champion couple on and off the field. ⚽🏆",
    emoji: "⚽",
    shareText: "Champion couple! ⚽🏆"
  },
  "harrystylesoliviawilde": {
    score: 61,
    message: "Style meets cinema — but will it last? 🎥🎤",
    emoji: "🎥",
    shareText: "Style meets cinema! 🎥🎤"
  },
  "willsmithmargotrobbie": {
    score: 75,
    message: "Chemistry detected... on set? 🎬😉",
    emoji: "🎬",
    shareText: "On-set chemistry! 🎬😉"
  },
  "kanyewestkimkardashian": {
    score: 8,
    message: "Fame and ego — a tough combo. 💔",
    emoji: "💔",
    shareText: "Fame and ego combo 💔"
  },
  "bradpittangelinajolie": {
    score: 15,
    message: "Once upon a time... but no more. 📽️💔",
    emoji: "📽️",
    shareText: "Once upon a time... 📽️💔"
  },
  "elonmuskgrimes": {
    score: 20,
    message: "SpaceX didn't launch this love. 🛸💥",
    emoji: "🛸",
    shareText: "SpaceX launch failed! 🛸💥"
  },
  "shakiragerardpique": {
    score: 10,
    message: "A breakup that shook the charts! 🎶⚽💔",
    emoji: "🎶",
    shareText: "Shook the charts! 🎶⚽💔"
  },
  "mrbeastpewdiepie": {
    score: 100,
    message: "Billion-view bromance detected. 💸🎮",
    emoji: "💸",
    shareText: "Billion-view bromance! 💸🎮"
  },
  "spongebobpatrick": {
    score: 100,
    message: "Best friend goals, now with romance?! ⭐💕",
    emoji: "⭐",
    shareText: "Best friend goals! ⭐💕"
  },
  "elonmuskmarkzuckerberg": {
    score: 0,
    message: "Ready to fight in the octagon… not in love. 🥊💔",
    emoji: "🥊",
    shareText: "Octagon ready! 🥊💔"
  },
  "batmanjoker": {
    score: 0,
    message: "This relationship would be... chaotic. 🃏🦇💥",
    emoji: "🃏",
    shareText: "Chaotic relationship! 🃏🦇"
  },
  "shrekfiona": {
    score: 99,
    message: "A fairy tale match — layers included. 🧅💚",
    emoji: "🧅",
    shareText: "Fairy tale match! 🧅💚"
  },
  "rossgellerrachelgreen": {
    score: 100,
    message: "They were on a break... but soulmates. 📺❤️",
    emoji: "📺",
    shareText: "Were on a break! 📺❤️"
  },
  "marioprincesspeach": {
    score: 98,
    message: "Your princess is in THIS castle. 🍄👑❤️",
    emoji: "🍄",
    shareText: "Princess found! 🍄👑"
  },
  "jackrose": {
    score: 85,
    message: "A timeless love — but hold on to that door. 🚢💙",
    emoji: "🚢",
    shareText: "Timeless love! 🚢💙"
  },
  "jonsnowdaenerystargaryen": {
    score: 64,
    message: "Fire and ice — a complicated match. ❄️🔥",
    emoji: "❄️",
    shareText: "Fire and ice! ❄️🔥"
  },
  "katnisseverdeenpeetamellark": {
    score: 88,
    message: "May the odds be ever in your favor. 🏹❤️",
    emoji: "🏹",
    shareText: "Odds in your favor! 🏹❤️"
  },
  "tonystarkpepperpotts": {
    score: 100,
    message: "I love you 3000. 🚀❤️",
    emoji: "🚀",
    shareText: "Love you 3000! 🚀❤️"
  },
  "hansoloprincessleia": {
    score: 95,
    message: "I know. ✨🚀❤️",
    emoji: "🚀",
    shareText: "I know. ✨🚀❤️"
  },
  "homersimpsonmargesimpson": {
    score: 98,
    message: "Mmm... love. 🍩💛",
    emoji: "🍩",
    shareText: "Mmm... love! 🍩💛"
  },
  "saltbaesteak": {
    score: 100,
    message: "A match made in the kitchen. 🧂🥩❤️",
    emoji: "🧂",
    shareText: "Kitchen match! 🧂🥩"
  },
  "linkzelda": {
    score: 97,
    message: "It's dangerous to go alone — take love! 🗡️❤️",
    emoji: "🗡️",
    shareText: "Dangerous to go alone! 🗡️❤️"
  },
  "masterchiefcortana": {
    score: 80,
    message: "Love in a virtual space. 💾💙",
    emoji: "💾",
    shareText: "Virtual love! 💾💙"
  },
  "kratosatreus": {
    score: 100,
    message: "Father-son bond — stronger than any love. 🪓❤️",
    emoji: "🪓",
    shareText: "Father-son bond! 🪓❤️"
  },
  "elliedina": {
    score: 90,
    message: "Love in a broken world. 🎮❤️",
    emoji: "🎮",
    shareText: "Love in broken world! 🎮❤️"
  },
  "jokerharleyquinn": {
    score: 25,
    message: "Twisted, toxic, and unforgettable. 🃏💋💔",
    emoji: "🃏",
    shareText: "Twisted and toxic! 🃏💋"
  },
  "gokuvegeta": {
    score: 69,
    message: "Rivals... or more? 💪🔥❤️",
    emoji: "💪",
    shareText: "Rivals or more? 💪🔥"
  },
  "ashketchummisty": {
    score: 70,
    message: "Gotta catch... feelings! 🎮❤️",
    emoji: "🎮",
    shareText: "Gotta catch feelings! 🎮❤️"
  },
  "sherlockholmesdrwatson": {
    score: 100,
    message: "A perfectly logical partnership. 🕵️‍♂️❤️",
    emoji: "🕵️",
    shareText: "Logical partnership! 🕵️‍♂️❤️"
  },
  "loganpaulksi": {
    score: 10,
    message: "Business partners, not lovers. 🤑👊",
    emoji: "🤑",
    shareText: "Business partners! 🤑👊"
  },
  "andrewtatergretathunberg": {
    score: 0,
    message: "Oil and water. 🌍🚫",
    emoji: "🌍",
    shareText: "Oil and water! 🌍🚫"
  },
  "saltbaegordonramsay": {
    score: 15,
    message: "Battle of the chefs — not of hearts. 🍳🔥💔",
    emoji: "🍳",
    shareText: "Chef battle! 🍳🔥"
  },
  "bigshaqthetingoesskrrra": {
    score: 69,
    message: "The only number that matters here. 🔥🎵😉",
    emoji: "🔥",
    shareText: "The number that matters! 🔥🎵"
  },
  "dogecheems": {
    score: 100,
    message: "Such love. Much wow. 🐶💖",
    emoji: "🐶",
    shareText: "Such love. Much wow! 🐶💖"
  },
  "rickastleynevergonnagiveyouup": {
    score: 100,
    message: "Never gonna give you up... obviously. 🎶💘",
    emoji: "🎶",
    shareText: "Never gonna give you up! 🎶💘"
  },
  "grumpycatnyancat": {
    score: 50,
    message: "Grumpy, but maybe interested. 🐱🌈",
    emoji: "🐱",
    shareText: "Grumpy but interested! 🐱🌈"
  },
  "therockkevinhart": {
    score: 100,
    message: "The perfect comedic duo. 💪😂❤️",
    emoji: "💪",
    shareText: "Perfect comedic duo! 💪😂"
  },
  "shaggyvelma": {
    score: 95,
    message: "Jinkies! It's true love! 🕵️❤️",
    emoji: "🕵️",
    shareText: "Jinkies! True love! 🕵️❤️"
  },
  "marioluigi": {
    score: 100,
    message: "Brothers before all. 🍄❤️",
    emoji: "🍄",
    shareText: "Brothers before all! 🍄❤️"
  },
  "phineasferb": {
    score: 100,
    message: "Best invention yet: love. 🔧❤️",
    emoji: "🔧",
    shareText: "Best invention: love! 🔧❤️"
  },
  "voldemortharrypotter": {
    score: 5,
    message: "Can't love if you split your soul. 🧙💔",
    emoji: "🧙",
    shareText: "Split soul, no love! 🧙💔"
  },
  "dumbledoregrindelwald": {
    score: 60,
    message: "A love turned tragic. 🧙‍♂️💔",
    emoji: "🧙‍♂️",
    shareText: "Love turned tragic! 🧙‍♂️💔"
  },
  "gandalfsaruman": {
    score: 5,
    message: "White and grey don't mix well here. 🧙‍♂️💔",
    emoji: "🧙‍♂️",
    shareText: "White and grey don't mix! 🧙‍♂️"
  },
  "frodosam": {
    score: 100,
    message: "Friendship forged in fire. 🧙‍♂️❤️",
    emoji: "🧙‍♂️",
    shareText: "Friendship forged in fire! 🧙‍♂️❤️"
  },
  "geraltyennefer": {
    score: 97,
    message: "A magic-fueled love. 🧙‍♀️❤️",
    emoji: "🧙‍♀️",
    shareText: "Magic-fueled love! 🧙‍♀️❤️"
  },
  "wandamaximoffvision": {
    score: 95,
    message: "Love beyond reality. 💫❤️",
    emoji: "💫",
    shareText: "Love beyond reality! 💫❤️"
  },
  "lokithor": {
    score: 50,
    message: "Sibling rivalry — with love? ⚡❤️",
    emoji: "⚡",
    shareText: "Sibling rivalry with love! ⚡"
  },
  "drakerihanna": {
    score: 85,
    message: "Hit after hit after hit... of love. 🎤❤️",
    emoji: "🎤",
    shareText: "Hit after hit of love! 🎤❤️"
  },
  "cardiboffset": {
    score: 75,
    message: "Money moves... and heart moves. 💰❤️",
    emoji: "💰",
    shareText: "Money and heart moves! 💰❤️"
  },
  "btsjungkooklisablackpink": {
    score: 95,
    message: "K-pop's ultimate ship. 🎤❤️",
    emoji: "🎤",
    shareText: "K-pop ultimate ship! 🎤❤️"
  },
  "oliviarodrigojoshuabassett": {
    score: 20,
    message: "Drivers license... revoked? 🚗💔",
    emoji: "🚗",
    shareText: "Drivers license revoked! 🚗💔"
  },
  "dualipajackharlow": {
    score: 70,
    message: "New rules, new love? 🎤❤️",
    emoji: "🎤",
    shareText: "New rules, new love! 🎤❤️"
  },
  "shawnmendescamilacabello": {
    score: 80,
    message: "Señorita vibes. 🎶❤️",
    emoji: "🎶",
    shareText: "Señorita vibes! 🎶❤️"
  },
  "mrbeastchandler": {
    score: 100,
    message: "A bromance worth billions. 💸❤️",
    emoji: "💸",
    shareText: "Billion-dollar bromance! 💸❤️"
  },
  "loganpauljakepaul": {
    score: 99,
    message: "Brotherly love — sometimes too much. 🥊❤️",
    emoji: "🥊",
    shareText: "Too much brotherly love! 🥊❤️"
  },
  "dreamgeorgenotfound": {
    score: 95,
    message: "Minecraft hearts all the way. ⛏️❤️",
    emoji: "⛏️",
    shareText: "Minecraft hearts! ⛏️❤️"
  },
  "charlidameliollilhuddy": {
    score: 60,
    message: "TikTok love fades fast. 🎵💔",
    emoji: "🎵",
    shareText: "TikTok love fades! 🎵💔"
  },
  "pokimanexqc": {
    score: 55,
    message: "Gaming chemistry, but complicated. 🎮❤️",
    emoji: "🎮",
    shareText: "Gaming chemistry! 🎮❤️"
  },
  "ninjatfue": {
    score: 10,
    message: "Rivalry, not romance. 🎮💔",
    emoji: "🎮",
    shareText: "Rivalry, not romance! 🎮💔"
  },
  "valkyraeeludwig": {
    score: 85,
    message: "Content kings and queens. 👑❤️",
    emoji: "👑",
    shareText: "Content royalty! 👑❤️"
  },
  "hasanabiaoc": {
    score: 80,
    message: "Progressive power couple? 💥❤️",
    emoji: "💥",
    shareText: "Progressive power couple! 💥❤️"
  },
  "khabylamesilence": {
    score: 100,
    message: "The perfect match — no words needed. 🤫❤️",
    emoji: "🤫",
    shareText: "No words needed! 🤫❤️"
  },
  "jamescharlestatiwestbrook": {
    score: 10,
    message: "Beauty community drama, not love. 💄💔",
    emoji: "💄",
    shareText: "Beauty drama, not love! 💄💔"
  },
  // Alternative spellings and variations
  "blakeryan": {
    score: 99,
    message: "Hollywood power couple energy! ✨💑",
    emoji: "✨",
    shareText: "Hollywood power couple! ✨💑"
  },
  "rossrachel": {
    score: 100,
    message: "They were on a break... but soulmates. 📺❤️",
    emoji: "📺",
    shareText: "Were on a break! 📺❤️"
  },
  "watsonsherlock": {
    score: 100,
    message: "A perfectly logical partnership. 🕵️‍♂️❤️",
    emoji: "🕵️",
    shareText: "Logical partnership! 🕵️‍♂️❤️"
  },
  "johnwatsonsherlockholmes": {
    score: 100,
    message: "A perfectly logical partnership. 🕵️‍♂️❤️",
    emoji: "🕵️",
    shareText: "Logical partnership! 🕵️‍♂️❤️"
  },
  "harryvoldemort": {
    score: 5,
    message: "Can't love if you split your soul. 🧙💔",
    emoji: "🧙",
    shareText: "Split soul, no love! 🧙💔"
  },
  "hermioneron": {
    score: 95,
    message: "Intelligence meets loyalty — perfect match! 📚❤️",
    emoji: "📚",
    shareText: "Intelligence meets loyalty! 📚❤️"
  },
  "batmansuperman": {
    score: 75,
    message: "World's finest duo — fighting crime and hearts! 🦸‍♂️💫",
    emoji: "🦸‍♂️",
    shareText: "World's finest duo! 🦸‍♂️💫"
  },
  "spidermandeadpool": {
    score: 80,
    message: "Web-slinging meets wise-cracking! 🕷️💬",
    emoji: "🕷️",
    shareText: "Web-slinging meets wise-cracking! 🕷️"
  }
};

export const loveMessages: Record<string, LoveMessage[]> = {
  "90-100": [
    {
      message: "Soulmates — you two were written in the stars! 🌠❤️",
      emoji: "🌠",
      shareText: "We're soulmates! ✨"
    },
    {
      message: "Perfect match! Your love story is one for the ages! 💖✨",
      emoji: "💖",
      shareText: "Perfect love match! 💕"
    },
    {
      message: "True love at its finest — you complete each other! 💕🔥",
      emoji: "💕",
      shareText: "We complete each other! 💖"
    },
    {
      message: "Legendary love! You're destined to be together forever! 👑💫",
      emoji: "👑",
      shareText: "Legendary love story! 💫"
    },
    {
      message: "Ultimate power couple! Your love conquers all! 💪❤️",
      emoji: "💪",
      shareText: "Power couple vibes! 💪❤️"
    }
  ],
  "75-89": [
    {
      message: "True love alert — you're a match made in heaven! ✨💕",
      emoji: "✨",
      shareText: "Match made in heaven! 💕"
    },
    {
      message: "Amazing connection! Your hearts beat as one! 💓🎵",
      emoji: "💓",
      shareText: "Our hearts beat as one! 💓"
    },
    {
      message: "Beautiful love story in the making! 🌹💖",
      emoji: "🌹",
      shareText: "Beautiful love story! 🌹"
    },
    {
      message: "Incredible chemistry! The sparks are flying! ⚡💘",
      emoji: "⚡",
      shareText: "Incredible chemistry! ⚡💘"
    },
    {
      message: "Love goals! You inspire others with your connection! 🎯💝",
      emoji: "🎯",
      shareText: "Relationship goals! 💝"
    }
  ],
  "50-74": [
    {
      message: "A solid connection — let's see where it goes! 🌷💫",
      emoji: "🌷",
      shareText: "Solid connection! 🌷"
    },
    {
      message: "Good potential! Love might be blooming! 🌸🌱",
      emoji: "🌸",
      shareText: "Love is blooming! 🌸"
    },
    {
      message: "Sweet compatibility! There's definitely something here! 🍯💕",
      emoji: "🍯",
      shareText: "Sweet compatibility! 🍯"
    },
    {
      message: "Promising match! Time will tell your story! ⏰💖",
      emoji: "⏰",
      shareText: "Promising match! ⏰💖"
    },
    {
      message: "Cute connection! The foundation is there! 🏗️💕",
      emoji: "🏗️",
      shareText: "Cute connection! 💕"
    }
  ],
  "25-49": [
    {
      message: "A little spark, but will the flame grow? 🔥🤞",
      emoji: "🔥",
      shareText: "Little spark detected! 🔥"
    },
    {
      message: "Some potential, but work is needed! 🛠️💕",
      emoji: "🛠️",
      shareText: "Some potential there! 💕"
    },
    {
      message: "Mixed signals — communication is key! 📱💭",
      emoji: "📱",
      shareText: "Mixed signals! 📱💭"
    },
    {
      message: "Friendship vibes strong — maybe love will follow! 👫❓",
      emoji: "👫",
      shareText: "Strong friendship vibes! 👫"
    },
    {
      message: "Slow burn romance? Sometimes the best love takes time! ⏳🔥",
      emoji: "⏳",
      shareText: "Slow burn romance! ⏳🔥"
    }
  ],
  "0-24": [
    {
      message: "Opposites may attract… but sometimes they don't. ⚡💔",
      emoji: "⚡",
      shareText: "Opposites attract? ⚡"
    },
    {
      message: "Better as friends? Sometimes that's even better! 🤝💙",
      emoji: "🤝",
      shareText: "Better as friends! 🤝"
    },
    {
      message: "Not quite a match, but hey — there are plenty of fish! 🐠🌊",
      emoji: "🐠",
      shareText: "Plenty of fish! 🐠"
    },
    {
      message: "Different wavelengths, but that's okay! 📻🎵",
      emoji: "📻",
      shareText: "Different wavelengths! 📻"
    },
    {
      message: "Not meant to be, but you're both amazing! ⭐🌟",
      emoji: "⭐",
      shareText: "Both amazing individually! ⭐"
    }
  ]
};

export function getLoveMessage(score: number): LoveMessage {
  let range: string;
  
  if (score >= 90) range = "90-100";
  else if (score >= 75) range = "75-89";
  else if (score >= 50) range = "50-74";
  else if (score >= 25) range = "25-49";
  else range = "0-24";
  
  const messages = loveMessages[range];
  return messages[Math.floor(Math.random() * messages.length)];
}

export function getEasterEgg(name1: string, name2: string): EasterEgg | null {
  const normalizedPair1 = normalizeString(name1) + normalizeString(name2);
  const normalizedPair2 = normalizeString(name2) + normalizeString(name1);
  
  return easterEggs[normalizedPair1] || easterEggs[normalizedPair2] || null;
}

export function calculateLoveScore(name1: string, name2: string): number {
  if (!name1.trim() || !name2.trim()) return 0;
  
  // Check for easter eggs first
  const easterEgg = getEasterEgg(name1, name2);
  if (easterEgg !== null) {
    return easterEgg.score;
  }
  
  // Use regular hash-based calculation
  return hashNamesToScore(name1, name2);
}

export function getCustomMessage(name1: string, name2: string): LoveMessage | null {
  const easterEgg = getEasterEgg(name1, name2);
  if (easterEgg) {
    return {
      message: easterEgg.message,
      emoji: easterEgg.emoji,
      shareText: easterEgg.shareText
    };
  }
  return null;
} 