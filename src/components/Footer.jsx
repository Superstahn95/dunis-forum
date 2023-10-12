import Container from "./Container";
function Footer() {
  return (
    <footer className="bg-green-700 min-h-[40vh] py-4 flex items-center justify-center font-montserrat">
      <Container>
        <div className="">
          <h3 className="text-center text-white font-bold text-xl mb-2">
            Stay in touch with our latest posts
          </h3>
          <p className="text-white text-center mb-6">
            Subscribe to our newsletter
          </p>
          <div className="flex items-center justify-center space-x-2 w-[500px] mx-auto">
            <input
              placeholder="Enter your email"
              type="text"
              className="border-none rounded-md p-3 outline-none w-full text-black"
            />
            <button className="bg-orange-500 text-white rounded-md p-2">
              Subscribe
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
