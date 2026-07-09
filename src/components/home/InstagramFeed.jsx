import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Instagram, Heart, MessageCircle } from "lucide-react";
import { products } from "../../services/mockData"; // Using product images as placeholders
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./InstagramFeed.css";

const InstagramFeed = () => {
  // Select a few images to simulate the feed
  // Use useState with lazy initialization to generate random stats once on mount
  const [feedImages] = useState(() =>
    products.slice(0, 8).map((p) => ({
      id: p.id,
      image: p.image,
      likes: Math.floor(Math.random() * 500) + 50,
      comments: Math.floor(Math.random() * 50) + 5,
    })),
  );

  return (
    <section className="instagram-section">
      <div className="instagram-header">
        <div className="insta-icon-wrapper">
          <Instagram size={32} />
        </div>
        <div className="insta-title">
          <h2>Siga-nos no Instagram</h2>
          <a
            href="https://www.instagram.com/therosther_oficial?igsh=MWI3bW80MWFpcXNsaA%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="insta-handle"
          >
            @therosther_oficial
          </a>
        </div>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="instagram-swiper"
      >
        {feedImages.map((item) => (
          <SwiperSlide key={item.id} className="insta-slide">
            <div className="insta-card">
              <img src={item.image} alt="Instagram Post" />
              <div className="insta-overlay">
                <div className="insta-stats">
                  <span>
                    <Heart size={18} fill="white" /> {item.likes}
                  </span>
                  <span>
                    <MessageCircle size={18} fill="white" /> {item.comments}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="insta-footer">
        <a
          href="https://www.instagram.com/therosther_oficial?igsh=MWI3bW80MWFpcXNsaA%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-insta-follow"
        >
          Ver Perfil Completo
        </a>
      </div>
    </section>
  );
};

export default InstagramFeed;
