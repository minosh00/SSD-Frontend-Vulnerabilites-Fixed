import { useEffect, useState } from 'react';
import DescriptionAlert from '../UI/DescriptionAlert';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import Spinner from '../UI/Spinner';


const prodBaseUrl = 'http://localhost:5000/menu';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(prodBaseUrl + '/getAllMenu');

      if (!response.ok) {
        throw new Error(`Something went wrong! Status Code ${response.status}`);
      }

      const data = await response.json();

      const loadedMeals = [];
      for (const meal of data) {
        loadedMeals.push({
          id: meal._id,
          name: meal.name,
          description: meal.description,
          price: meal.price,
          images:meal.images
  
  

        
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <Spinner />
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <DescriptionAlert alertType="error" alertMessage={httpError}/>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      images={<img src={meal.images}className='card-img-top img-fluid' />}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
