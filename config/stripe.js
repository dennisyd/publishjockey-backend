// DISABLED: const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create a mock Stripe object with required methods
const stripe = {
  checkout: {
    sessions: {
      create: async () => ({ 
        id: 'mock_session_id', 
        url: '#mock-checkout-url' 
      }),
      retrieve: async () => ({
        id: 'mock_session_id',
        status: 'success',
        payment_status: 'paid',
        metadata: { userId: '', planId: 'author' }
      })
    }
  },
  webhooks: {
    constructEvent: () => ({ type: 'mock_event', data: { object: {} } })
  }
};

// Define the subscription plans with their Stripe product/price IDs
const SUBSCRIPTION_PLANS = {
  author: {
    name: 'Author Plan',
    description: 'Single book, one-time purchase',
    priceId: process.env.STRIPE_AUTHOR_PRICE_ID,
    price: 7900, // $79.00
    booksAllowed: 1
  },
  starter: {
    name: 'Starter Plan',
    description: '5 books included',
    priceId: process.env.STRIPE_STARTER_PRICE_ID,
    price: 29900, // $299.00
    booksAllowed: 5
  },
  growth: {
    name: 'Growth Plan',
    description: '10 books included',
    priceId: process.env.STRIPE_GROWTH_PRICE_ID,
    price: 49900, // $499.00
    booksAllowed: 10
  },
  professional: {
    name: 'Professional Plan',
    description: '20 books included',
    priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
    price: 69900, // $699.00
    booksAllowed: 20
  },
  power: {
    name: 'Power Publisher Plan',
    description: '30 books included',
    priceId: process.env.STRIPE_POWER_PRICE_ID,
    price: 89900, // $899.00
    booksAllowed: 30
  }
};

module.exports = {
  stripe,
  SUBSCRIPTION_PLANS
}; 