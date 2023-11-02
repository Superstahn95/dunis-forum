import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import Container from "../components/Container";
import { useSelector, useDispatch } from "react-redux";
import { reset, getAllPosts } from "../features/postList/postListSlice";
import { Blocks, Circles } from "react-loader-spinner";

//fetch all posts here

const limit = 9;
let pageNo = 0;
function Home() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const {
    posts,
    postsIsLoading,
    postsIsError,
    postsIsSuccess,
    postsErrorMessage,
    postCount,
  } = useSelector((state) => state.postList);

  useEffect(() => {
    dispatch(getAllPosts({ pageNo, limit, searchTerm }));

    return () => {
      dispatch(reset());
    };
  }, [searchTerm]);

  const getPaginationCount = (numberOfPosts) => {
    const quotient = numberOfPosts / limit;
    if (quotient % 1 !== 0) {
      return Math.floor(quotient) + 1;
    }
    return quotient;
  };

  const paginationArray = new Array(getPaginationCount(postCount)).fill(" ");
  const refetchPosts = (page) => {
    pageNo = page;
    dispatch(getAllPosts({ pageNo, limit, searchTerm }));
  };

  return (
    <>
      <Navbar />
      <Header handleSearch={handleSearch} />
      <Container>
        {postsIsLoading ? (
          <section className="min-h-[40vh] flex items-center justify-center">
            <Circles
              height="80"
              width="80"
              color="#ff9800"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </section>
        ) : (
          <>
            {postCount < 1 ? (
              <section className="min-h-[50vh] flex items-center justify-center">
                <div className="text-black font-montserrat text-3xl">
                  No blog posts!!!!
                </div>
              </section>
            ) : (
              <section className="grid md:grid-cols-3 py-10 gap-8">
                {posts?.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </section>
            )}
          </>
        )}
        {paginationArray.length > 1 ? (
          <div className="flex items-center justify-center space-x-3 py-2">
            {paginationArray.map((_, index) => {
              return (
                <button
                  key={index}
                  onClick={() => refetchPosts(index)}
                  className={`w-[30px] h-[30px] flex items-center justify-center text-gray-700 font-montserrat font-bold border border-orange-500  py-1 px-2   ${
                    index === pageNo && "bg-orange-500 "
                  }`}
                >
                  {/* index === pageNo
                         ? "text-blue-500 bg-orange-500 border border-orange-500 py-1 px-2 "
                         : "text-gray-500" */}
                  {index + 1}
                </button>
              );
            })}
          </div>
        ) : null}
      </Container>
      <Footer />
    </>
  );
}

export default Home;
