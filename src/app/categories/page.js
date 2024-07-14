"use client";

import { Suspense, useEffect, useState } from "react";
import CategoriesPage from "../../../components/templates/CategoriesPage";

function CategoriesWrapper({ searchParams }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { difficulty, time } = searchParams;

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}data`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        const filteredData = data.filter((item) => {
          const difficultyResult = item.details.filter(
            (detail) => detail.Difficulty && detail.Difficulty === difficulty
          );

          const timeResult = item.details.filter((detail) => {
            const cookingTime = detail["Cooking Time"] || "";
            const [timeDetail] = cookingTime.split(" ");

            if (time === "less" && timeDetail && +timeDetail <= 30) {
              return detail;
            } else if (time === "more" && timeDetail && +timeDetail > 30) {
              return detail;
            }
          });
          if (time && difficulty && timeResult.length && difficultyResult.length) {
            return item;
          } else if (!time && difficulty && difficultyResult.length) {
            return item;
          } else if (!difficulty && time && timeResult.length) {
            return item;
          }
        });

        setData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [searchParams]);

  return <CategoriesPage data={data} />;
}

export default function Categories({ searchParams }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoriesWrapper searchParams={searchParams} />
    </Suspense>
  );
}