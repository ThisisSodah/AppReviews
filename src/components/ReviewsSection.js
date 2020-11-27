import React from 'react'
import './ReviewSection.css'
import ReviewItem from '././ReviewsSection/ReviewItem';
import getReviewsData from '../Services/DataManipulation'
import _ from 'lodash';
import moment from 'moment';
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'

moment().format();
moment().isBetween();




class ReviewsSection extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            search: null,
            dateFrom: null,
            dateTo: null,
            rating: null,
            version: null,
            country: null,
            reviews: this.props.app,
            data: getReviewsData()
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.handleDateChangeFrom = this.handleDateChangeFrom.bind(this)
        this.handleDateChangeTo = this.handleDateChangeTo.bind(this)
        this.handleRatingsChange = this.handleRatingsChange.bind(this)
        this.handleVersionChange = this.handleVersionChange.bind(this)
        this.handleCountryChange = this.handleCountryChange.bind(this)
        this.getVersions = this.getVersions.bind(this)
        this.getCountries = this.getCountries.bind(this)
        this.filterEntireData = this.filterEntireData.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    handleSearch(e) {
        this.setState({ search: e.target.value })
    }
    handleDateChangeFrom(a) {
        this.setState({
            dateFrom: a.target.value
        })
    }
    handleDateChangeTo(b) {
        this.setState({
            dateTo: b.target.value
        })
    }
    handleRatingsChange(r) {
        let selectedRating = r.target.value;
        switch (selectedRating) {
            case '5': this.setState({ rating: '5' });
                break;
            case '4': this.setState({ rating: '4' });
                break;
            case '3': this.setState({ rating: '3' });
                break;
            case '2': this.setState({ rating: '2' });
                break;
            case '1': this.setState({ rating: '1' });
                break;
            default: this.setState({ rating: null })
        }

    }
    handleVersionChange(e) {
        e.target.value === 'View all versions' ? this.setState({ version: null }) : this.setState({ version: e.target.value })

    }
    handleCountryChange(c) {
        c.target.value === 'View all countries' ? this.setState({ country: null }) : this.setState({ country: c.target.value })
    }
    getVersions() {
        let versionsData = this.props.app;
        versionsData = this.props.app.map(p => p.version)
        versionsData = _.uniq(versionsData);
        versionsData.sort();
        return versionsData;
    }
    getCountries() {
        let countryData = this.props.app;
        countryData = this.props.app.map(p => p.countryName)
        countryData = _.uniq(countryData);
        countryData.sort();
        return countryData;
    }
    handleReset(e){
        if(e.target.value === 'reset'){
        this.setState({ 
            search: null,
            dateFrom: null,
            dateTo: null,
            rating: null,
            version: null,
            country: null,
        })}
    }

    filterEntireData() {
        let filteredData = [...this.props.app];
        if (this.state.search != null) {
            filteredData = filteredData.filter(s => s.reviewHeading.includes(this.state.search) || s.reviewText.includes(this.state.search))
        }
        if (this.state.dateFrom != null && this.state.dateTo != null) {
            let from = moment(this.state.dateFrom);
            let to = moment(this.state.dateTo);
            filteredData = filteredData.filter(r => moment(r.reviewDate, 'DD MMM YYYY HH:mm:ss').isBetween(from, to))
        }
        if (this.state.rating != null) {
            filteredData = filteredData.filter(p => p.rating == this.state.rating)
        }

        if (this.state.version != null) {
            filteredData = filteredData.filter(p => p.version === this.state.version)
        }
        if (this.state.country != null) {
            filteredData = filteredData.filter(p => p.countryName === this.state.country)
        }
        if (this.props.sorting === 'new') {

            filteredData.sort((a, b) => (moment(b.reviewDate, 'DD MMM YYYY HH:mm:ss')) - (moment(a.reviewDate, 'DD MMM YYYY HH:mm:ss')))
        }
        if (this.props.sorting === 'old') {

            filteredData.sort((a, b) => (moment(a.reviewDate, 'DD MMM YYYY HH:mm:ss')) - (moment(b.reviewDate, 'DD MMM YYYY HH:mm:ss')))
        }
        return filteredData;


    }

    render() {
        // console.log(this.state.dateFrom)
        // console.log(this.state.dateTo)

        return (
            <div className='reviewContainer'>
                <div className='filterPane'>
                    <div className='search'>

                        <input type='textfield' label='Search' className='textField' placeholder='Search' value={this.state.search} onChange={this.handleSearch} />
                        <br />
                    </div><br /><hr />
                    <div className='calender'>
                        <span className='filterText'> Filter by date:<br /> <br />
                            <label className='from'>From:</label>
                            <input className='fromDate' type='date' value={this.state.dateFrom} onChange={this.handleDateChangeFrom}></input>
                            <label className='to'>To:</label>
                            <input className='toDate' type='date' value={this.state.dateTo} onChange={this.handleDateChangeTo} /><br />
                        </span><br />
                        <hr />
                    </div>
                    <div className='rating'>
                        <label>Filter by rating:</label><br />
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Rating
                                value={this.state.rating}
                                onChange={this.handleRatingsChange}
                            />
                        </Box>
                    </div>
                    <hr />
                    <div className='version'> <label>Filter by version:<br /></label>
                        <Select className='selectVersion' onChange={this.handleVersionChange} value={this.state.version} displayEmpty>

                            <MenuItem selected>View all versions </MenuItem>
                            {
                                this.getVersions().map((p, i) => <MenuItem value={p} key={i}>{p}</MenuItem>)
                            }

                        </Select>
                        <hr />
                    </div>
                    <div className='country'><label>Filter by country</label> <br />
                        <Select className='selectCountry' onChange={this.handleCountryChange} value={this.state.country}>
                            <MenuItem selected value="View all countries">View all countries</MenuItem>
                            {
                                this.getCountries().map((p, i) => <MenuItem value={p} key={i}>{p}</MenuItem>)
                            }
                        </Select>
                        <hr />


                    </div>
                    <Button color='secondary' variant='contained' onClick={this.handleReset} value='reset' label='Reset' disableElevation>Reset</Button>
                </div>
                <div className='reviewSection'>
                    {
                        this.filterEntireData().map(e =>
                            <div className='reviewBox'>
                                <ul>
                                    <li key={e.id}>
                                        <ReviewItem dataObj={e} />
                                    </li>
                                </ul>

                            </div>)}
                </div>
                            
            </div>
        )
    }
}

export default ReviewsSection;
// (props.sorting == 'newestFirst' ? reviews.sort((a, b) => b.reviewDate - a.reviewDate) : reviews.sort((a, b) => a.reviewDate - b.reviewDate))