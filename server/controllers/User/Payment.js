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
                            name: "Buenos Aires",
                            description: 'Hotel parana',
                        },
                        currency: 'usd',
                        unit_amount: 20000,
                    },
                    quantity: 1
                },
                {
                    price_data: {

                    product_data: {
                     name: 'Panama',
                     description: 'Lagos privados',
                    },
                    currency: 'usd',

                    unit_amount: 10000, 
                },
                quantity: 2

                }
            ],
            mode: 'payment',
            success_url: 'https://placee-inc.vercel.app',
            cancel_url: 'https://placee-inc.vercel.app'

        })
        console.log('pago realizado');
        return res.json(session)

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};
 