import React from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { enhance, RootComponentInstance } from '@uniformdev/canvas';
import { createProductDetailEnhancers } from '@/utils/enhancers';
import { getProductUrls } from '@/utils/commerce';
import { canvasClient, getState } from '@/utils/canvasClient';
import CommonPageContainer from '@/components/containers/CommonContainer';

const ProductDetail: NextPage<{
  composition: RootComponentInstance;
  preview: boolean;
}> = props => <CommonPageContainer {...props} />;

export const getStaticProps: GetStaticProps<any> = async context => {
  const slugParamValue = context?.params?.productSlug as string;

  const splitterIndex = slugParamValue.lastIndexOf('-');
  const productId = slugParamValue.substring(splitterIndex + 1, slugParamValue.length);
  const productName = slugParamValue.substring(0, splitterIndex);
  const locale = 'en_US';
  if (!productName || !productId) return { notFound: true };
  const { preview } = context;
  console.log({ productName, productId });
  if (!productName || !productId) {
    return {
      props: {
        composition: {},
      },
    };
  }

  // fetch the composition by slug "product-detail", in this case all product detail pages will be rendered using this composition
  const { composition } = await canvasClient.getCompositionBySlug({
    slug: 'product-detail',
    state: getState(preview),
  });

  const productSku = productId.replace('+', '-');
  const enhancers = createProductDetailEnhancers({ productId: productSku, locale });
  await enhance({ composition, enhancers, context: { preview } });

  return {
    props: {
      composition,
      preview: preview || false,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getProductUrls();
  return {
    paths,
    fallback: false,
  };
};

export default ProductDetail;
