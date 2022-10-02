import React from 'react';
import { getCategoryComposition } from '@/lib/canvasClient';
import { sluggify } from '@/utils/stringUtils';
import CommonPageContainer from '@/components/containers/CommonContainer';
import categoryUrls from '../../../data/categoryUrls.json';
import CurrentCategoryContext from '@/lib/hooks/currentCategory';

export default function CategoryPage({
  composition,
  preview,
  categoryName,
}: {
  composition: any;
  preview: boolean;
  categoryName: string;
}) {
  return (
    <CurrentCategoryContext.Provider
      value={{
        categoryName,
      }}
    >
      <CommonPageContainer composition={composition} preview={preview} />;
    </CurrentCategoryContext.Provider>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: categoryUrls.map(c => {
      let slug = c.href.replace('master_', '');
      return `/shop/${sluggify(slug)}`;
    }),
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const { categoryname } = context?.params || {};
  const { preview } = context;
  return {
    props: {
      composition: await getCategoryComposition(categoryname, context),
      preview: preview || false,
    },
  };
};
