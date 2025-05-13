import React from 'react';
import { GameHistoryItem } from '../types/game';
import { formatAmount } from '../utils/gameLogic';
import { HistoryIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface GameHistoryProps {
  history: GameHistoryItem[];
}

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
  if (history.length === 0) return null;
  
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-700">
      <div className="flex items-center mb-3">
        <HistoryIcon className="text-gray-400 mr-2" size={20} />
        <h3 className="text-white text-lg font-medium">Recent Games</h3>
      </div>
      
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {history.map((item, index) => {
          const isWin = item.result === 'win';
          const time = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          return (
            <div 
              key={index}
              className={`
                p-3 rounded-lg flex items-center justify-between 
                ${isWin ? 'bg-green-900/50' : 'bg-red-900/30'}
                border ${isWin ? 'border-green-700' : 'border-red-800'}
                transition-all duration-300 hover:shadow-md
              `}
            >
              <div className="flex items-center">
                {isWin ? (
                  <TrendingUp className="text-green-400 mr-2" size={18} />
                ) : (
                  <TrendingDown className="text-red-400 mr-2" size={18} />
                )}
                <span className="text-gray-300 text-sm mr-2">{time}</span>
                <span className="text-gray-200">
                  {item.multiplier}x multiplier
                </span>
              </div>
              
              <div className={`font-medium ${isWin ? 'text-green-400' : 'text-red-400'}`}>
                {isWin 
                  ? `+${formatAmount(item.winAmount || 0)}`
                  : `-${formatAmount(item.betAmount)}`
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameHistory;