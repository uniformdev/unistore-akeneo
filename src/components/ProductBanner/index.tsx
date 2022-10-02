import React from 'react';
import LazyLoadImage from '../atoms/LazyLoadImage';

export type ProductInfoProps = {
  product?: any;
};

const ProductBanner = ({ product }: ProductInfoProps) => {
  if (!product) return null;
  const { banner_image } = product || {};
  return null;
  return (
    <div className="container">
      <LazyLoadImage src={banner_image} />
    </div>
  );
};

export default ProductBanner;
