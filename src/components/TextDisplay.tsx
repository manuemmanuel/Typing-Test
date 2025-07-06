import React, { useRef, useEffect } from 'react';
import { useTypingStore } from '../store/typingStore';

const TextDisplay: React.FC = () => {
  const { text, typedText, currentIndex, isFinished } = useTypingStore();
  const textDisplayRef = useRef<HTMLDivElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Ensure the active character is always visible while prioritizing the top text
    if (activeCharRef.current && textDisplayRef.current) {
      const charRect = activeCharRef.current.getBoundingClientRect();
      const containerRect = textDisplayRef.current.getBoundingClientRect();
      
      // Reset scroll position to top when starting a new test
      if (currentIndex === 0) {
        textDisplayRef.current.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }
      
      // Only scroll down if the active character is significantly below the visible area
      // This ensures we keep as much of the top text visible as possible
      if (charRect.bottom > containerRect.bottom - 40) {
        // Calculate minimum scroll needed to show current character
        const scrollBy = charRect.bottom - containerRect.bottom + 60;
        textDisplayRef.current.scrollBy({ top: scrollBy, behavior: 'smooth' });
      }
      
      // We're not scrolling back up unless the character is completely out of view
      // This helps maintain the context of the text above
      if (charRect.top < containerRect.top) {
        const scrollBy = charRect.top - containerRect.top - 20;
        textDisplayRef.current.scrollBy({ top: scrollBy, behavior: 'smooth' });
      }
    }
  }, [currentIndex, typedText]);

  return (
    <div 
      ref={textDisplayRef}
      className="text-display relative font-mono text-2xl mb-8 leading-relaxed tracking-wide overflow-hidden max-w-3xl mx-auto py-10 transition-all flex items-start justify-center"
      style={{ height: '180px' }}
    >
      <div className="text-display-content w-full">
        {text.split('').map((char, index) => {
          let className = '';
          let ref = null;
          
          if (index < typedText.length) {
            // Already typed characters
            className = typedText[index] === char ? 'correct' : 'incorrect';
          } else if (index === typedText.length) {
            // Current character
            className = 'current';
            ref = activeCharRef;
          } else {
            // Future characters
            className = 'future';
          }
          
          return (
            <span
              key={index}
              ref={ref}
              className={`transition-all ${className}`}
            >
              {char}
            </span>
          );
        })}
        
        {/* Show cursor for visual indication */}
        {!isFinished && typedText.length < text.length && (
          <span className="cursor absolute inline-block w-2 h-6 ml-0.5 animate-blink"></span>
        )}
      </div>
    </div>
  );
};

export default TextDisplay;
