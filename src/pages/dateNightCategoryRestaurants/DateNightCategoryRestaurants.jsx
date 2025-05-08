import React from 'react'
import RestaurantCategoryPageHeader from '../../components/restaurantCategoryPageHeader/RestaurantCategoryPageHeader'
import RestaurantsInCategoryPage from '../../components/restaurantsInCategoryPage/RestaurantsInCategoryPage'
import TopRatedRestaurant from '../../components/topRatedRestaurant/TopRatedRestaurant'

const DateNightCategoryRestaurants = () => {
  return (
    <>
      <RestaurantCategoryPageHeader
        category={"DateNight"}
        headerText={"Whether it’s the intimate ambiance, candlelit tables, or breathtaking views, these restaurants create the perfect setting for an unforgettable evening with your special someone."}
      />

      <TopRatedRestaurant restaurantType={"DateNight"} />
      <RestaurantsInCategoryPage restaurantType={"DateNight"} />
    </>
  )
}

export default DateNightCategoryRestaurants