'use client';

import { useState, useEffect } from "react";
import styles from "./CategoriesPage.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "../modules/Card";
import Image from "next/image";

function CategoriesPage({ data }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState({ difficulty: "", time: "" });

  useEffect(() => {
    const difficulty = searchParams.get("difficulty");
    const time = searchParams.get("time");

    if(query.difficulty !== difficulty || query.time !== time) {
      setQuery({ difficulty, time });
    }
  }, [searchParams]);

  const changeHandler = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const searchHandler = () => {
    const queryParams = new URLSearchParams(query).toString();
    router.push(`/categories?${queryParams}`);
  };

  return (
    <div className={styles.container}>
      <h2>Categories</h2>
      <div className={styles.subContainer}>
        <div className={styles.select}>
          <select value={query.difficulty || ""} name="difficulty" onChange={changeHandler}>
            <option value="">Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select value={query.time || ""} name="time" onChange={changeHandler}>
            <option value="">Cooking Time</option>
            <option value="more">More than 30 min</option>
            <option value="less">Less than 30 min</option>
          </select>
          <button onClick={searchHandler}>Search</button>
        </div>
        <div className={styles.cards}>
          {!data.length ? (
            <Image className={styles.imgSearch}
              src={"/images/search.png"}
              alt="img"
              width={500}
              height={500}
            />
          ) : null}
          {
            data.map((food) => (
              <Card key={food.id} {...food} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;