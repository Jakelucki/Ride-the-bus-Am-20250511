import React from 'react';
import { Multiplier } from '../types/game';
import { formatAmount } from '../utils/gameLogic';
import { Coins, DollarSign, X } from 'lucide-react';

interface BettingControlsProps {
  balance: number;
  betAmount: number;
  selectedMultiplier: Multiplier | null;
  onBetChange: (amount: number) => void;
  onMultiplierSelect: (multiplier: Multiplier) => void;
  onPlaceBet: () => void;
  gameStatus: 'betting' | 'playing' | 'gameOver' | 'won';
}

const BettingControls: React.FC<BettingControlsProps> = ({
  balance,
  betAmount,
  selectedMultiplier,
  onBetChange,
  onMultiplierSelect,
  onPlaceBet,
  gameStatus
}) => {
  const multipliers: Multiplier[] = [2, 3, 4, 20];
  
  // Predefined bet amounts
  const quickBets = [10, 25, 50, 100];
  
  return (
    <div className="w-full max-w-4xl p-4 bg-green-900/90 rounded-xl border border-yellow-500 shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <Coins className="text-yellow-400 mr-2" size={24} />
          <span className="text-white text-lg font-medium">Balance:</span>
          <span className="text-yellow-400 text-xl font-bold ml-2">{formatAmount(balance)}</span>
        </div>
        
        <div className="flex items-center">
          <DollarSign className="text-white mr-2" size={20} />
          <span className="text-white text-lg font-medium mr-2">Bet:</span>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => onBetChange(parseInt(e.target.value) || 0)}
            min={1}
            max={balance}
            className="bg-green-800 text-white border border-yellow-500 rounded-md p-2 w-24 text-center"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-white text-lg mb-2 font-medium">Quick Bets:</div>
        <div className="flex flex-wrap justify-center gap-2">
          {quickBets.map((amount) => (
            <button
              key={amount}
              onClick={() => onBetChange(amount)}
              disabled={balance < amount}
              className={`
                py-2 px-4 rounded-full transition-all duration-200 transform
                ${balance < amount 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-yellow-600 text-white hover:bg-yellow-500 active:scale-95 hover:shadow-md'}
              `}
            >
              {formatAmount(amount)}
            </button>
          ))}
          <button
            onClick={() => onBetChange(Math.floor(balance / 2))}
            className="py-2 px-4 rounded-full bg-yellow-600 text-white hover:bg-yellow-500 transition-all duration-200 active:scale-95 hover:shadow-md"
          >
            Half
          </button>
          <button
            onClick={() => onBetChange(balance)}
            className="py-2 px-4 rounded-full bg-yellow-600 text-white hover:bg-yellow-500 transition-all duration-200 active:scale-95 hover:shadow-md"
          >
            Max
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-white text-lg mb-2 font-medium">Multiplier:</div>
        <div className="flex flex-wrap justify-center gap-3">
          {multipliers.map((multiplier) => (
            <button
              key={multiplier}
              onClick={() => onMultiplierSelect(multiplier)}
              className={`
                relative py-3 px-6 rounded-lg font-bold text-lg transition-all duration-200
                ${selectedMultiplier === multiplier
                  ? 'bg-yellow-400 text-green-900 ring-2 ring-offset-2 ring-yellow-300 shadow-lg scale-105'
                  : 'bg-green-700 text-white hover:bg-green-600'}
              `}
            >
              {multiplier}
              <X size={12} className="absolute top-1 right-1" />
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={onPlaceBet}
          disabled={!selectedMultiplier || balance < betAmount || gameStatus !== 'betting'}
          className={`
            py-3 px-8 rounded-lg text-xl font-bold transition-all duration-300 transform
            ${!selectedMultiplier || balance < betAmount || gameStatus !== 'betting'
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-500 hover:shadow-lg active:scale-95'}
          `}
        >
          Deal Card
        </button>
      </div>
    </div>
  );
};

export default BettingControls;