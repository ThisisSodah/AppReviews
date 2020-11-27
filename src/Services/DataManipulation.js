import data from './reviews_data.json'
import _ from 'lodash';



function addProductNames(reviews){
    
    for (let i=0; i < reviews.length; i++){
        let review = reviews[i];
        review.productName = review.appID.split('.')[1];
    }
    return reviews;
}

function uniqVersions(reviews){
let versions = reviews.map(e => e.version);
versions= _.uniq(versions);
versions.sort();
return versions;
    
}
function getProductsList(reviews){
    let products = reviews.map(e => e.productName);
    products = _.uniq(products);
    products.sort();

    return products

}

export default function getReviewsData(){
    let reviews = addProductNames(data);
    let products = getProductsList(reviews);
    let versions = uniqVersions(reviews);
    

    return {
        reviews: reviews,
        products: products,
        versions: versions
    }
} 

