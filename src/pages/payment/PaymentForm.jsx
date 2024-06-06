import { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import Meli from '../meli/Meli';
import { Container, Header, Button } from './styles'; // Adicionei Button aos estilos importados
import { createMercadoPagoPreference } from '../../server/apiMercadoPago';

const PaymentForm = () => {
  const { logout, user, paymentStatusAtivo } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [user]);

  const handlePayment = async () => {
    try {
      const initPoint = await createMercadoPagoPreference(user.email);
      window.location.href = initPoint; // Redireciona o usuário para a URL de checkout do Mercado Pago
    } catch (error) {
      console.error('Error creating preference:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!paymentStatusAtivo) {
    return (
      <Container>
        <Header>
          <FiLogOut onClick={logout} />
        </Header>
        <div>
          <p>Pagamento não identificado.</p>
          <Button onClick={handlePayment}>Pagar Agora</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <FiLogOut onClick={logout} />
      </Header>
      <Meli />
    </Container>
  );
};

export default PaymentForm;
