import React from 'react';

const somePaymentMethods = [
  {
    id: 'credit-card',
    name: 'Karta Płatnicza',
    value: 0.0,
  },
  {
    id: 'from-carrier',
    name: 'Płatność za pobraniem',
    value: 15.8,
  },
  {
    id: 'pay-locally',
    name: 'Płatność w sklepie',
    value: 9.87,
  },
];

const CartPayment = ({ selectedPayment, payment }) => {
  return (
    <div className='payment-and-delivery__payment payment-methods'>
      <h3>Wybierz metodę płatności:</h3>
      <div className='payment-methods__list'>
        {selectedPayment !== null &&
          payment.map((paymentMethod) => (
            <div className='payment-methods__item'>
              <input
                type='radio'
                id={paymentMethod.id}
                checked={paymentMethod.id === selectedPayment.id}
                onChange={(e) => e.preventDefault()}
                name='payment'
                value={paymentMethod.name}
              />
              <label for={paymentMethod.id}>{paymentMethod.name}</label>
              <span className='payment-methods__value'>
                {`${paymentMethod.price.toFixed(2)} PLN`}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CartPayment;
