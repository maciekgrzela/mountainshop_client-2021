import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ProductsDetailsHeading = ({ product }) => {
  return (
    <div className='products-details__headline mb-2'>
      <div className='products-details__controls'>
        <Link to='/products'>
          <button className={`products-details__back-btn`}>
            <FiArrowLeft />
          </button>
        </Link>
      </div>
      <h3 className='products-details__header my-1'>
        {product.name}
        {product.percentageSale !== null && (
          <span className='products-details__header-promo-label'>PROMOCJA</span>
        )}
        {new Date().toISOString().substr(0, 7) ===
          product.created.substr(0, 7) && (
          <span className='products-details__header-new-label'>NOWOŚĆ</span>
        )}
      </h3>
    </div>
  );
};

export default ProductsDetailsHeading;
