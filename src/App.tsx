import { useEffect } from 'react';
import { useTypingStore } from './store/typingStore';
import { getRandomQuote } from './data/quotes';
import TextDisplay from './components/TextDisplay';
import TypingInput from './components/TypingInput';
import Stats from './components/Stats';
import Controls from './components/Controls';
import Results from './components/Results';
import Header from './components/Header';
import Footer from './components/Footer';
import '@fontsource/space-grotesk/300.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/roboto-mono';
import './index.css';

export function App() {
  const { setText, theme, testDuration } = useTypingStore();

  useEffect(() => {
    // Load fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600&family=Space+Grotesk:wght@300;400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Set initial text based on the test duration
    setText(getRandomQuote(testDuration));

    return () => {
      document.head.removeChild(link);
    };
  }, [setText, testDuration]);

  return (
    <div className={`app min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : 'light'}`} onClick={() => document.querySelector('input')?.focus()}>
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <Header />
        
        <div className="flex-1 flex flex-col justify-center">
          <Stats />
          <TextDisplay />
          <TypingInput />
          <Controls />
        </div>
        
        <Footer />
        <Results />
      </div>
    </div>
  );
}

export default App;
