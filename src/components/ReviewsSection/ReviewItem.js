import React from 'react';
import './ReviewItem.css'
import { Rating } from '@material-ui/lab'


export default function ReviewItem(props) {
    let d = props.dataObj;
    return (
        <div className='listContainer'>
            <div className='header'>
                <div className='user'>
                    <div className='date'>{d.reviewDate}</div>
                    <div className='username'>{d.reviewUserName}</div><br />
                    <Rating className='rating' value={d.rating} readOnly />
                </div>
            </div>
            <div className='reviewText'>
                <div className='heading'>
                    {d.reviewHeading}
                </div>
                <div className='text'>
                    {d.reviewText}
                </div>
            </div>
            <div className='footer'>

                <div className='reviewCountry'>
                    {d.countryName}
                </div>
                <div className='reviewVersion'>
                    App store name: {d.appStoreName} - Version: {d.version}
                </div>
            </div>
        </div>
    );
}


