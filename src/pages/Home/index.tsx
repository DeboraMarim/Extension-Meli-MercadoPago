import { useEffect, useState } from 'react';
import { Container, Header } from './styles';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import PaymentForm from '../payment/PaymentForm';
import Meli from '../meli/Meli';

export function Home() {
  const { logout, user, paymentStatusAtivo } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [user]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header>
        <FiLogOut onClick={logout} />
      </Header>
      {paymentStatusAtivo ? <Meli /> : <PaymentForm />}
    </Container>
  );
}
