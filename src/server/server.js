// const express = require('express');
// const mercadopago = require('mercadopago');
// const bodyParser = require('body-parser');

// // Configura o SDK do Mercado Pago com o seu Access Token
// mercadopago.configurations.setAccessToken('TEST-4458941183307897-052714-9c0225111f8e97133db2f661a3c921ae-56007212');  // Substitua pelo seu Access Token do Mercado Pago

// const app = express();
// app.use(bodyParser.json());  // Utiliza o middleware body-parser para processar JSON

// // Função para criar uma preferência de pagamento
// const createPreference = async (req, res) => {
//   const { description, transactionAmount, installments, paymentMethodId, email } = req.body;

//   const preference = {
//     items: [
//       {
//         title: description,
//         unit_price: parseFloat(transactionAmount),
//         quantity: 1,
//       },
//     ],
//     payer: {
//       email: email,
//     },
//     payment_methods: {
//       installments: installments
//     },
//     back_urls: {
//       success: 'https://www.success.com',
//       failure: 'https://www.failure.com',
//       pending: 'https://www.pending.com',
//     },
//     auto_return: 'approved',
//   };

//   try {
//     const response = await mercadopago.preferences.create(preference);
//     res.json({ id: response.body.id });
//   } catch (err) {
//     console.error("Error creating preference:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // Função para lidar com webhooks do Mercado Pago
// const handleWebhook = async (req, res) => {
//   const payment = req.body.data;

//   if (payment && payment.id) {
//     try {
//       const response = await mercadopago.payment.findById(payment.id);
//       const paymentStatus = response.body.status;

//       console.log(`Payment ID: ${payment.id}, Status: ${paymentStatus}`);

//       // Aqui você pode atualizar o status de pagamento no seu sistema, por exemplo, em um banco de dados

//       res.sendStatus(200);
//     } catch (err) {
//       console.error("Error processing payment:", err);
//       res.sendStatus(500);
//     }
//   } else {
//     res.sendStatus(400);
//   }
// };

// // Rota para criar uma preferência de pagamento
// app.post('/create_preference', createPreference);

// // Rota para lidar com webhooks do Mercado Pago
// app.post('/webhook', handleWebhook);

// // Define a porta na qual o servidor irá escutar
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
