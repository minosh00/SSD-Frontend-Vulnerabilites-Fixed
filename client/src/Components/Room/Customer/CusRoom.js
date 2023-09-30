import React from 'react';
import SimpleImageSlider from "react-simple-image-slider";
import CusAllRooms from './CusAllRoom';
import '../Rooms.css'

const images = [
    { url: "https://www.wijayabeach.com/conmain/images/IMG_0151.jpg" },
    { url: "https://www.wijayabeach.com/conmain/images/IMG_9471.jpg" },
    { url: "https://www.wijayabeach.com/conmain/images/IMG_9453.jpg" },
    { url: "https://www.wijayabeach.com/conmain/images/IMG_3950.jpg" },
];

const CusRoom = () => (

    <blockquote class="blockquote text-center">
        <div>
            <SimpleImageSlider
                width='100%'
                height={400}
                images={images}
                showBullets={true}
                showNavs={true}
            />
        </div>

        <CusAllRooms/>
        
    </blockquote>
    

)

export default CusRoom;