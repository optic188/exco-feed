import React, { Component } from 'react';

import './ItemsList.css'

import DisplayItem from '../../components/DisplayItem/DisplayItem';
import { getSupportedVideos } from '../../utils'

class itemsList extends Component {

    render() {
        const items = getSupportedVideos(this.props.items).map((item, index) => {
            return <DisplayItem key={item.videoId ? item.videoId : index} itemData={item}  isLink="true"/>;
        });

        return (
            <div className="items-list">
                <div className="item-list__header">
                    <h1>Most viewed</h1>
                </div>
                <div className="items-list__content">{items}</div>
            </div>
        );
    }
}

export default itemsList;