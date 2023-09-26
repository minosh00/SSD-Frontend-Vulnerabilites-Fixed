import classes from './MainImage.module.css';
import CarouselImages from '../UI/Carousel';

import italian from '../../assets/italian.jpeg';
import indian from '../../assets/indian.jpeg';
import chinese from '../../assets/chinese.jpeg';
import mexican from '../../assets/mexican.png';
import french from '../../assets/french.jpeg';
import japanese from '../../assets/japanese.jpeg';

var mainImages = [
    {
        name: "Italian cuisine",
        image: italian
    },
    {
        name: "Indian cuisine",
        image: indian
    },
    {
        name: "Chinese cuisine",
        image: chinese
    },
    {
        name: "Mexican cuisine",
        image: mexican
    },
    {
        name: "French cuisine",
        image: french
    },
    {
        name: "Japanese cuisine",
        image: japanese
    },
];

const MainImage = () => {
    return (
        <div className={classes['main-image']}>
            <CarouselImages items={mainImages}/>
        </div>
    );
};

export default MainImage;