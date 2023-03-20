import React from 'react'
import Categories from '../../components/Categories/Categories'
import ContactBar from '../../components/Contactbar/Contactbar'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Slider from '../../components/Slider/Slider'
import "./Home.scss"

const Home: React.FC = () => {
  return (
    <div className='home'>
      <Categories/>
      <FeaturedProducts type="featured"/>
      <Slider/>
      <FeaturedProducts type="trending"/>
      <ContactBar/>
    </div>
  )
}

export default Home