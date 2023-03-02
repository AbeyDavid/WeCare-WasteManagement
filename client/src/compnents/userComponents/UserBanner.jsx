import React from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./Item";
import ban1 from "../../public/images/ban1.jpeg";
import ban2 from "../../public/images/ban2.jpeg";
import ban3 from "../../public/images/ban3.jpeg";

export default function UserBanner() {
    var items = [ban1, ban2, ban3];

    return (
        <div>
            <Carousel navButtonsAlwaysVisible={true}>
                {items.map((item, i) => (
                    <Item key={i} item={item} />
                ))}
            </Carousel>
        </div>
    );
}
