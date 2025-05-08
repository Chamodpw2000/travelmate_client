import React from 'react'
import RestaurantCategoryPageHeader from '../../components/restaurantCategoryPageHeader/RestaurantCategoryPageHeader'
import TopRatedRestaurant from '../../components/topRatedRestaurant/TopRatedRestaurant';
import RestaurantsInCategoryPage from '../../components/restaurantsInCategoryPage/RestaurantsInCategoryPage';

const VeganAndVegCategoryRestaurants = () => {
   

    return (
        <>
            <RestaurantCategoryPageHeader
            category={"Vegan & Veg"}
            headerText={"From farm-fresh ingredients to creative plant-based dishes, these restaurants are a haven for those seeking healthy, sustainable, and delicious dining options."}
            />
            <TopRatedRestaurant restaurantType={"Vegan & Veg"}/>
            <RestaurantsInCategoryPage restaurantType={"Vegan & Veg"}/>

        </>
    )
}

export default VeganAndVegCategoryRestaurants