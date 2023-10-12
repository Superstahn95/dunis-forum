import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ForumComment from "../components/ForumComment";
import Container from "../components/Container";
import CodeHighlighter from "../components/CodeHighlighter";
import ForumPostForm from "../components/Form/ForumPostForm";
import { useState } from "react";

function ForumPostDetails() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Navbar />
      <section className="min-h-[70vh]  bg-green-800 py-10">
        <Container>
          <div className="flex bg-green-700 space-x-4 p-5 rounded-lg font-montserrat">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt=""
              className="w-24 h-24"
            />
            <div className="flex-1">
              <h2 className="text-white font-bold">Stanley Chukwuemeka</h2>
              <span className=" text-gray-400 text-sm">Posted 3 hours ago</span>
              {/* title div */}
              <div className="my-4 bg-green-800 p-4 rounded-md">
                <h1 className="text-white font-montserrat font-bold text-3xl">
                  Random forum post by a user
                </h1>
              </div>
              {/* body section */}
              <div>
                <p className="text-white leading-loose">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                  nam beatae amet magni. Aliquam, ratione error quisquam ipsam
                  explicabo, voluptatibus, excepturi laboriosam labore obcaecati
                  maiores iure cumque repellendus at voluptate commodi ab? Ab
                  placeat, ut nostrum unde aliquam aspernatur libero culpa
                  dolor. Minima esse ea ipsa quidem debitis dicta excepturi.
                </p>
              </div>
              {/* code block */}
              <div className="my-4">
                <CodeHighlighter />
              </div>
            </div>
          </div>
          <ForumComment />
          {/* trigger reply button */}
          <div
            onClick={() => setShowForm(true)}
            className="my-4 px-4 border border-dashed border-orange-500 rounded-md flex items-center space-x-2 cursor-pointer"
          >
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt=""
              className="w-10 h-10"
            />
            <button className="p-4 bg-transparent font-montserrat text-white">
              Write a reply
            </button>
          </div>
          {showForm && <ForumPostForm setShowForm={setShowForm} />}
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default ForumPostDetails;
