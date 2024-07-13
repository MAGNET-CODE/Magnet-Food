import { notFound } from 'next/navigation';
import DetailsPage from '../../../../components/templates/DetailsPage';
import React from 'react';

// تابع برای واکشی داده‌ها
async function getData() {
  const res = await fetch('http://localhost:4000/data');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

// تابع برای تولید مسیرهای دینامیک
export async function generateStaticParams() {
  const data = await getData();
  const paths = data.slice(0, 10).map((food) => ({
    id: food.id.toString(),
  }));
  return paths;
}

// کامپوننت جزئیات
const Details = async ({ params }) => {
  const data = await getData();
  const food = data.find((item) => item.id.toString() === params.id);

  if (!food) {
    notFound();
  }

  return <DetailsPage {...food} />;
};

export default Details;
