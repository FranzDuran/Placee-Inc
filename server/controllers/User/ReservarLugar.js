const stripe = require('stripe')('sk_test_51ONdk7AlajpyxreyoVzwpdS62OV4Z6p2G0OrtXhxbF8gGAd8IbIfxIv92gBQbXNU9JEI3LZFan9Za4aD2F4eLNyz00ZVVB8TRz');

const Transaction = require('../../database/models'); // Importa tu modelo de transacción

module.exports = {
  ReservarLugar: async (req, res) => {
    try {
      const { cantidadPersonas, token, lugarId, usuarioId } = req.body;

      if (!cantidadPersonas || !token || !lugarId || !usuarioId) {
        return res.status(400).json({ error: 'Faltan parámetros en la solicitud' });
      }

      console.log('Solicitud completa:', req.body);
      console.log('Cantidad de Personas:', cantidadPersonas);
      console.log('ID del Lugar:', lugarId);
      console.log('ID del Usuario:', usuarioId);

      // Lógica de manejo de reservas con Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(cantidadPersonas) * 100,  // Convierte a número
        currency: 'usd',
        payment_method: token,
        confirmation_method: 'manual',
        confirm: true,  // Convierte a booleano
        metadata: {
          lugarId,
          usuarioId,
        },
      });

      // Guarda la transacción en la base de datos
      const transactionData = {
        usuarioId,
        lugarId,
        cantidadPersonas,
        transactionId: paymentIntent.id,
        // Otros campos relevantes que desees guardar
      };

      const newTransaction = new Transaction(transactionData);
      await newTransaction.save();

      // Devuelve el client secret para confirmar el pago en el frontend
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error al procesar la reserva:', error);
      res.status(500).json({ error: 'Error al procesar la reserva' });
    }
  }
};
