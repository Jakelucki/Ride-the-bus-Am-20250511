import React from 'react';
import { GameStage, CardSuit } from '../types/game';
import { formatAmount } from '../utils/gameLogic';
import { Coins, ArrowUp, ArrowDown, CircleDot, Square } from 'lucide-react';

interface GameControlsProps {
  stage: GameStage;
  balance: number;
  betAmount: number;
  potentialWinnings: number;
  onBetChange: (amount: number) => void;
  onPlaceBet: () => void;
  onChoice: (choice: any) => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  stage,
  balance,
  betAmount,
  potentialWinnings,
  onBetChange,
  onPlaceBet,
  onChoice
}) => {
  const quickBets = [10, 25, 50, 100, 250, 500];
  
  const renderBettingControls = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Coins className="text-yellow-400 mr-2" size={24} />
          <span className="text-white text-lg">Balance: </span>
          <span className="text-yellow-400 text-xl font-bold ml-2">{formatAmount(balance)}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-white">Bet:</span>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => onBetChange(Math.min(parseInt(e.target.value) || 0, 500))}
            className="w-24 bg-green-800 text-white border border-yellow-500 rounded px-2 py-1 text-center"
            max="500"
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center">
        {quickBets.map((amount) => (
          <button
            key={amount}
            onClick={() => onBetChange(amount)}
            disabled={balance < amount}
            className={`
              px-4 py-2 rounded-full transition-all duration-200
              ${balance < amount
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-yellow-600 hover:bg-yellow-500 text-white'}
            `}
          >
            {formatAmount(amount)}
          </button>
        ))}
      </div>
      
      <button
        onClick={onPlaceBet}
        disabled={betAmount <= 0 || betAmount > balance}
        className={`
          w-full py-3 rounded-lg text-xl font-bold transition-all duration-200
          ${betAmount <= 0 || betAmount > balance
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-red-600 hover:bg-red-500 text-white'}
        `}
      >
        Place Bet
      </button>
    </div>
  );

  const renderColorChoice = () => (
    <div className="flex gap-4 justify-center">
      <button
        onClick={() => onChoice('red')}
        className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors duration-200"
      >
        Red
      </button>
      <button
        onClick={() => onChoice('black')}
        className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors duration-200"
      >
        Black
      </button>
    </div>
  );

  const renderHighLowChoice = () => (
    <div className="flex gap-4 justify-center">
      <button
        onClick={() => onChoice('higher')}
        className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors duration-200 flex items-center"
      >
        <ArrowUp className="mr-2" /> Higher
      </button>
      <button
        onClick={() => onChoice('lower')}
        className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors duration-200 flex items-center"
      >
        <ArrowDown className="mr-2" /> Lower
      </button>
    </div>
  );

  const renderInOutChoice = () => (
    <div className="flex gap-4 justify-center">
      <button
        onClick={() => onChoice('inside')}
        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors duration-200 flex items-center"
      >
        <CircleDot className="mr-2" /> Inside
      </button>
      <button
        onClick={() => onChoice('outside')}
        className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors duration-200 flex items-center"
      >
        <Square className="mr-2" /> Outside
      </button>
    </div>
  );

  const renderSuitChoice = () => (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => onChoice('hearts')}
        className="bg-red-600 hover:bg-red-500 text-white px-6 py-4 rounded-lg font-bold text-xl transition-colors duration-200"
      >
        ♥ Hearts
      </button>
      <button
        onClick={() => onChoice('diamonds')}
        className="bg-red-600 hover:bg-red-500 text-white px-6 py-4 rounded-lg font-bold text-xl transition-colors duration-200"
      >
        ♦ Diamonds
      </button>
      <button
        onClick={() => onChoice('clubs')}
        className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-4 rounded-lg font-bold text-xl transition-colors duration-200"
      >
        ♣ Clubs
      </button>
      <button
        onClick={() => onChoice('spades')}
        className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-4 rounded-lg font-bold text-xl transition-colors duration-200"
      >
        ♠ Spades
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-4xl p-6 bg-green-900/90 rounded-xl border border-yellow-500 shadow-lg">
      {stage === 'betting' && renderBettingControls()}
      {stage === 'color' && renderColorChoice()}
      {stage === 'highLow' && renderHighLowChoice()}
      {stage === 'inOut' && renderInOutChoice()}
      {stage === 'suit' && renderSuitChoice()}
      
      {stage !== 'betting' && (
        <div className="mt-4 text-center">
          <p className="text-white">Potential Win:</p>
          <p className="text-yellow-400 text-2xl font-bold">{formatAmount(potentialWinnings)} coins</p>
        </div>
      )}
    </div>
  );
};

export default GameControls;