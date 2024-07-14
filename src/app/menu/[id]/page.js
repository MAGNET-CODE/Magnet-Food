import { notFound } from 'next/navigation';
import DetailsPage from '../../../../components/templates/DetailsPage';
import React from 'react';

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}data`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function generateStaticParams() {
  const data = await getData();
  const paths = data.slice(0, 10).map((food) => ({
    id: food.id.toString(),
  }));
  return paths;
}

const Details = async ({ params }) => {
  const data = await getData();
  const food = data.find((item) => item.id.toString() === params.id);

  if (!food) {
    notFound();
  }
  return <DetailsPage {...food} />;
};

export default Details;
