'use client';

import { useState, useEffect } from 'react';
import { useDerivAPI } from '@/hooks/useDerivAPI';
import { authService } from '@/lib/auth';

const Trade = () => {
  const [tick, setTick] = useState<{ quote: number; epoch: number } | null>(null);
  const [asset] = useState({ name: 'Volatility 100 Index', symbol: 'R_100' });
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const appId = process.env.NEXT_PUBLIC_DERIV_APP_ID || '1089';
  const { 
    isConnected, 
    isConnecting, 
    error: apiError, 
    connect, 
    authorize, 
    subscribeToPrices,
    sendMessage 
  } = useDerivAPI({ 
    endpoint: 'wss://ws.binaryws.com/websockets/v3', 
    appId 
  });

  // Get user's Deriv token from auth state and connect
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user?.derivToken) {
      setAuthError('No Deriv API token found. Please sign in with a valid token.');
      return;
    }

    // Clear any previous auth error
    setAuthError(null);

    // Connect to Deriv API
    if (!isConnected && !isConnecting) {
      connect();
    }
  }, [connect, isConnected, isConnecting]);

  // Authorize with user's token once connected
  useEffect(() => {
    if (isConnected && !isAuthorized) {
      const user = authService.getCurrentUser();
      if (user?.derivToken) {
        console.log('Authorizing with Deriv API...');
        authorize(user.derivToken);
        setIsAuthorized(true); // Assume success for now - in production, listen for response
      }
    }
  }, [isConnected, isAuthorized, authorize]);

  // Subscribe to price ticks once authorized
  useEffect(() => {
    if (isConnected && isAuthorized) {
      console.log('Subscribing to price ticks for', asset.symbol);
      subscribeToPrices([asset.symbol]);
    }
  }, [isConnected, isAuthorized, subscribeToPrices, asset.symbol]);

  const handleTrade = (type: 'buy' | 'sell') => {
    alert(`Trading is not implemented yet. Action: ${type.toUpperCase()}`);
  };

  const displayError = authError || apiError;

  return (
    <div className='border border-gray-300 p-5 rounded-lg max-w-sm mx-auto text-center bg-white shadow-lg'>
      <h2 className="text-xl font-bold mb-4">{asset.name}</h2>
      
      {/* Connection Status */}
      <div className="connection-status mb-4">
        {isConnecting && <p className="text-yellow-500">Connecting to Deriv API...</p>}
        {isConnected && isAuthorized && <p className="text-green-500">✓ Connected & Authorized</p>}
        {isConnected && !isAuthorized && <p className="text-yellow-500">Connected, authorizing...</p>}
        {!isConnected && !isConnecting && <p className="text-red-500">Not connected</p>}
      </div>

      {/* Error Display */}
      {displayError && <p className="text-red-500 bg-red-100 p-2 rounded mb-4">Error: {displayError}</p>}
      
      {/* Price Display */}
      {tick ? (
        <div className="price-display mb-4">
          <p className='price text-2xl font-bold my-5'>Price: {tick.quote}</p>
          <p className="text-sm text-gray-500">Last updated: {new Date(tick.epoch * 1000).toLocaleTimeString()}</p>
        </div>
      ) : (
        <p className="text-gray-500 mb-4">
          {isConnected && isAuthorized ? 'Waiting for price data...' : 'Loading...'}
        </p>
      )}
      
      {/* Trading Actions */}
      <div className='trade-actions flex justify-around mt-5'>
        <button 
          className='buy-button bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded disabled:opacity-50' 
          onClick={() => handleTrade('buy')}
          disabled={!isConnected || !isAuthorized}
        >
          Buy
        </button>
        <button 
          className='sell-button bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded disabled:opacity-50' 
          onClick={() => handleTrade('sell')}
          disabled={!isConnected || !isAuthorized}
        >
          Sell
        </button>
      </div>
    </div>
  );
};

export default Trade;