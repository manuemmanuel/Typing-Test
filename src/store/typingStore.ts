import { create } from 'zustand';
import { getRandomQuote } from '../data/quotes';

interface TypingState {
  text: string;
  typedText: string;
  isStarted: boolean;
  isFinished: boolean;
  startTime: number | null;
  endTime: number | null;
  timer: number;
  timerInterval: number | null;
  accuracy: number;
  wpm: number;
  cpm: number;
  errors: number;
  currentIndex: number;
  testDuration: number;
  theme: 'light' | 'dark';
  currentText: string;
  
  setText: (text: string) => void;
  setTypedText: (text: string) => void;
  startTest: () => void;
  finishTest: () => void;
  resetTest: () => void;
  retryTest: () => void;
  startNewTest: () => void;
  updateStats: () => void;
  setTestDuration: (duration: number) => void;
  toggleTheme: () => void;
  decrementTimer: () => void;
}

export const useTypingStore = create<TypingState>((set, get) => ({
  text: '',
  typedText: '',
  isStarted: false,
  isFinished: false,
  startTime: null,
  endTime: null,
  timer: 60,
  timerInterval: null,
  accuracy: 0,
  wpm: 0,
  cpm: 0,
  errors: 0,
  currentIndex: 0,
  testDuration: 60,
  theme: 'dark',
  currentText: '',
  
  setText: (text) => set({ text, currentText: text }),
  
  setTypedText: (typedText) => {
    const state = get();
    
    if (!state.isStarted && typedText.length > 0) {
      state.startTest();
    }
    
    const currentIndex = typedText.length;
    
    // Count errors
    let errors = 0;
    for (let i = 0; i < currentIndex; i++) {
      if (typedText[i] !== state.text[i]) {
        errors++;
      }
    }
    
    set({ typedText, currentIndex, errors });
    state.updateStats();
    
    // Check if test is complete
    if (currentIndex === state.text.length) {
      state.finishTest();
    }
  },
  
  startTest: () => {
    const timerInterval = window.setInterval(() => {
      get().decrementTimer();
    }, 1000);
    
    set({ 
      isStarted: true, 
      startTime: Date.now(),
      timerInterval,
      timer: get().testDuration
    });
  },
  
  finishTest: () => {
    const { timerInterval } = get();
    if (timerInterval) clearInterval(timerInterval);
    
    set({ 
      isFinished: true, 
      endTime: Date.now(),
      timerInterval: null
    });
  },
  
  resetTest: () => {
    const { timerInterval } = get();
    if (timerInterval) clearInterval(timerInterval);
    
    set({ 
      typedText: '',
      isStarted: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      timerInterval: null,
      accuracy: 0,
      wpm: 0,
      cpm: 0,
      errors: 0,
      currentIndex: 0,
      timer: get().testDuration
    });
  },
  
  retryTest: () => {
    const { timerInterval, currentText } = get();
    if (timerInterval) clearInterval(timerInterval);
    
    set({ 
      text: currentText,
      typedText: '',
      isStarted: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      timerInterval: null,
      accuracy: 0,
      wpm: 0,
      cpm: 0,
      errors: 0,
      currentIndex: 0,
      timer: get().testDuration
    });
  },
  
  startNewTest: () => {
    const { timerInterval, testDuration } = get();
    if (timerInterval) clearInterval(timerInterval);
    
    const newText = getRandomQuote(testDuration);
    
    set({ 
      text: newText,
      currentText: newText,
      typedText: '',
      isStarted: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      timerInterval: null,
      accuracy: 0,
      wpm: 0,
      cpm: 0,
      errors: 0,
      currentIndex: 0,
      timer: testDuration
    });
  },
  
  updateStats: () => {
    const { typedText, startTime, errors } = get();
    
    if (!startTime) return;
    
    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
    const typedWords = typedText.trim().split(/\s+/).length;
    const correctChars = typedText.length - errors;
    
    // Avoid division by zero
    if (timeElapsed <= 0) return;
    
    // Words per minute
    const wpm = Math.round(typedWords / timeElapsed);
    
    // Characters per minute
    const cpm = Math.round(typedText.length / timeElapsed);
    
    // Accuracy percentage
    const accuracy = typedText.length > 0 
      ? Math.round((correctChars / typedText.length) * 100) 
      : 0;
    
    set({ wpm, cpm, accuracy });
  },
  
  setTestDuration: (testDuration) => {
    set({ testDuration, timer: testDuration });
  },
  
  toggleTheme: () => {
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }));
  },
  
  decrementTimer: () => {
    const { timer, finishTest } = get();
    
    if (timer <= 1) {
      finishTest();
      set({ timer: 0 });
    } else {
      set({ timer: timer - 1 });
    }
  }
}));
