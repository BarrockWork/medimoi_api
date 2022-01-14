const Stripe = require('stripe');
const stripeInit = Stripe('sk_test_...', {
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