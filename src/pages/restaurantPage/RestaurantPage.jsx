import React, { useContext } from 'react'
import { ClientContext } from '../../context/ClientContext'
import { useParams } from 'react-router-dom';
import RestaurantMainSection from '../../components/RestaurantMainSection/RestaurantMainSection.jsx';
import Footer from '../../components/footer/Footer.jsx'
import RestaurantsInLandingPage from '../../components/RestaurantInLandingPage/RestaurantsInLandingPage.jsx';
import HotelsInLandingPage from '../../components/HotelsInLandingPage/HotelsInLandingPage.jsx';
import DisplayRestaurantReviews from '../../components/displayRestaurantReviews/DisplayRestaurantReviews.jsx';


const RestaurantPage = () => {
    const { allRestaurants } = useContext(ClientContext);
    const { id } = useParams();
    const restaurant = allRestaurants.find((e) => e.id === parseInt(id));
    console.log(restaurant)
    return (
        <>
            {restaurant ? <>
                <RestaurantMainSection
                    id={restaurant.id}
                    name={restaurant.restaurantName}
                    description={restaurant.description}
                    address={restaurant.address}
                    contactNumber={restaurant.contactNumber}
                    email={restaurant.email}
                    website={restaurant.website}
                    mainCategory={restaurant.mainCategory}
                    category={restaurant.category}
                    priceRange={restaurant.priceRange}
                />
                <DisplayRestaurantReviews
                    id={id}
                />
                <RestaurantsInLandingPage />
                <HotelsInLandingPage />
            </> : <></>}

        </>
    )
}

export default RestaurantPage