import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealIteam from "./MealIteam/MealIteam";

export interface DummyData {
  id: string;
  name: string;
  description: string;
  price: number;
}

const AvailableMeals: React.FC = () => {
  const [meals, setMeals] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, seterror] = useState<any>();

  useEffect(() => {
    const fetchMeals = async () => {
      seterror(null);

      const response = await fetch(
        "https://movies-https-1cdd6-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      if (data === null) {
        throw new Error("Something went wrong");
      }
      let fetchedMeals = [];

      for (let key in data) {
        fetchedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(fetchedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      seterror(error.message);
      console.log(error.message);
    });
  }, []);

  const meallist = meals.map((meal: DummyData) => (
    <MealIteam
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {!isLoading && !error && <ul>{meallist}</ul>}
        {isLoading && !error && <p>Loading Meals⚡...</p>}
        {error && <p>Something went wrong !</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
