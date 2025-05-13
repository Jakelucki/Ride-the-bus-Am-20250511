import React from 'react';
import { Card as CardType } from '../types/game';

interface CardProps {
  card: CardType;
  index: number;
}

const Card: React.FC<CardProps> = ({ card, index }) => {
  const { suit, rank, faceUp } = card;
  
  // Determine card color
  const isRed = suit === 'hearts' || suit === 'diamonds';
  const cardColor = isRed ? 'text-red-600' : 'text-gray-900';
  
  // Get suit symbol
  const getSuitSymbol = () => {
    switch (suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return '';
    }
  };
  
  return (
    <div 
      className={`relative perspective-[1000px] w-[120px] h-[180px] mx-2
        transition-transform duration-300 ease-in-out
        hover:scale-105 hover:shadow-lg
        transform ${index === 0 ? 'rotate-3' : index === 1 ? 'rotate-0' : 'rotate-[-3deg]'}`}
    >
      <div 
        className={`absolute w-full h-full transition-all duration-500 ease-in-out 
          preserve-3d ${faceUp ? 'rotate-y-0' : 'rotate-y-180'}`}
      >
        {/* Front of card */}
        <div 
          className={`absolute w-full h-full backface-hidden
            bg-white border-2 border-gray-300 rounded-lg shadow-md
            flex flex-col justify-between p-2 ${cardColor}`}
        >
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">{rank}</div>
            <div className="text-xl">{getSuitSymbol()}</div>
          </div>
          
          <div className="flex-grow flex items-center justify-center">
            <div className="text-4xl">{getSuitSymbol()}</div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-xl">{getSuitSymbol()}</div>
            <div className="text-xl font-bold">{rank}</div>
          </div>
        </div>
        
        {/* Back of card */}
        <div 
          className="absolute w-full h-full backface-hidden rotate-y-180
            bg-gradient-to-br from-blue-800 to-blue-600 
            border-2 border-gray-300 rounded-lg shadow-md
            flex items-center justify-center"
        >
          <div className="h-3/4 w-3/4 rounded-lg border-2 border-white 
            flex items-center justify-center bg-blue-700">
            <div className="text-white text-2xl font-bold rotate-[-35deg]">RTB</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;