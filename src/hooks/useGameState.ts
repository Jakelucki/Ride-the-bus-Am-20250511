import { useState, useEffect } from 'react';
import { Card, GameState, GameStage, PlayerChoice } from '../types/game';
import { createDeck, dealCards, determineWin, getMultiplierForStage, getNextStage } from '../utils/gameLogic';

const initialState: GameState = {
  balance: 500,
  deck: [],
  currentCards: [],
  betAmount: 10,
  currentStage: 'betting',
  potentialWinnings: 0,
  message: 'Place your bet to begin!',
  history: [],
  isGameOverModalOpen: false,
  showCashOutModal: false,
};

export default function useGameState() {
  const [gameState, setGameState] = useState<GameState>({ ...initialState });

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const newDeck = createDeck();
    setGameState({
      ...initialState,
      deck: newDeck,
      currentCards: [], // Clear cards on reset
    });
  };

  const setBetAmount = (amount: number) => {
    if (amount < 0) return;
    if (amount > 500) amount = 500;
    if (amount > gameState.balance) amount = gameState.balance;
    
    setGameState(prev => ({
      ...prev,
      betAmount: amount,
      potentialWinnings: amount * getMultiplierForStage('color')
    }));
  };

  const placeBet = () => {
    if (gameState.betAmount <= 0 || gameState.betAmount > gameState.balance) return;

    const { cards, remainingDeck } = dealCards(gameState.deck, 1, false);
    
    setGameState(prev => ({
      ...prev,
      deck: remainingDeck,
      currentCards: [...prev.currentCards, ...cards],
      currentStage: 'color',
      balance: prev.balance - prev.betAmount
    }));
  };

  const makeChoice = (choice: PlayerChoice) => {
    const { currentStage, currentCards, deck } = gameState;
    
    // Flip the current card face up
    const updatedCards = [...currentCards];
    updatedCards[updatedCards.length - 1].faceUp = true;
    
    const won = determineWin(updatedCards, currentStage, choice);
    const nextStage = getNextStage(currentStage);
    
    if (won) {
      const multiplier = getMultiplierForStage(currentStage);
      const newPotentialWinnings = gameState.betAmount * multiplier;
      
      if (nextStage === 'complete') {
        // Game won, add winnings to balance
        setGameState(prev => ({
          ...prev,
          balance: prev.balance + newPotentialWinnings,
          currentStage: 'betting',
          currentCards: [], // Clear cards after winning the final stage
          showCashOutModal: false,
          history: [
            {
              stage: currentStage,
              betAmount: prev.betAmount,
              result: 'win',
              winAmount: newPotentialWinnings,
              timestamp: Date.now()
            },
            ...prev.history
          ].slice(0, 10)
        }));
      } else {
        // Deal next card for next stage
        const { cards, remainingDeck } = dealCards(deck, 1, false);
        setGameState(prev => ({
          ...prev,
          deck: remainingDeck,
          currentCards: [...updatedCards, ...cards],
          currentStage: nextStage,
          potentialWinnings: newPotentialWinnings,
          showCashOutModal: true
        }));
      }
    } else {
      // Game lost, clear the cards
      setGameState(prev => ({
        ...prev,
        currentStage: 'betting',
        currentCards: [], // Clear cards on loss
        history: [
          {
            stage: currentStage,
            betAmount: prev.betAmount,
            result: 'loss',
            winAmount: 0,
            timestamp: Date.now()
          },
          ...prev.history
        ].slice(0, 10),
        isGameOverModalOpen: prev.balance <= 0
      }));
    }
  };

  const cashOut = () => {
    setGameState(prev => ({
      ...prev,
      balance: prev.balance + prev.potentialWinnings,
      currentStage: 'betting',
      currentCards: [], // Clear cards after cashing out
      showCashOutModal: false,
      history: [
        {
          stage: prev.currentStage,
          betAmount: prev.betAmount,
          result: 'win',
          winAmount: prev.potentialWinnings,
          timestamp: Date.now()
        },
        ...prev.history
      ].slice(0, 10)
    }));
  };

  const continueGame = () => {
    setGameState(prev => ({
      ...prev,
      showCashOutModal: false
    }));
  };

  const closeGameOverModal = () => {
    setGameState(prev => ({
      ...prev,
      isGameOverModalOpen: false
    }));
  };

  return {
    gameState,
    setBetAmount,
    placeBet,
    makeChoice,
    resetGame,
    cashOut,
    continueGame,
    closeGameOverModal
  };
}