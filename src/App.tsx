import React from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import GameOverModal from './components/GameOverModal';
import CashOutModal from './components/CashOutModal';
import InfoPanel from './components/InfoPanel';
import GameControls from './components/GameControls';
import useGameState from './hooks/useGameState';
import { getStageInstructions } from './utils/gameLogic';

function App() {
  const {
    gameState,
    setBetAmount,
    placeBet,
    makeChoice,
    resetGame,
    cashOut,
    continueGame,
    closeGameOverModal
  } = useGameState();

  const {
    balance,
    betAmount,
    currentStage,
    potentialWinnings,
    isGameOverModalOpen,
    showCashOutModal,
    currentCards
  } = gameState;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />
      
      <main className="container mx-auto px-4 pb-20">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-400">{getStageInstructions(currentStage)}</h2>
        </div>
        
        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-4xl bg-green-800 rounded-2xl p-6 shadow-2xl border-4 border-green-700">
            <div className="flex justify-center items-center min-h-[200px] mb-6">
              {currentCards.map((card, index) => (
                <div
                  key={index}
                  className={`transform ${index === 0 ? '-rotate-12' : index === 1 ? 'rotate-0' : 'rotate-12'}`}
                >
                  {/* Card component here */}
                </div>
              ))}
            </div>
            
            <GameControls
              stage={currentStage}
              balance={balance}
              betAmount={betAmount}
              potentialWinnings={potentialWinnings}
              onBetChange={setBetAmount}
              onPlaceBet={placeBet}
              onChoice={makeChoice}
            />
          </div>
        </div>
        
        <GameOverModal
          isOpen={isGameOverModalOpen}
          balance={balance}
          onClose={closeGameOverModal}
          onReset={resetGame}
        />
        
        <CashOutModal
          isOpen={showCashOutModal}
          currentWinnings={potentialWinnings}
          onCashOut={cashOut}
          onContinue={continueGame}
        />
        
        <InfoPanel />
      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-3 text-center text-gray-500 text-sm">
        <p>Virtual coins only. No real money gambling.</p>
      </footer>
    </div>
  );
}

export default App;