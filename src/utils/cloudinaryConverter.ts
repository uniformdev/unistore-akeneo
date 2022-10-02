export const cloudinaryConverter = ({ parameter }: any) => {
  const value = parameter.value;
  if (Array.isArray(value)) {
    const transformed = value.map(p => transformCloudinaryImage(p));
    if (transformed.length === 1) {
      return transformed[0];
    }
    return transformed;
  } else {
    return transformCloudinaryImage(value);
  }
};

export function transformCloudinaryImage(value: any) {
  if (!value) {
    return {};
  }

  return {
    src: value.transdormedurl ?? value.rawurl,
    width: value.width,
    height: value.height,
    alt: value.alt,
  };
}
