export const akeneoModelConverter = ({ parameter }: any) => {
  const value = parameter.value;
  if (Array.isArray(value)) {
    const transformed = value.map(p => transformAkeneoProduct(p));
    if (transformed.length === 1) {
      return transformed[0];
    }
    return transformed;
  } else {
    return transformAkeneoProduct(value);
  }
};

export function transformAkeneoProduct(value: any) {
  if (!value) {
    return {};
  }

  const {
    name,
    description,
    price,
    image_1,
    image_2,
    media,
    banner_image,
    brand,
    color,
    meta_title,
    meta_description,
  } = value?.values || {};
  // product
  if (value.identifier) {
    const images = [
      hasValue(image_1) ? getProductImageUrl(image_1) : '',
      hasValue(image_2) ? getProductImageUrl(image_2) : '',
    ].filter(i => i);
    return {
      id: value.identifier,
      sku: value.identifier,
      categories: value.categories || '',
      name: hasValue(name) ? name[0].data : '',
      meta_title: hasValue(meta_title) ? meta_title[0].data : '',
      brand: hasValue(brand) ? brand[0].data : '',
      color: hasValue(color) ? color[0].data : '',
      description: hasValue(description) ? description[0].data : '',
      meta_description: hasValue(meta_description) ? meta_description[0].data : '',
      price: hasValue(price) ? price[0].data[2].amount : '',
      images,
      banner_image: hasValue(banner_image) ? getProductImageUrl(banner_image) : '',
    };
  }
  // media
  else if (hasValue(media) && media[0].data) {
    return getImageUrl(media);
  } else {
    return value;
  }
}

function getProductImageUrl(imageData: any) {
  return imageData[0]._links ? `https://y3ev57a1.twic.pics/akeneo/${imageData[0]?.data}/download` : '';
}

function getImageUrl(imageData: any) {
  return imageData[0].data ? `https://y3ev57a1.twic.pics/akeneo-assets/${imageData[0].data}` : '';
}
function hasValue(v: any) {
  return v && Array.isArray(v) && v.length > 0;
}
