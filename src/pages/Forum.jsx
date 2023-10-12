import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";
import ForumPost from "../components/ForumPost";
import ForumPostForm from "../components/Form/ForumPostForm";
import { useState } from "react";

function Forum() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Navbar />
      {/* form pop up button */}
      <div
        onClick={() => setShowForm(true)}
        className="fixed right-5 bottom-10 h-10 w-10 text-3xl md:h-24 md:w-24 rounded-full bg-orange-500 text-white cursor-pointer  md:text-6xl flex items-center justify-center"
      >
        +
      </div>
      <div></div>
      <section className="min-h-[70vh]  bg-green-800 py-10">
        <Container>
          <ForumPost />
          <ForumPost />
          <ForumPost />
        </Container>
      </section>
      {showForm && <ForumPostForm setShowForm={setShowForm} />}

      <Footer />
    </>
  );
}

export default Forum;
