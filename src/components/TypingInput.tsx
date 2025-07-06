import React, { useEffect, useRef } from 'react';
import { useTypingStore } from '../store/typingStore';

const TypingInput: React.FC = () => {
  const { 
    typedText, 
    setTypedText, 
    isFinished, 
    text,
    resetTest,
    isStarted
  } = useTypingStore();
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Re-focus on input when test is reset and ensure text display is scrolled to top
    if (typedText === '' && inputRef.current) {
      inputRef.current.focus();
      // Find and scroll the text display to top
      const textDisplay = document.querySelector('.text-display');
      if (textDisplay) {
        textDisplay.scrollTo({ top: 0, behavior: 'auto' });
      }
    }
  }, [typedText]);

  // Add a handler to refocus the input if it loses focus
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow typing if the test is not finished
    if (!isFinished) {
      const newValue = e.target.value;
      
      // Limit typed text to the length of the test text
      if (newValue.length <= text.length) {
        setTypedText(newValue);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle Tab key to restart test
    if (e.key === 'Tab' && isFinished) {
      e.preventDefault();
      resetTest();
    }
  };

  return (
    <div className="typing-input relative py-4">
      {/* Visual indicator for typing input focus */}
      {!isStarted && (
        <div className="text-center mb-4 text-sm font-medium text-blue-400 animate-pulse">
          Click anywhere or start typing to begin
        </div>
      )}
      
      {/* Visually hidden input for capturing typing */}
      <input
        ref={inputRef}
        type="text"
        value={typedText}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        className="absolute inset-0 opacity-0 z-50 cursor-default"
        disabled={isFinished}
        aria-label="Typing input"
        autoFocus
      />
    </div>
  );
};

export default TypingInput;
