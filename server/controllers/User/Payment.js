const Stripe = require('stripe');
const stripe= new Stripe('sk_test_51ONdk7AlajpyxreyoVzwpdS62OV4Z6p2G0OrtXhxbF8gGAd8IbIfxIv92gBQbXNU9JEI3LZFan9Za4aD2F4eLNyz00ZVVB8TRz');


module.exports = {
    createSession: async (req, res) => {
    try {
      const session = await  stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        product_data: {
                            name: "Laptop",
                            description: 'Gaming Laptop',
                        },
                        currency: 'usd',
                        unit_amount: 20000,
                    },
                    quantity: 1
                },
                {
                    price_data: {

                    product_data: {
                     name: 'Headset',
                     description: 'Smart Tv',
                    },
                    currency: 'usd',

                    unit_amount: 10000, 
                },
                quantity: 2

                }
            ],
            mode: 'payment',
            success_url: 'http://localhost:4000/success',
            cancel_url: 'http://localhost:4000/cancel'

        })
        return res.json(session)

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};
 