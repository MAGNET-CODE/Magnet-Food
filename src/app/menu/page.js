// src/app/menu/page.js

import MenuPage from "../../../components/templates/MenuPage";
import React from 'react';

async function getData() {
  const res = await fetch('http://localhost:4000/data', { next: { revalidate: 60 * 60 } });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Menu() {
  const data = await getData();

  return (
    <MenuPage data={data} />
  );
}
