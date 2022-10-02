import React from 'react';

const HeroFullWidth = ({ title, subtitle, backgroundImage }: any) => {
  return (
    <div
      className={`full-width-image ${subtitle ? 'h-96' : 'h-36'}`}
      style={{
        backgroundImage: `url(${backgroundImage?.src})`,
        minHeight: '300px',
      }}
    >
      <div className="dark:text-white flex flex-1 flex-col h-full items-center justify-center">
        <h1 className="font-overpass not-italic text-white font-extrabold  lg:text-7xl text-4xl text-center w-2/3">
          {title}
        </h1>

        <h3 className="dark:text-white font-overpass not-italic text-white lg:text-xl text-base text-center w-1/3 mt-4">
          {subtitle}
        </h3>
      </div>
    </div>
  );
};

export default HeroFullWidth;
