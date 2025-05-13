import React, { useState } from 'react';
import { Info, HelpCircle, X } from 'lucide-react';

const InfoPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500 transition-colors duration-300 z-10"
        aria-label="Game Information"
      >
        <HelpCircle size={24} />
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70" onClick={() => setIsOpen(false)}>
          <div 
            className="bg-gradient-to-b from-gray-900 to-gray-800 p-6 rounded-xl max-w-lg w-full mx-4 shadow-2xl border border-blue-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Info className="text-blue-400 mr-2" size={20} />
                How to Play
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p>
                <span className="text-white font-semibold">Ride the Bus</span> is a gambling card game where you bet on the outcome of dealt cards.
              </p>
              
              <div>
                <h3 className="text-white font-medium mb-1">Game Rules:</h3>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Choose a multiplier (2x, 3x, 4x, or 20x)</li>
                  <li>Place your bet</li>
                  <li>A card will be dealt</li>
                  <li>Win or lose based on the multiplier rules</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-1">Multiplier Rules:</h3>
                <ul className="space-y-2">
                  <li><span className="text-yellow-400 font-medium">2x</span>: Win if the new card is higher than the previous card</li>
                  <li><span className="text-yellow-400 font-medium">3x</span>: Win if the new card is the same suit as the previous card</li>
                  <li><span className="text-yellow-400 font-medium">4x</span>: Win if the new card is within +/- 2 value of the previous card</li>
                  <li><span className="text-yellow-400 font-medium">20x</span>: Win if the new card is the same rank as the previous card</li>
                </ul>
              </div>
              
              <p>The game ends when you run out of coins. You can then choose to restart with 500 coins or end the game.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoPanel;