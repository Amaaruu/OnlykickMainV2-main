import React from 'react';
import { Carousel } from 'react-bootstrap';
import Image from '../atoms/Image.jsx'; // Importamos el atomo de IMAGE
import '../../styles/organisms/HeroCarousel.css'; // Importamos el css propio del organismo

// organismo de carrusel
function HeroCarousel() {
  return (
    <Carousel interval={3000} pause={false}>
      <Carousel.Item>
        <Image
          className="d-block w-100 carousel-image"
          src="/img/jordan-fondo.webp"
          alt="Fondo Jordan"
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100 carousel-image"
          src="/img/BASKETABALL,BLANCO Y NEGRO.webp.jpg"
          alt="Jugador de Basketball"
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100 carousel-image carousel-image-centered"
          src="/img/FlightJordan.webp"
          alt="Logo Flight Jordan"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default HeroCarousel;