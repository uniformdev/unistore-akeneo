import React, { memo } from 'react';
import Image, { ImageProps } from 'next/image';

const ImageLoader = ({
  src,
  width,
  height,
}: {
  src: string;
  width: string | number | undefined;
  height: string | number | undefined;
}) => `${src}?${width ? `w=${width}` : ''}${height ? `${width ? '&' : ''}h=${height}` : ''}`;

const LazyLoadImage: React.FC<ImageProps> = ({
  src,
  width = undefined,
  height = undefined,
  className = '',
  alt = '',
  objectFit = 'contain',
  ...restProps
}) => {
  const isStr = typeof src === 'string';

  const imageSrc = (() => {
    if (!isStr || !src.startsWith('//')) return src;
    return src.replace('//', 'https://');
  })();

  return (
    <Image
      src={imageSrc}
      width={width}
      height={height}
      className={className}
      alt={alt}
      layout={width && height ? 'intrinsic' : 'fill'}
      objectFit={objectFit}
      // @ts-ignore
      loader={isStr && (imageSrc as string).startsWith('/img/') ? ImageLoader : undefined}
      {...restProps}
    />
  );
};

export default memo(LazyLoadImage);
