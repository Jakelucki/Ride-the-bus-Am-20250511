import React from 'react';
import { formatAmount } from '../utils/gameLogic';
import { Coins, ArrowRight, X } from 'lucide-react';

interface CashOutModalProps {
  isOpen: boolean;
  currentWinnings: number;
  onCashOut: () => void;
  onContinue: () => void;
}

const CashOutModal: React.FC<CashOutModalProps> = ({
  isOpen,
  currentWinnings,
  onCashOut,
  onContinue
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
      <div 
        className="bg-gradient-to-b from-green-900 to-green-800 p-6 rounded-xl max-w-md w-full mx-4 shadow-2xl border-2 border-yellow-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Coins className="text-yellow-400 mr-2" size={24} />
            Cash Out Available
          </h2>
          <button onClick={onContinue} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <div className="mb-6 bg-green-700/50 p-4 rounded-lg text-center">
          <p className="text-gray-300 mb-2">Current Winnings</p>
          <p className="text-yellow-400 text-3xl font-bold">{formatAmount(currentWinnings)} coins</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onCashOut}
            className="bg-yellow-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-200 flex items-center justify-center"
          >
            <Coins size={20} className="mr-2" />
            Cash Out Now
          </button>
          
          <button
            onClick={onContinue}
            className="bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-500 transition-colors duration-200 flex items-center justify-center"
          >
            Continue Playing
            <ArrowRight size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashOutModal;