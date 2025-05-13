import React from 'react';
import { formatAmount } from '../utils/gameLogic';

interface GameOverModalProps {
  isOpen: boolean;
  balance: number;
  onClose: () => void;
  onReset: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  balance,
  onClose,
  onReset
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
      <div 
        className="bg-gradient-to-b from-gray-900 to-gray-800 p-6 rounded-xl max-w-md w-full mx-4 shadow-2xl border-2 border-red-600"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center text-white mb-4">Game Over</h2>
        
        <div className="mb-6 bg-gray-700/50 p-4 rounded-lg text-center">
          <p className="text-gray-300 mb-2">Your final balance</p>
          <p className="text-red-500 text-3xl font-bold">{formatAmount(balance)} coins</p>
        </div>
        
        <p className="text-gray-300 mb-6 text-center">
          You've run out of coins! Would you like to restart with a fresh balance of 500 coins or end the game?
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onReset}
            className="bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-500 transition-colors duration-200"
          >
            Restart Game (500 coins)
          </button>
          
          <button
            onClick={onClose}
            className="bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-500 transition-colors duration-200"
          >
            End Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;