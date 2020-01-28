import React from 'react';
import { useParams} from "react-router";
import DisplayItem from '../../components/DisplayItem/DisplayItem';

import {getSupportedVideos} from "../../utils";

const Items = (props) => {

    const { id } = useParams();
    const item = getSupportedVideos(props.items).filter((item, index) => item.videoId === id )[0] || {title:"video not  defined"};
    return (
        <div className="items">
            <h3>{item.title}</h3>
            <DisplayItem  itemData={item} />;
        </div>
    );
}

export default Items;