const { Post,  } = require('../../database/models'); // Asegúrate de tener el modelo Transaction importado
const Stripe = require('stripe');
const stripe = new Stripe('sk_test_51OdyLLJbEYAmlcVRVseiJSfnW7JuQKk7p619XFlEgI0dZpq8WKhMNXQWRqJOXiEC8bV0jCsHux9TgUxK3Q5vIL1t00G302tfnw');
module.exports = {
    createSession: async (req, res) => {
        const { postId } = req.params;

        try {
            const post = await Post.findByPk(postId);
            if (!post) {
                return res.status(404).json({ message: 'Publicación no encontrada' });
            }

            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            product_data: {
                                name: post.title,
                                description: post.description,
                            },
                            currency: 'usd',
                            unit_amount: post.price * 100,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: 'https://placee-inc.vercel.app',
                cancel_url: 'https://placee-inc.vercel.app',
            });

       

            console.log('Pago exitoso');
            return res.json(session);
        } catch (error) {
            console.error('Error al crear la sesión:', error);
            return res.status(500).json({ message: 'Error del servidor' });
        }
    },
};
