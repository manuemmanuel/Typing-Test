import React from 'react';
import { useTypingStore } from '../store/typingStore';

const Stats: React.FC = () => {
  const { wpm, accuracy, cpm, errors, isStarted, timer } = useTypingStore();

  return (
    <div className="stats-container flex justify-center gap-8 mb-12 mt-4">
      <div className="stat-item text-center group">
        <div className="stat-value text-4xl font-bold transition-all group-hover:transform group-hover:scale-110">
          {wpm}
        </div>
        <div className="stat-label text-sm opacity-70 uppercase tracking-wide font-medium">WPM</div>
      </div>
      
      <div className="stat-item text-center group">
        <div className="stat-value text-4xl font-bold transition-all group-hover:transform group-hover:scale-110">
          {accuracy}%
        </div>
        <div className="stat-label text-sm opacity-70 uppercase tracking-wide font-medium">ACCURACY</div>
      </div>
      
      <div className="stat-item text-center group">
        <div className="stat-value text-4xl font-bold transition-all group-hover:transform group-hover:scale-110">
          {errors}
        </div>
        <div className="stat-label text-sm opacity-70 uppercase tracking-wide font-medium">ERRORS</div>
      </div>
      
      <div className="stat-item text-center group">
        <div className="stat-value text-4xl font-bold transition-all group-hover:transform group-hover:scale-110">
          {cpm}
        </div>
        <div className="stat-label text-sm opacity-70 uppercase tracking-wide font-medium">CPM</div>
      </div>
      
      <div className="stat-item text-center group">
        <div className="stat-value text-4xl font-bold transition-all group-hover:transform group-hover:scale-110">
          {isStarted ? timer : '-'}
        </div>
        <div className="stat-label text-sm opacity-70 uppercase tracking-wide font-medium">TIME</div>
      </div>
    </div>
  );
};

export default Stats;
