import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { products } from '../../services/mockData';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './HeroSlider.css';

const HeroSlider = () => {
  // Select hero products - Add more variety for the cycle
  const heroProducts = [
    products.find(p => p.id === 19), // Combo Família Real
    products.find(p => p.id === 10), // 10 em 1 Mega Combo
    products.find(p => p.id === 16), // 5 em 1 Super Combo
    products.find(p => p.id === 3),  // Galo Maluco
    products.find(p => p.id === 20), // Balde 
    products.find(p => p.id === 5),  // Another Burger
  ].filter(Boolean);

  return (
    <div className="hero-slider-container">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1500} // Slower transition for smoothness
        fadeEffect={{ crossFade: true }} // Smooth crossfade
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="hero-swiper"
      >
        {heroProducts.map((product) => (
            <SwiperSlide key={product.id}>
                <div className="hero-slide">
                    <div className="hero-content">
                        <span className="hero-badge">Destaque</span>
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                        <div className="hero-cta-wrapper">
                            <Link to={`/produto/${product.id}`} className="btn-hero btn-order">
                                Peça Agora
                            </Link>
                            <span className="hero-price">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                        </div>
                    </div>
                    <div className="hero-image-wrapper">
                        <img src={product.image} alt={product.name} className="hero-img" />
                    </div>
                </div>
            </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
