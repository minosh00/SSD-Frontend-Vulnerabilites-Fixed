import React from 'react';
import SimpleImageSlider from "react-simple-image-slider";
import Main from "./Main.css"
import About from '../Layouts/About'
import Contact from '../Layouts/Contact'

const images = [
  { url: "https://i0.wp.com/www.chuzailiving.com/wp-content/uploads/2016/01/Wijaya-Beach-Sri-Lanka-3.jpg?resize=1000%2C667&ssl=1" },
  { url: "https://i0.wp.com/www.chuzailiving.com/wp-content/uploads/2016/01/Wijaya-Beach-Sri-Lanka.jpg?resize=1000%2C667&ssl=1" },
  { url: "https://i0.wp.com/www.chuzailiving.com/wp-content/uploads/2016/01/Wijaya-Beach-Sri-Lanka-17.jpg?resize=1000%2C667&ssl=1" },
  { url: "https://i0.wp.com/www.chuzailiving.com/wp-content/uploads/2016/01/Wijaya-Beach-Sri-Lanka-20.jpg?w=1000&ssl=1" },
  { url: "https://i0.wp.com/www.chuzailiving.com/wp-content/uploads/2016/01/Wijaya-Beach-Sri-Lanka-23.jpg?resize=1000%2C667&ssl=1" },

];


const Home = () => (


  <blockquote class="blockquote text-center">
    <br></br>  <br></br>
    <h1 class="h1" style={{ fontSize: "30px" }}>Welcome to the Wijaya Beach Hotel</h1>

    <div>
      <SimpleImageSlider
        style={{ marginTop: '-2%' }}
        width='100%'
        height={604}
        images={images}
        showBullets={true}
        showNavs={true}
      />
    </div>
    <br></br>
    <About />
    <Contact />

    <footer class="blockquote-footer" style={{ color: "white" }}>Wijaya Beach is a family-owned business. Since the opening of our restaurant in 1980 we have become one of the best-loved establishments in the area. We pride ourselves on our popularity with the local expat community and the number of visitors who return year after year to enjoy our food, cocktails, stunning beach and relaxed ambience.
      Our beachfront restaurant and bar serves an eclectic mix of Asian and European food, and we have an eight-room luxury bed and breakfast set around the courtyard behind the restaurant.
      <cite title="Source Title">Our peaceful beach has a protective reef creating a lagoon which ensures safe swimming all year round, and we have a small surf break in front of our restaurant.</cite></footer>
  </blockquote>


)

export default Home;