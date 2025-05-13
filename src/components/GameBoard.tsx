import React from 'react';
import Card from './Card';
import GameControls from './GameControls';
import GameHistory from './GameHistory';
import { GameState } from '../types/game';

interface GameBoardProps {
  gameState: GameState;
  onBetChange: (amount: number) => void;
  onMultiplierSelect: (multiplier: any) => void;
  onPlaceBet: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  onBetChange,
  onMultiplierSelect,
  onPlaceBet
}) => {
  const { currentCards, balance, betAmount, currentStage, potentialWinnings, message, history } = gameState;
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl bg-green-800 rounded-2xl p-6 shadow-2xl mb-6 border-4 border-green-700 relative overflow-hidden">
        {/* Card felt pattern overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        
        {/* Casino table rail */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-700"></div>
        
        {/* Message display */}
        <div className="bg-green-900/80 text-white p-3 rounded-lg mb-6 text-center font-medium">
          {message}
        </div>
        
        {/* Card display area */}
        <div className="flex flex-wrap justify-center items-center min-h-[220px] mb-8 gap-4">
          {currentCards.map((card, index) => (
            <div
              key={`${card.suit}-${card.rank}-${index}`}
              className={`transform transition-all duration-300
                ${index === currentCards.length - 1 ? 'scale-110' : 'scale-100'}
                ${getCardPosition(index, currentCards.length)}`}
            >
              <Card card={card} index={index} />
            </div>
          ))}
        </div>
        
        {/* Game controls */}
        <GameControls
          stage={currentStage}
          balance={balance}
          betAmount={betAmount}
          potentialWinnings={potentialWinnings}
          onBetChange={onBetChange}
          onPlaceBet={onPlaceBet}
          onChoice={onMultiplierSelect}
        />
      </div>
      
      {/* Game History */}
      {history.length > 0 && (
        <div className="w-full max-w-4xl mb-6">
          <GameHistory history={history} />
        </div>
      )}
    </div>
  );
};

// Helper function to calculate card positions
const getCardPosition = (index: number, totalCards: number): string => {
  if (totalCards <= 1) return '';
  
  // Calculate the spread angle based on the number of cards
  const spreadAngle = Math.min(5 * (totalCards - 1), 30);
  const anglePerCard = spreadAngle / (totalCards - 1);
  const currentAngle = (index - (totalCards - 1) / 2) * anglePerCard;
  
  // Add slight offset for each card
  const xOffset = index * 5;
  
  return `rotate-[${currentAngle}deg] translate-x-[${xOffset}px]`;
};

export default GameBoard;