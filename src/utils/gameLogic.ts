import { Card, CardRank, CardSuit, GameStage, PlayerChoice } from '../types/game';

export const createDeck = (): Card[] => {
  const suits: CardSuit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  const ranks: CardRank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const deck: Card[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank, faceUp: false });
    }
  }

  return shuffleDeck(deck);
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};

export const dealCards = (deck: Card[], numCards: number, faceUp: boolean = true): { cards: Card[]; remainingDeck: Card[] } => {
  const cards = deck.slice(0, numCards).map(card => ({ ...card, faceUp }));
  const remainingDeck = deck.slice(numCards);
  return { cards, remainingDeck };
};

export const getCardValue = (card: Card): number => {
  if (card.rank === 'A') return 14; // Ace is highest
  if (card.rank === 'J') return 11;
  if (card.rank === 'Q') return 12;
  if (card.rank === 'K') return 13;
  return parseInt(card.rank);
};

export const getCardColor = (card: Card): 'red' | 'black' => {
  return card.suit === 'hearts' || card.suit === 'diamonds' ? 'red' : 'black';
};

export const determineWin = (cards: Card[], stage: GameStage, choice: PlayerChoice): boolean => {
  const currentCard = cards[cards.length - 1];
  
  switch (stage) {
    case 'color':
      return getCardColor(currentCard) === choice;
      
    case 'highLow': {
      const previousCard = cards[cards.length - 2];
      const currentValue = getCardValue(currentCard);
      const previousValue = getCardValue(previousCard);
      return choice === 'higher' ? currentValue > previousValue : currentValue < previousValue;
    }
    
    case 'inOut': {
      const card1 = cards[cards.length - 3];
      const card2 = cards[cards.length - 2];
      const currentValue = getCardValue(currentCard);
      const value1 = getCardValue(card1);
      const value2 = getCardValue(card2);
      const min = Math.min(value1, value2);
      const max = Math.max(value1, value2);
      const isInside = currentValue > min && currentValue < max;
      return choice === 'inside' ? isInside : !isInside;
    }
    
    case 'suit':
      return currentCard.suit === choice;
      
    default:
      return false;
  }
};

export const getMultiplierForStage = (stage: GameStage): number => {
  switch (stage) {
    case 'color': return 2;
    case 'highLow': return 3;
    case 'inOut': return 4;
    case 'suit': return 20;
    default: return 0;
  }
};

export const formatAmount = (amount: number): string => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getNextStage = (currentStage: GameStage): GameStage => {
  switch (currentStage) {
    case 'betting': return 'color';
    case 'color': return 'highLow';
    case 'highLow': return 'inOut';
    case 'inOut': return 'suit';
    case 'suit': return 'complete';
    default: return 'betting';
  }
};

export const getStageInstructions = (stage: GameStage): string => {
  switch (stage) {
    case 'betting':
      return 'Place your bet to begin!';
    case 'color':
      return 'Will the next card be Red or Black?';
    case 'highLow':
      return 'Will the next card be Higher or Lower?';
    case 'inOut':
      return 'Will the next card be Inside or Outside the range?';
    case 'suit':
      return 'Choose a suit for the final card!';
    default:
      return 'Game Complete!';
  }
};