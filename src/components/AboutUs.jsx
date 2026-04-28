import React from "react";

const AboutUs = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Us</h1>
        <p>Your trusted partner in cycling adventures 🚴‍♂️</p>
      </section>

      <section className="about-content">
        <h2>Who We Are</h2>
        <p>
          We are passionate about bicycles and the freedom they bring. Our
          mission is to provide high-quality bikes and accessories for riders
          of all levels — from beginners to professionals.
        </p>

        <h2>Our Mission</h2>
        <p>
          To inspire healthier lifestyles and eco-friendly transportation by
          making cycling accessible, affordable, and enjoyable for everyone.
        </p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li>🚲 Premium quality bicycles</li>
          <li>🔧 Expert servicing and support</li>
          <li>🌍 Eco-conscious products</li>
          <li>💰 Affordable pricing</li>
        </ul>
      </section>

      <section className="about-team">
        <h2>Our Team</h2>
        <p>
          Our team is made up of cycling enthusiasts, mechanics, and customer
          support specialists dedicated to helping you find the perfect ride.
        </p>
      </section>

      <section className="about-cta">
        <h2>Join the Ride</h2>
        <p>
          Whether you're commuting, training, or exploring, we have the perfect
          bike for you.
        </p>
        <button className="shop-button">Shop Now</button>
      </section>
    </div>
  );
};

export default AboutUs;