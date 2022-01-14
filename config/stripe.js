const Stripe = require('stripe');
const STRIPE_API_KEY = process.env.STRIPE_API_KEY;

const stripeInit = Stripe(STRIPE_API_KEY, {
    apiVersion: 'v1 - 2022-XX-XX',
    maxNetworkRetries: 1,
    httpAgent: null,
    timeout: 1000,
    host: 'api.stripe.com',
    port: 443,
    protocol: 'https',
    telemetry: true,
});

export default stripeInit;