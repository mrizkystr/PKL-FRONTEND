import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Banner from "../components/Banner";
import StatsSection from "../components/StatsSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getLandingPageData } from "../api/api";

const LandingPage = () => {
  const [stats, setStats] = useState({
    totalSalesCodes: 0,
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    getLandingPageData()
      .then((data) => setStats(data))
      .catch((error) => console.error("Error fetching landing page data:", error));
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Banner />
        <StatsSection stats={stats} />
      </Container>
      <Footer />
    </>
  );
};

export default LandingPage;
