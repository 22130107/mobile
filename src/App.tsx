import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import StockPortfolio from './components/StockPortfolio';
import OrderBook from './components/OrderBook';
import RealizedPnL from './components/RealizedPnL';
import AllUtilities from './components/AllUtilities';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<'home' | 'portfolio' | 'orderbook' | 'pnl' | 'utilities'>('home');

  return (
    <div className="min-h-screen bg-gray-100">
      {activeScreen === 'home' && <HomeScreen onNavigate={setActiveScreen} />}
      {activeScreen === 'portfolio' && <StockPortfolio onNavigate={setActiveScreen} />}
      {activeScreen === 'orderbook' && <OrderBook onNavigate={setActiveScreen} />}
      {activeScreen === 'pnl' && <RealizedPnL onNavigate={setActiveScreen} />}
      {activeScreen === 'utilities' && <AllUtilities onNavigate={setActiveScreen} />}
    </div>
  );
}