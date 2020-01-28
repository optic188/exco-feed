import React, {Component} from 'react';

import './DisplayItem.css'

import {VideoSourceTypes} from '../../types/VideoSourceTypes'
import {Link} from "react-router-dom";

class displayItem extends Component {


    videoSourceConfig = VideoSourceTypes.find(source => {
        return this.props.itemData.source && source.name === this.props.itemData.source;
    });

    isValidItem = ({type, source, views, length, date}) => {
        return type && source && views && length && date;
    };

    dateStrOption = {year: 'numeric', month: 'short', day: 'numeric'};

    numberToReadableText(num) {
        const number = Math.abs(Number(num));
        return number >= 1.0e+9 ?
            number / 1.0e+9 + "B" : number >= 1.0e+6 ?
                Math.round((number / 1.0e+6) * 10) / 10 + "M" : number >= 1.0e+3 ?
                    number / 1.0e+3 + "K" : number;
    };

    secondsToTimeText(num) {
        let minutes = Math.floor(num / 60);
        let seconds = num - minutes * 60;

        return `${minutes}:${seconds}m`;
    };

    render() {
        const {itemData, isLink} = this.props
        if (this.isValidItem(itemData)) {
            const dateStr = new Date(itemData.date).toLocaleDateString("en-US", this.dateStrOption);
            const readableViewsNumber = this.numberToReadableText(itemData.views);
            const videoDuration = this.secondsToTimeText(this.props.itemData.length);
            return (
                <div className="display-item">
                    {this.videoSourceConfig.getPlayer(itemData[this.videoSourceConfig.id])}
                    <div className="display-item__details">
                        {isLink ? (<h2><Link to={
                            {
                                pathname: `/items/${itemData.videoId}`
                            }}

                        >{itemData.title}</Link></h2>) : <h2>{itemData.title}</h2>}
                        <div className="display-item__info">
                            <p>{`${dateStr} - ${readableViewsNumber}`}</p>
                        </div>
                        <div className="display-item__bottom-bar">
                            <div>{this.videoSourceConfig.getIcon()}</div>
                            <div className="display-item__bottom-bar__duration">{videoDuration}</div>
                        </div>
                    </div>
                </div>

            );
        }
        return (
            <div className="display-item error-item">
                <div>VIDEO NOT AVAILABLE</div>
            </div>
        );
    }
}

export default displayItem;