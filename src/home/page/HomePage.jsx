import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../assets/images/banner-01-panaderia.jpeg";
import banner2 from "../../assets/images/banner-02-panaderia.jpeg";
import styles from "./HomePage.module.css";
import { NavbarPub } from "../components/NavBarPub";
import { HomeCard } from "../components/HomeCard";
import { GridContainer } from "../components/GridContainer";
import { Footer } from "../components/Footer";
import panaderiaApi from "../../api/panaderiaApi"; // Importa la instancia de API configurada
import { HomeGridProductCard } from "../components/HomeGridProductCard";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const images = [banner1, banner2];
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await panaderiaApi.get("/productos/");
        setProducts(response.data.productos);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <NavbarPub style={{ marginBottom: "20px" }} />
      <div className={styles.homeContainer}>
        <h1>Panaderia Pepito</h1>
        {/* Hero Banner - Carrusel */}
        <div className={styles.heroBanner}>
          <Carousel
            autoPlay
            interval={10000}
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
          >
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className={styles.carouselImage}
                  style={{ maxHeight: "500px" }}
                />
              </div>
            ))}
          </Carousel>
        </div>
        {/* Contenedores adicionales */}
        <div className={styles.introContainer}>
          <p>
            Bienvenido a nuestra panadería, un rincón acogedor donde el aroma a
            pan recién horneado y el espíritu familiar se entrelazan para crear
            una experiencia única. En nuestro negocio, no solo nos dedicamos a
            la panadería artesanal, sino que también cultivamos una tradición
            que ha pasado de generación en generación.
          </p>
        </div>
        <GridContainer>
        <HomeCard
            title="Visítanos"
            description="Descubre nuestros deliciosos productos y disfruta de un ambiente acogedor."
            link="/login"
          />
          <HomeCard
            title="Nuestros Servicios"
            description="Ofrecemos una amplia variedad de panes artesanales y pasteles caseros."
            link="/about"
          />
          <HomeCard
            title="Contáctanos"
            description="Estamos aquí para ayudarte. ¡No dudes en comunicarte con nosotros!"
            link="/contact"
          />
        </GridContainer>
        <h2 className={styles.nosproductTitle}>Nuestros Productos</h2>
        {/* Grid de productos */}
        <HomeGridProductCard products={products} />
      </div>
      <Footer />
    </>
  );
};
