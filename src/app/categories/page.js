"use client";

import { useEffect, useState } from "react";
import CategoriesPage from "../../../components/templates/CategoriesPage"

function Categories({ searchParams }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { difficulty, time } = searchParams;

      const res = await fetch("http://localhost:4000/data");
      const data = await res.json();

      const filteredData = data.filter((item) => {
        const difficultyResult = item.details.filter(
          (detail) => detail.Difficulty && detail.Difficulty === difficulty
        );

        const timeResult = item.details.filter((detail) => {
          const cookingTime = detail["Cooking Time"] || "";
          const [timeDetail] = cookingTime.split(" ");

          if(time === "less" && timeDetail && +timeDetail <= 30) {
            return detail;
          } else if(time === "more" && timeDetail && +timeDetail > 30) {
            return detail;
          }
        });
        if(time && difficulty && timeResult.length && difficultyResult.length) {
          return item;
        } else if (!time && difficulty && difficultyResult.length) {
          return item;
        } else if (!difficulty && time && timeResult.length) {
          return item;
        }
      });

      setData(filteredData);
    }

    fetchData();
  }, [searchParams]);

  return (
    <CategoriesPage data={data} />
  )
}

export default Categories