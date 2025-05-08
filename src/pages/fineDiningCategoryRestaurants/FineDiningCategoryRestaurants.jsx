import React from 'react'
import RestaurantCategoryPageHeader from '../../components/restaurantCategoryPageHeader/RestaurantCategoryPageHeader'
import RestaurantsInCategoryPage from '../../components/restaurantsInCategoryPage/RestaurantsInCategoryPage'
import TopRatedRestaurant from '../../components/topRatedRestaurant/TopRatedRestaurant'

const FineDiningCategoryRestaurants = () => {
    return (
        <>
            <RestaurantCategoryPageHeader
            category={"Fine Dining"}
            headerText={"ndulge in exquisite culinary experiences where every detail, from the gourmet dishes to the impeccable service, is designed to leave you with lasting memories of luxury and refinement."}
            />

            <TopRatedRestaurant restaurantType={"Fine Dining"}/>
            <RestaurantsInCategoryPage restaurantType={"Fine Dining"}/>
        </>
    )
}

export default FineDiningCategoryRestaurants