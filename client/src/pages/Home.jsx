import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Continent from "../components/Continent/Continent";
import FooterHome from "../components/FooterHome/FooterHome";
import Cards from "../components/Cards/Card";
import styles from "./Home.module.scss";

function Home() {
  const [filteredPosts, setFilteredPosts] = useState([]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.continentContent}>
        <Continent />
      </div>
      <div className={styles.cardsContent}>
        <Cards filteredPosts={filteredPosts} /> {/* Pasar los posts filtrados como prop */}
      </div>
      <div className={styles.footerContent}>
        <FooterHome />
      </div>
    </div>
  );
}

export default Home;
