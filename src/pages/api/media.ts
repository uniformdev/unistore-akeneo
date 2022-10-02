import type { NextApiRequest, NextApiResponse } from 'next';

// this API is not used anymore
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const akeneoHost = process.env.AKENEO_BASE_URL;
  if (!akeneoHost) {
    res.status(401).json({ message: 'Host not specifified' });
    return;
  }

  const akeneoToken = process.env.AKENEO_TOKEN;
  if (!akeneoToken) {
    res.status(401).json({ message: 'Token not specifified' });
    return;
  }

  const prefix = `${akeneoHost}/api/rest/v1/asset-media-files/`;

  const url: string = decodeURIComponent(req?.query?.url as string);
  const imageUrl = url.startsWith('http') ? url : `${prefix}${url}`;

  const result = await fetch(imageUrl, {
    headers: {
      Authorization: `Bearer ${akeneoToken}`,
    },
  });
  const body = await result.body;

  // @ts-ignore
  body?.pipe(res);
};
