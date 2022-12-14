import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useUniformContext } from '@uniformdev/context-react';
import { useCartContext } from '@/context/CartProvider';
import CurrencyFormatter from '@/components/CurrencyFormatter';
import ButtonAddToCart from '@/components/atoms/ButtonAddToCart';

export type ProductInfoProps = {
  product?: any;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { currency } = useCartContext();
  const [quantity, setQuantity] = useState(1);

  const { sku, name, meta_description, categories } = product || {};
  const { context } = useUniformContext();

  const enrichments =
    categories && categories.length > 1
      ? categories[1]
          .split('_')
          .filter((c: string) => c !== 'master')
          .map((e: string) => {
            return {
              cat: 'cat',
              key: e,
              str: 5,
            };
          })
      : [];

  useEffect(() => {
    context.update({ enrichments });
  }, [context]);

  if (!product) return null;

  return (
    <div className="md:pt-8 pt-4 lg:w-2/3">
      <h1 className="font-overpass font-bold dark:text-white text-black text-4xl lg:text-5xl">{name}</h1>
      <p className="pt-6 font-overpass font-bold dark:text-white text-black text-xl lg:text-xl">{meta_description}</p>
      <div className="flex flex-row w-28 justify-between mt-8 leading-5 font-overpass text-black text-2xl">
        <CurrencyFormatter
          currency={currency.code}
          amount={product.sale_price && product.sale_price !== 0 ? product.sale_price : product.price}
          className="dark:text-white"
        />
        {product.sale_price && product.sale_price !== 0 ? (
          <>
            &nbsp;&nbsp;&nbsp;
            <CurrencyFormatter
              className="dark:text-white opacity-50 line-through"
              currency={currency.code}
              amount={product.price}
            />
          </>
        ) : null}
      </div>
      <div className="border-mercury border-t-2 my-7" />
      <p className="font-overpass dark:text-white text-black text-base leading-3">
        <span className="inline font-bold">SKU: </span>
        {sku}
      </p>
      <div className="font-overpass dark:text-white text-black text-base  pt-6 flex">
        <div className="flex w-3/5 items-center justify-between">
          <div className="inline font-bold">QUANTITY:</div>
          <div>{quantity}</div>
          <div className="flex flex-row w-20">
            <button
              type="button"
              disabled={quantity === 1}
              className="border-demo_border items-center flex justify-center rounded"
              onClick={() => setQuantity(quantity - 1)}
            >
              <Image src="/img/remove.svg" width={50} height={50} />
            </button>
            <button
              type="button"
              disabled={quantity === 100}
              className="border-demo_border  items-center flex justify-center rounded"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Image src="/img/add.svg" width={50} height={50} />
            </button>
          </div>
        </div>
      </div>
      <ButtonAddToCart product={product} quantity={quantity} className="dark:text-white mt-10 w-full" />
    </div>
  );
};

export default ProductInfo;
