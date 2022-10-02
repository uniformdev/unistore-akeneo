import React from 'react';

const CategoryHeader = ({
  categoryName,
  categoryDescription,
}: {
  categoryName: string;
  categoryDescription?: string;
}) => (
  <div className="md:w-5/6 m-auto pt-16">
    {categoryName && (
      <p className="dark:text-white font-overpass md:text-center font-extrabold text-3xl leading-6 text-orange_border mb-6 ">
        {categoryName}
      </p>
    )}
    <p className="dark:text-white font - overpass md:text-center font-bold text-xl leading-7 text-black mt-2">
      {categoryDescription}
    </p>
  </div>
);

export default CategoryHeader;
