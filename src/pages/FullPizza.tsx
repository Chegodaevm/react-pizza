import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string
    title: string
    price: number
  }>();
  const { id } = useParams<{
    id: string
  }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://6386701e875ca3273d59a675.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('pizza net');
        navigate('/');
      }
    }

    fetchPizza();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!pizza) {
    return <h1>Загрузка</h1>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} width={300} height={300} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
