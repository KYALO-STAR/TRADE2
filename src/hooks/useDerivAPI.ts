'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface DerivAPIOptions {
  endpoint?: string
  appId?: string
}

export function useDerivAPI(options: DerivAPIOptions = {}) {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()

  const {
    endpoint = 'wss://ws.derivws.com/websockets/v3',
    appId = '1089' // Default Deriv app ID for demo
  } = options

  const connect = useCallback(async () => {
    if (isConnecting || isConnected) return

    setIsConnecting(true)
    setError(null)

    try {
      const ws = new WebSocket(`${endpoint}?app_id=${appId}`)
      
      ws.onopen = () => {
        console.log('Connected to Deriv API')
        setIsConnected(true)
        setIsConnecting(false)
        wsRef.current = ws
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          console.log('Received from Deriv API:', data)
          
          // Handle different message types
          handleAPIMessage(data)
        } catch (err) {
          console.error('Error parsing WebSocket message:', err)
        }
      }

      ws.onclose = (event) => {
        console.log('Disconnected from Deriv API:', event.code, event.reason)
        setIsConnected(false)
        setIsConnecting(false)
        wsRef.current = null

        // Auto-reconnect on unexpected disconnection
        if (!event.wasClean && event.code !== 1000) {
          console.log('Attempting to reconnect in 5 seconds...')
          reconnectTimeoutRef.current = setTimeout(() => {
            connect()
          }, 5000)
        }
      }

      ws.onerror = (event) => {
        console.error('WebSocket error:', event)
        setError('Connection error occurred')
        setIsConnecting(false)
      }

    } catch (err) {
      console.error('Failed to connect:', err)
      setError('Failed to establish connection')
      setIsConnecting(false)
    }
  }, [endpoint, appId, isConnecting, isConnected])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }

    if (wsRef.current) {
      wsRef.current.close(1000, 'User disconnected')
      wsRef.current = null
    }

    setIsConnected(false)
    setIsConnecting(false)
  }, [])

  const sendMessage = useCallback((message: any) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket not connected')
      return false
    }

    try {
      wsRef.current.send(JSON.stringify(message))
      return true
    } catch (err) {
      console.error('Failed to send message:', err)
      return false
    }
  }, [])

  // Handle different types of API messages
  const handleAPIMessage = (data: any) => {
    switch (data.msg_type) {
      case 'tick':
        // Handle price tick updates
        handlePriceTick(data)
        break
      case 'buy':
        // Handle contract purchase response
        handleContractPurchase(data)
        break
      case 'proposal':
        // Handle contract proposal response
        handleContractProposal(data)
        break
      case 'authorize':
        // Handle authorization response
        handleAuthorization(data)
        break
      default:
        console.log('Unhandled message type:', data.msg_type)
    }
  }

  const handlePriceTick = (data: any) => {
    // Emit price tick event or update state
    console.log('Price tick:', data.tick)
  }

  const handleContractPurchase = (data: any) => {
    // Handle successful contract purchase
    console.log('Contract purchased:', data.buy)
  }

  const handleContractProposal = (data: any) => {
    // Handle contract proposal (price calculation)
    console.log('Contract proposal:', data.proposal)
  }

  const handleAuthorization = (data: any) => {
    // Handle user authorization
    if (data.error) {
      console.error('Authorization failed:', data.error)
      setError('Authorization failed')
    } else {
      console.log('User authorized:', data.authorize)
    }
  }

  // API methods for trading operations
  const subscribeToPrices = useCallback((symbols: string[]) => {
    symbols.forEach(symbol => {
      sendMessage({
        ticks: symbol,
        subscribe: 1
      })
    })
  }, [sendMessage])

  const getContractProposal = useCallback((params: {
    contract_type: 'CALL' | 'PUT'
    symbol: string
    duration: number
    duration_unit: 's' | 'm' | 'h' | 'd'
    amount: number
    basis: 'stake' | 'payout'
  }) => {
    sendMessage({
      proposal: 1,
      ...params
    })
  }, [sendMessage])

  const buyContract = useCallback((proposalId: string, price: number) => {
    sendMessage({
      buy: proposalId,
      price: price
    })
  }, [sendMessage])

  const authorize = useCallback((token: string) => {
    sendMessage({
      authorize: token
    })
  }, [sendMessage])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  return {
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    sendMessage,
    subscribeToPrices,
    getContractProposal,
    buyContract,
    authorize
  }
}