import React from 'react'
import RestaurantCategoryPageHeader from '../../components/restaurantCategoryPageHeader/RestaurantCategoryPageHeader'
import TopRatedRestaurant from '../../components/topRatedRestaurant/TopRatedRestaurant'
import RestaurantsInCategoryPage from '../../components/restaurantsInCategoryPage/RestaurantsInCategoryPage'

const CasualDiningCategoryRestaurants = () => {
  return (
    <>
      <RestaurantCategoryPageHeader
        category={"Casual Dining"}
        headerText={"These restaurants offer a laid-back atmosphere and a diverse menu of comfort foods, perfect for a casual meal with family and friends."}
      />

      <TopRatedRestaurant restaurantType={"Casual Dining"} />
      <RestaurantsInCategoryPage restaurantType={"Casual Dining"} />
    </>
  )
}

export default CasualDiningCategoryRestaurants