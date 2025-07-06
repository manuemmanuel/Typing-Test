import React from 'react';
import { useTypingStore } from '../store/typingStore';
import { getRandomQuote } from '../data/quotes';
import { Moon, RefreshCw, Sun } from 'lucide-react';

const Controls: React.FC = () => {
  const { 
    resetTest, 
    setText, 
    isStarted, 
    isFinished,
    setTestDuration,
    testDuration,
    theme,
    toggleTheme
  } = useTypingStore();

  const handleReset = () => {
    setText(getRandomQuote(testDuration));
    resetTest();
  };

  const handleDurationChange = (duration: number) => {
    setTestDuration(duration);
    setText(getRandomQuote(duration));
    resetTest();
  };

  return (
    <div className="controls-container flex flex-col md:flex-row justify-center items-center gap-6 mb-10 max-w-3xl mx-auto">
      <div className="flex items-center">
        <button
          onClick={handleReset}
          className="control-btn flex items-center gap-2 px-6 py-3 rounded-xl transition-all hover:scale-105 hover:shadow-md"
          disabled={isStarted && !isFinished}
          aria-label="New test"
        >
          <RefreshCw size={18} />
          <span className="font-medium">New Test</span>
        </button>
      </div>
      
      <div className="duration-controls flex items-center">
        <div className="flex gap-1 p-1 rounded-xl bg-white/5 backdrop-blur-sm">
          <button
            onClick={() => handleDurationChange(15)}
            className={`control-btn px-5 py-2.5 rounded-lg transition-all ${
              testDuration === 15 ? 'active-duration' : ''
            }`}
            disabled={isStarted && !isFinished}
          >
            15s
          </button>
          <button
            onClick={() => handleDurationChange(30)}
            className={`control-btn px-5 py-2.5 rounded-lg transition-all ${
              testDuration === 30 ? 'active-duration' : ''
            }`}
            disabled={isStarted && !isFinished}
          >
            30s
          </button>
          <button
            onClick={() => handleDurationChange(60)}
            className={`control-btn px-5 py-2.5 rounded-lg transition-all ${
              testDuration === 60 ? 'active-duration' : ''
            }`}
            disabled={isStarted && !isFinished}
          >
            60s
          </button>
        </div>
      </div>
      
      <div className="theme-toggle">
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn flex items-center justify-center w-12 h-12 rounded-full transition-all hover:scale-105 hover:shadow-lg"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Controls;
