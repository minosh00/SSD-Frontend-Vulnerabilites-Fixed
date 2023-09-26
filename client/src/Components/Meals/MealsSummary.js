import { useCallback, useEffect, useState } from 'react';
import classes from './MealsSummary.module.css';

const mainHeadings = ['Unexpected guests?', 'Cooking gone wrong?', 'Game night?', 'Movie marathon?', 'Late night at office?', 'Midnight craving?', 'Hungry?'];
var i = 0; // counter to loop thorugh the mainHeadings

const MealsSummary = () => {
  const [mainHeading, setMainHeading] = useState('Hungry?');

  const nextHeading = useCallback(() => {
    setMainHeading(mainHeadings[i % mainHeadings.length]);
    i++;
    if(i === mainHeadings.length) {
      i = 0;
    }
  },[]);

  useEffect(() => {
    const intervalID = setInterval(nextHeading, 4000);
    return () => clearInterval(intervalID);
  }, [nextHeading]);

  return (
    <section className={classes.summary}>
      <h2>{mainHeading}</h2>
      <p>Welcome to the Wijaya Beach Hotel</p>
      <p>
      Wijaya Beach is a family-owned business. Since the opening of our restaurant in 1980 we have become one of the best-loved establishments in the area. We pride ourselves on our popularity with the local expat community and the number of visitors who return year after year to enjoy our food
      </p>
    </section>
  );
};

export default MealsSummary;
