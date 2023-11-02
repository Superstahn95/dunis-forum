import Container from "./Container";
import React from "react";

function Header({ handleSearch }) {
  return (
    <header className="bg-green-700 min-h-[40vh] flex items-center justify-center">
      <Container>
        <div className="flex items-center justify-center font-montserrat ">
          <div className="text-white">
            <h1 className="text-center font-bold text-xl md:text-4xl mb-2">
              Explore Our latest DunisTech News{" "}
            </h1>
            <h2 className="text-center text-white text-sm md:text-xl mb-3">
              Be part of our ever growing family and community!!
            </h2>
            <div className="">
              {/* the input field with the search functionality */}
              <input
                type="text"
                onChange={handleSearch}
                className="border-none rounded-md p-3 outline-none w-full text-black"
                placeholder="Search post by title"
              />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
