import React from 'react'
import RestaurantCategoryPageHeader from '../../components/restaurantCategoryPageHeader/RestaurantCategoryPageHeader'
import TopRatedRestaurant from '../../components/topRatedRestaurant/TopRatedRestaurant'
import RestaurantsInCategoryPage from '../../components/restaurantsInCategoryPage/RestaurantsInCategoryPage'

const OutsideCategoryRestaurants = () => {
    return (
        <>
            <RestaurantCategoryPageHeader
            category={"Outside"}
            headerText={"Enjoy the fresh air and scenic views at these restaurants that offer outdoor dining options, perfect for soaking up the sun or dining under the stars."}
            />
            <TopRatedRestaurant restaurantType={"Outside"}/>
            <RestaurantsInCategoryPage restaurantType={"Outside"}/>
        </>
    )
}

export default OutsideCategoryRestaurants