import React from 'react';
import NavLink, { NavLinkProp } from '@/atoms/NavLink';
import categoryUrls from '../../../../../data/categoryUrls.json';
import { sluggify } from '@/utils/stringUtils';

const HeaderNav = () => (
  <div className="flex lg:flex-row flex-col lg:items-center justify-center lg:pl-5 pb-10 lg:pb-0">
    <TopNavLink href="/fall2022" title="New collection" />
    {categoryUrls &&
      categoryUrls.map((categoryLink: NavLinkProp) => (
        <ProductCategoryLink key={categoryLink.href} {...categoryLink} />
      ))}
  </div>
);

const ProductCategoryLink = ({ href, title }: NavLinkProp) => (
  <NavLink
    href={`/shop/${sluggify(href.replace('master_', ''))}`}
    title={title}
    className="header_footer_container--header_items text-black dark:text-white lg:m-0 m-3"
  />
);

const TopNavLink = ({ href, title }: NavLinkProp) => (
  <NavLink
    href={href}
    title={title}
    className="header_footer_container--header_items text-black dark:text-white lg:m-0 m-3"
  />
);

export default HeaderNav;
