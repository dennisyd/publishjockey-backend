const User = require('../models/User');
const { stripe, SUBSCRIPTION_PLANS } = require('../config/stripe');
const crypto = require('crypto');

/**
 * @desc    Create a Stripe checkout session
 * @route   POST /api/stripe/create-checkout-session
 * @access  Private
 */
const createCheckoutSession = async (req, res) => {
  try {
    const { planId, successUrl, cancelUrl } = req.body;
    const userId = req.user.userId;

    // Validate planId
    if (!planId || !SUBSCRIPTION_PLANS[planId]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid plan selected'
      });
    }

    // MOCK: Return mock session data instead of calling Stripe API
    console.log('MOCK: Creating checkout session for plan:', planId);
    
    res.status(200).json({
      success: true,
      sessionId: 'mock_session_' + Date.now(),
      url: successUrl || `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment-success?session_id=mock_session`
    });
  } catch (error) {
    console.error('Create checkout session error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create checkout session',
      error: error.message
    });
  }
};

/**
 * @desc    Handle Stripe webhook events
 * @route   POST /api/stripe/webhook
 * @access  Public
 */
const handleWebhookEvent = async (req, res) => {
  console.log('MOCK: Stripe webhook received');
  
  // Return a response to acknowledge receipt of the event
  res.status(200).json({ received: true });
};

// Mock implementation of handleCheckoutSessionCompleted
const handleCheckoutSessionCompleted = async (session) => {
  console.log('MOCK: Handling completed checkout session');
};

// Mock implementation of handlePaymentIntentSucceeded
const handlePaymentIntentSucceeded = async (paymentIntent) => {
  console.log('MOCK: Payment succeeded');
};

// Mock implementation of handlePaymentFailed
const handlePaymentFailed = async (paymentIntent) => {
  console.log('MOCK: Payment failed');
};

/**
 * @desc    Verify payment success and session details
 * @route   GET /api/stripe/verify-session/:sessionId
 * @access  Private
 */
const verifySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }

    console.log('MOCK: Verifying session', sessionId);
    
    // Get user details
    const user = await User.findById(req.user.userId);

    // Mock successful verification
    res.status(200).json({
      success: true,
      session: {
        id: sessionId,
        status: 'complete',
        paymentStatus: 'paid'
      },
      plan: {
        id: 'author',
        name: 'Author Plan',
        booksAllowed: 1
      },
      user: {
        subscription: user?.subscription || 'author',
        booksAllowed: user?.booksAllowed || 1,
        booksRemaining: user?.booksRemaining || 1,
        subscriptionExpires: user?.subscriptionExpires || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      }
    });
  } catch (error) {
    console.error('Verify session error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify session',
      error: error.message
    });
  }
};

module.exports = {
  createCheckoutSession,
  handleWebhookEvent,
  verifySession
}; 