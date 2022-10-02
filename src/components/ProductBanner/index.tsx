import React from 'react';
import LazyLoadImage from '../atoms/LazyLoadImage';

export type ProductInfoProps = {
  product?: any;
};

const ProductBanner = ({ product }: ProductInfoProps) => {
  if (!product) return null;
  const { banner_image } = product || {};
  return banner_image ? (
    <div className="container">
      <h1>Banner {banner_image}</h1>
      <LazyLoadImage src={banner_image} />
    </div>
  ) : null;
};

export default ProductBanner;
