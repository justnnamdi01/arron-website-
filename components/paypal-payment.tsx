'use client'

import { useEffect, useRef, useState } from 'react'

interface PayPalPaymentProps {
  amount: string
  onSuccess: (details: any) => void
  onError: (error: any) => void
  disabled?: boolean
}

declare global {
  interface Window {
    paypal: any;
  }
}

export function PayPalPayment({ amount, onSuccess, onError, disabled = false }: PayPalPaymentProps) {
  const paypalRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPayPalReady, setIsPayPalReady] = useState(false)

  // Check if PayPal SDK is loaded
  useEffect(() => {
    let attempts = 0
    const maxAttempts = 50 // 5 seconds max wait time
    
    const checkPayPalReady = () => {
      attempts++
      
      if (window.paypal && window.paypal.Buttons && typeof window.paypal.Buttons === 'function') {
        setIsPayPalReady(true)
      } else if (attempts < maxAttempts) {
        // Check again after a short delay
        setTimeout(checkPayPalReady, 100)
      } else {
        // Failed to load after max attempts
        console.error('PayPal SDK failed to load after 5 seconds')
        onError(new Error('PayPal SDK failed to load. Please refresh the page and try again.'))
      }
    }

    checkPayPalReady()
  }, [onError])

  useEffect(() => {
    if (isPayPalReady && !isLoaded && paypalRef.current && !disabled) {
      try {
        setIsLoaded(true)
        
        window.paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount,
                  currency_code: 'USD'
                },
                description: 'Architecture Consultation Fee'
              }]
            })
          },
          onApprove: async (data: any, actions: any) => {
            try {
              const details = await actions.order.capture()
              onSuccess(details)
            } catch (error) {
              onError(error)
            }
          },
          onError: (error: any) => {
            onError(error)
          },
          style: {
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
            layout: 'vertical',
            height: 50,
            tagline: false
          }
        }).render(paypalRef.current)
      } catch (error) {
        console.error('PayPal Buttons initialization error:', error)
        onError(error)
        setIsLoaded(false)
      }
    }
  }, [amount, onSuccess, onError, isLoaded, isPayPalReady, disabled])

  // Clear and re-render when amount changes
  useEffect(() => {
    if (paypalRef.current && isLoaded) {
      paypalRef.current.innerHTML = ''
      setIsLoaded(false)
    }
  }, [amount])

  if (disabled) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-500">
        Complete the form above to enable payment
      </div>
    )
  }

  if (!isPayPalReady) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-2"></div>
        <p className="text-gray-600">Loading PayPal...</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-stone-900">Consultation Fee</h4>
            <p className="text-sm text-stone-600">Secure your initial consultation</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-stone-900">${amount}</div>
            <div className="text-xs text-stone-500">USD</div>
          </div>
        </div>
      </div>
      <div ref={paypalRef} className="min-h-[60px]" />
      <p className="text-xs text-stone-500 mt-2 text-center">
        Secure payment powered by PayPal. Your consultation fee will be credited toward your project cost.
      </p>
    </div>
  )
}
