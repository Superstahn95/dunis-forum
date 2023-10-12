import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import Container from "../components/Container";

function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Container>
        <section className="grid grid-cols-3 py-10 gap-8">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </section>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
