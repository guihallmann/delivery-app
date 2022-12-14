import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartBtn from '../../components/CartButton';
import Header from '../../components/Header';
import Card from '../../components/Product/card';
import axiosInstance from '../../utils/axios/axiosInstance';
import DeliveryContext from '../../utils/context/DeliveryContext';

function Products() {
  const { user, cartValue, setCartValue } = useContext(DeliveryContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const fetchApiAllProducts = useCallback(async (userData) => {
    const config = { headers: { Authorization: userData.token } };
    const { data } = await axiosInstance.get('/products', config);
    setProducts([...data]);
  }, []);

  useEffect(() => {
    if (Object.keys(user).length !== 0) fetchApiAllProducts(user);
    if (Object.keys(user).length === 0) navigate('/login');
  }, [user, navigate, fetchApiAllProducts]);

  useEffect(() => {
    const totalPrice = JSON.parse(localStorage.getItem('cartValue'));
    setCartValue(totalPrice);
  }, [setCartValue]);

  return (
    <section
      style={ { backgroundColor: 'rgba(242,210,46, 0.95)' } }
      className="w-full h-screen"
    >
      <Header />
      <section className="main-products">
        <section className="main-products-cards">
          { products.length !== 0 && products
            .map(({ id, name: productName, price, url_image: urlImage }, i) => {
              const priceFormat = `${price}`.replace('.', ',');
              return (
                <Card
                  key={ i }
                  id={ id }
                  title={ productName }
                  price={ priceFormat }
                  floatPrice={ price }
                  image={ urlImage }
                />
              );
            })}
        </section>
      </section>
      <section className="cart-section">
        <CartBtn price={ cartValue || 0.00 } />
      </section>
    </section>
  );
}

export default Products;
