export type CardSuit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type CardRank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
export type CardColor = 'red' | 'black';

export interface Card {
  suit: CardSuit;
  rank: CardRank;
  faceUp: boolean;
}

export type GameStage = 'betting' | 'color' | 'highLow' | 'inOut' | 'suit' | 'complete';
export type PlayerChoice = 'red' | 'black' | 'higher' | 'lower' | 'inside' | 'outside' | CardSuit;

export interface GameState {
  balance: number;
  deck: Card[];
  currentCards: Card[];
  betAmount: number;
  currentStage: GameStage;
  potentialWinnings: number;
  message: string;
  history: GameHistoryItem[];
  isGameOverModalOpen: boolean;
  showCashOutModal: boolean;
}

export interface GameHistoryItem {
  stage: GameStage;
  betAmount: number;
  result: 'win' | 'loss';
  winAmount: number;
  timestamp: number;
}