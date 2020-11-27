import React from 'react';
import Top from './components/Top.js'
import ReviewsSection from './components/ReviewsSection';
import './page.css'
import getReviewsData from './Services/DataManipulation.js';



class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            appSelected: [],
            sortSelected: 'new',
        }
        this.productSelection = this.productSelection.bind(this);
        this.sortSelection = this.sortSelection.bind(this);

    }
    productSelection(product) {
        let productReviews = getReviewsData();
        productReviews = productReviews.reviews.filter(p => p.productName === product ? true : false)
        this.setState({ appSelected: productReviews })
    }
    sortSelection(sort) {
        this.setState({ sortSelected: sort }, () => console.log(this.state.sortSelected))

    }
    keywordSearched(props) {
        this.setState({ search: props })
    }
    render() {
        return (

            <div className='container'>
                <div className='topPane'>
                    <Top productSelection={this.productSelection} sortSelection={this.sortSelection} />
                </div>

                <div className='reviewPane'>
                    <ReviewsSection app={this.state.appSelected} sorting={this.state.sortSelected} search={this.state.search} />
                </div>
            </div>
        );
    }
}

export default Page;