export const createMercadoPagoPreference = async (userEmail) => {
    const url = 'https://api.mercadopago.com/checkout/preferences';
    const accessToken = 'TEST-4458941183307897-052714-9c0225111f8e97133db2f661a3c921ae-56007212';
  
    const preferenceData = {
      items: [
        {
          id: '1234',
          title: 'Assinatura Mensal',
          description: 'Assinatura recorrente mensal do serviço',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: 20,
        }
      ],
      auto_return: 'approved',
      back_urls: {
        success: 'https://www.seusite.com/success',
        failure: 'https://www.seusite.com/failure',
        pending: 'https://www.seusite.com/pending',
      },
      payer: {
        email: userEmail,
      }
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(preferenceData)
      });
  
      const data = await response.json();
      if (data.init_point) {
        return data.init_point;
      } else {
        console.error('Error creating preference:', data);
        throw new Error('Error creating preference');
      }
    } catch (error) {
      console.error('Error creating preference:', error);
      throw error;
    }
  };
  