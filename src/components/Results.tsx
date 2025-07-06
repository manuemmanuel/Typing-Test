import React, { useEffect, useRef } from 'react';
import { useTypingStore } from '../store/typingStore';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend
} from 'recharts';
import { ArrowRight, Copy, RefreshCw, Share2 } from 'lucide-react';

const Results: React.FC = () => {
  const { 
    isFinished, 
    wpm, 
    accuracy, 
    errors, 
    cpm,
    typedText,
    resetTest,
    setText,
    text,
    retryTest,
    startNewTest,
    theme
  } = useTypingStore();

  const resultsModalRef = useRef<HTMLDivElement>(null);

  // Ensure the modal scrolls to the top when it appears
  useEffect(() => {
    if (isFinished && resultsModalRef.current) {
      resultsModalRef.current.scrollTop = 0;
      
      // Also ensure the body doesn't scroll behind the modal
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isFinished]);

  const handleRetry = () => {
    retryTest();
  };

  const handleNewTest = () => {
    startNewTest();
  };

  const handleShare = () => {
    // Simulate sharing functionality with a copy to clipboard
    const shareText = `Just finished a typing test on TypeRhythm with ${wpm} WPM and ${accuracy}% accuracy!`;
    
    try {
      navigator.clipboard.writeText(shareText);
      
      // Show toast notification (simple implementation)
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300';
      toast.innerText = 'Results copied to clipboard!';
      document.body.appendChild(toast);
      
      // Remove toast after 3 seconds
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 3000);
      
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!isFinished) {
    return null;
  }

  const totalChars = typedText.length;
  const correctChars = totalChars - errors;
  
  // Generate data for character accuracy pie chart
  const pieData = [
    { name: 'Correct', value: correctChars, color: '#4ade80' },
    { name: 'Errors', value: errors, color: '#f87171' },
  ];
  
  // Generate sample performance data (in a real app, this would come from actual keystrokes)
  const performanceData = Array.from({ length: 10 }, (_, i) => ({
    second: i + 1,
    wpm: Math.round(wpm * (0.5 + Math.random() * 0.5)),
  }));
  
  // Generate character frequency data
  const charFrequencyMap: Record<string, number> = {};
  for (let char of typedText) {
    if (char === ' ') char = 'space';
    charFrequencyMap[char] = (charFrequencyMap[char] || 0) + 1;
  }
  
  const charFrequencyData = Object.entries(charFrequencyMap)
    .map(([char, count]) => ({ char, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
  
  return (
    <div className="results-container fixed inset-0 flex items-start justify-center z-10 backdrop-blur-xl overflow-auto pt-4 pb-6">
      <div 
        ref={resultsModalRef}
        className="results-modal max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8 rounded-2xl w-full max-w-4xl shadow-2xl backdrop-blur-md backdrop-saturate-150 border border-white/10 animate-scaleIn mt-2 sm:mt-4 md:mt-6 mb-6"
      >
        <div className="mb-4 sm:mb-6 md:mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 tracking-tight">Test Complete!</h2>
          <p className="text-xs sm:text-sm opacity-70">Here are your typing results</p>
        </div>
        
        <div className="flex flex-wrap justify-center sm:justify-around gap-3 mb-6 sm:mb-8 md:mb-10">
          <div className="text-center p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all hover:transform hover:scale-105 hover:bg-white/10 flex-1 min-w-[90px] max-w-[120px]">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 gradient-text">{wpm}</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-wide opacity-70">WORDS/MIN</div>
          </div>
          
          <div className="text-center p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all hover:transform hover:scale-105 hover:bg-white/10 flex-1 min-w-[90px] max-w-[120px]">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 gradient-text">{accuracy}%</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-wide opacity-70">ACCURACY</div>
          </div>
          
          <div className="text-center p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all hover:transform hover:scale-105 hover:bg-white/10 flex-1 min-w-[90px] max-w-[120px]">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 gradient-text">{errors}</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-wide opacity-70">ERRORS</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10">
          {/* WPM over time chart */}
          <div className="chart-container p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3 opacity-80">WPM Over Time</h3>
            <div className="h-[180px] sm:h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWpmLight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorWpmDark" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={theme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 
                  />
                  <XAxis 
                    dataKey="second" 
                    stroke={theme === 'dark' ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.6)"}
                    tick={{fill: theme === 'dark' ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"}}
                  />
                  <YAxis 
                    stroke={theme === 'dark' ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.6)"}
                    tick={{fill: theme === 'dark' ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"}}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme === 'dark' ? 'rgba(23,23,23,0.9)' : 'rgba(255,255,255,0.95)', 
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      boxShadow: theme === 'dark' ? '0 4px 12px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)',
                      color: theme === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="wpm" 
                    stroke={theme === 'dark' ? "#60a5fa" : "#2563eb"} 
                    fillOpacity={1} 
                    fill={`url(#colorWpm${theme === 'dark' ? 'Dark' : 'Light'})`} 
                    strokeWidth={2}
                    animationDuration={1000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Character accuracy pie chart */}
          <div className="chart-container p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3 opacity-80">Accuracy Breakdown</h3>
            <div className="h-[180px] sm:h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={window.innerWidth < 640 ? 40 : 60}
                    outerRadius={window.innerWidth < 640 ? 60 : 80}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1000}
                    animationBegin={200}
                    stroke={theme === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.1)"}
                    strokeWidth={1}
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={theme === 'dark' 
                          ? entry.color 
                          : entry.name === 'Correct' 
                            ? '#16a34a' 
                            : '#dc2626'
                        } 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value} characters`, name]}
                    contentStyle={{ 
                      backgroundColor: theme === 'dark' ? 'rgba(23,23,23,0.9)' : 'rgba(255,255,255,0.95)', 
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      boxShadow: theme === 'dark' ? '0 4px 12px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)',
                      color: theme === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)'
                    }}
                  />
                  <Legend 
                    formatter={(value) => (
                      <span style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)' }}>
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Character frequency chart */}
          <div className="chart-container p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3 opacity-80">Most Typed Characters</h3>
            <div className="h-[180px] sm:h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charFrequencyData.slice(0, window.innerWidth < 640 ? 5 : 8)} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={theme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 
                  />
                  <XAxis 
                    dataKey="char" 
                    stroke={theme === 'dark' ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.6)"}
                    tick={{fill: theme === 'dark' ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"}}
                  />
                  <YAxis 
                    stroke={theme === 'dark' ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.6)"}
                    tick={{fill: theme === 'dark' ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"}}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme === 'dark' ? 'rgba(23,23,23,0.9)' : 'rgba(255,255,255,0.95)', 
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      boxShadow: theme === 'dark' ? '0 4px 12px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)',
                      color: theme === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)'
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#8884d8" 
                    animationDuration={1200}
                    animationBegin={400}
                    radius={[4, 4, 0, 0]}
                  >
                    {charFrequencyData.map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={theme === 'dark' 
                          ? `rgba(134, 239, 172, ${0.3 + (index * 0.1)})` 
                          : `rgba(22, 163, 74, ${0.4 + (index * 0.1)})`
                        } 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Stats summary */}
          <div className="stats-grid grid grid-cols-2 gap-3 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <div className="p-2 sm:p-4 rounded-lg bg-white/5">
              <div className="font-medium opacity-70 text-xs sm:text-sm uppercase tracking-wide">Characters</div>
              <div className="text-xl sm:text-2xl font-semibold mt-1">{totalChars}</div>
            </div>
            
            <div className="p-2 sm:p-4 rounded-lg bg-white/5">
              <div className="font-medium opacity-70 text-xs sm:text-sm uppercase tracking-wide">Correct</div>
              <div className="text-xl sm:text-2xl font-semibold mt-1">{correctChars}</div>
            </div>
            
            <div className="p-2 sm:p-4 rounded-lg bg-white/5">
              <div className="font-medium opacity-70 text-xs sm:text-sm uppercase tracking-wide">Errors</div>
              <div className="text-xl sm:text-2xl font-semibold mt-1">{errors}</div>
            </div>
            
            <div className="p-2 sm:p-4 rounded-lg bg-white/5">
              <div className="font-medium opacity-70 text-xs sm:text-sm uppercase tracking-wide">CPM</div>
              <div className="text-xl sm:text-2xl font-semibold mt-1">{cpm}</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-10">
          <button 
            onClick={handleRetry}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg hover:bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center gap-2"
            aria-label="Try again with the same text"
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
          
          <button 
            onClick={handleNewTest}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center gap-2"
            aria-label="Start a new test with different text"
          >
            <ArrowRight size={16} />
            <span>New Test</span>
          </button>
          
          <button 
            onClick={handleShare}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg hover:bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center gap-2"
            aria-label="Share your results"
          >
            <Share2 size={16} />
            <span>Share Results</span>
          </button>
        </div>
        
        <div className="text-center mt-3 sm:mt-4 text-[10px] sm:text-xs opacity-60">
          <p>Press Tab key to restart test</p>
        </div>
      </div>
    </div>
  );
};

export default Results;
