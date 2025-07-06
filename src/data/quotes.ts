// Short quotes for 15-second tests
const shortQuotes = [
  "The quick brown fox jumps over the lazy dog.",
  "All that glitters is not gold.",
  "The early bird catches the worm.",
  "Better late than never.",
  "Good things come to those who wait.",
  "Actions speak louder than words.",
  "A picture is worth a thousand words.",
  "Don't judge a book by its cover.",
  "An apple a day keeps the doctor away.",
  "Two wrongs don't make a right."
];

// Medium quotes for 30-second tests
const mediumQuotes = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The only way to do great work is to love what you do. If you haven't found it yet, keep looking.",
  "Life is what happens when you're busy making other plans. Embrace the unexpected journey.",
  "In the end, it's not the years in your life that count. It's the life in your years that matters most.",
  "The future belongs to those who believe in the beauty of their dreams and work to achieve them.",
  "Believe you can and you're halfway there. The rest is dedication and perseverance.",
  "The best way to predict the future is to create it with your own hands and determination.",
  "If you want to lift yourself up, lift up someone else. Kindness creates a ripple effect.",
  "You miss 100% of the shots you don't take. Don't let fear of failure hold you back.",
  "Strive not to be a success, but rather to be of value to the world around you."
];

// Long quotes for 60-second tests
const longQuotes = [
  "The greatest glory in living lies not in never falling, but in rising every time we fall. Resilience is what shapes us and defines our character. Embrace challenges as opportunities for growth rather than obstacles to avoid. The strongest people are those who have faced adversity and learned from it.",
  "The way to get started is to quit talking and begin doing. Action will delineate and define you. Take that first step today, even if it's small, and build momentum from there. Remember that the journey of a thousand miles begins with a single step forward in the right direction.",
  "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma, which is living with the results of other people's thinking. Don't let the noise of others' opinions drown out your own inner voice. Have the courage to follow your heart and intuition.",
  "The purpose of our lives is to be happy and to help others find their own happiness. Contribute to something greater than yourself. Leave the world a little better than you found it. Remember that happiness is not something ready-made; it comes from your own actions and mindset.",
  "Spread love everywhere you go. Let no one ever come to you without leaving happier. Small acts of kindness can make a profound difference in someone's day. Never underestimate the power of a smile, a kind word, or a moment of your time given to someone who needs it.",
  "When you reach the end of your rope, tie a knot in it and hang on. Persistence is often what separates success from failure. The darkest moments often come just before dawn. Trust in your ability to weather the storm and emerge stronger on the other side of adversity.",
  "The future belongs to those who prepare for it today. Your daily habits and choices are shaping your tomorrow. Invest in yourself through continuous learning, healthy habits, and meaningful relationships. Small improvements compound over time into remarkable transformations.",
  "The only impossible journey is the one you never begin. Take risks, make mistakes, and learn from them. It's better to try and fail than to wonder what might have been. Life rewards courage and punishes complacency. Begin now and adjust your course as you go forward.",
  "In this life we cannot do great things. We can only do small things with great love and dedication. Focus on putting your whole heart into everything you do, no matter how insignificant it may seem. Excellence is not an act but a habit that develops over time with practice.",
  "Life is either a daring adventure or nothing at all. Security is mostly a superstition. It does not exist in nature, nor do the children of men as a whole experience it. Avoiding danger is no safer in the long run than outright exposure. The fearful are caught as often as the bold."
];

/**
 * Returns a random quote based on the specified test duration
 * @param duration Test duration in seconds
 * @returns A random quote with appropriate length
 */
export function getRandomQuote(duration = 60): string {
  let quoteSet = longQuotes;
  
  if (duration === 15) {
    quoteSet = shortQuotes;
  } else if (duration === 30) {
    quoteSet = mediumQuotes;
  }
  
  return quoteSet[Math.floor(Math.random() * quoteSet.length)];
}
