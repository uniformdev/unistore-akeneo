import React from 'react';
import type { NextPage } from 'next';
import Navbar from '@/components/Navigation/Header';
import Footer from '@/components/Navigation/Footer';
import ShoppingCart from '@/components/ShoppingCart';

const ShoppingCartPage: NextPage = () => (
  <>
    <Navbar />
    <ShoppingCart />
    <Footer />
  </>
);

export default ShoppingCartPage;
