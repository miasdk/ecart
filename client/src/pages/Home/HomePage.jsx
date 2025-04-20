import React, {useEffect, useState} from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import BannerImage from '../../components/banner/BannerImage'
import SellerBanner from '../../components/banner/SellerBanner'
import SearchBar from '../../components/Bar/Search/SearchBar'
import CardCarousel from '../../components/Carousel/CardCarousel'
import Footer from '../../components/footer/Footer'
import FilterBar from '../../components/Filter/FilterBar/FilterBar'
import './HomePage.css'
import Card from '../../components/Card/Card'
const HomePage = ( props ) => {
  const user = useUser()
  const [selectedFilter, setSelectedFilter] = useState(null)
  const [likes, setLikes] = useState([])
  const [products, setProducts ] = useState([])

 
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('http://localhost:3001/products')
      const data = await res.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])
  const handleFilterSelect = (filter)  => {
    setSelectedFilter(filter)
  }

  const productByCategory = selectedFilter ? props.data.filter((product) => product.category === selectedFilter) : props.data
  
  //filter props data by products with the most likes
  
return (
    <>
    { selectedFilter === null ?
    
    <div>
      <div className='container-xl'>
      <SearchBar />
      <FilterBar />
        <BannerImage />
      </div>
      
        <CardCarousel
        title='Shop our latest products'
     
        data={props.data}
        />
        &nbsp;
        <div className='container-xl'>
        <SellerBanner />
        </div>
        
        <CardCarousel
        title='Top selling products'
        subtitle='Browse our most popular products.'
        data={props.data}
        />
        <Footer />
    </div>
    :
    <div className="container-xl">
      <SearchBar 
      onFilterSelect={handleFilterSelect}
      />
      <FilterBar />
        <BannerImage />
        &nbsp;
        <div className="row">
                    <div className="col-md-12"> 
                        <h3 className='text-left'
                        style={{
                            fontWeight: 'bold',
                            fontFamily: 'Arial',
                        }}
                        >Shop {selectedFilter}</h3>
                        <p className='text-left'
                        style={{
                            fontFamily: 'Arial',
                        }}
                        >{productByCategory.length} results in {selectedFilter}.</p>
                    </div>
                    {productByCategory.map((listing) => (
                        <div className="col-md-4 mb-3">
                            <Card
                            id={listing.id} 
                            title={listing.title}
                            size={listing.size}
                            image={listing.image}
                            condition={listing.condition}
                            category={listing.category}
                            color={listing.color}
                            price={listing.price}
                            submittedBy={listing.submittedby}
                            submittedOn={listing.submittedon}
                            />
                        </div>
                    ))}
                </div>
                &nbsp;
        <CardCarousel
        title='All products'
        subtitle='Browse all products.'
        data={props.data}
        />
        <Footer />
    </div>
    }
    </>   
  )
}

export default HomePage