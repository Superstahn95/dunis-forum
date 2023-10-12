import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";
import CommentBox from "../components/CommentBox";

function PostDetails() {
  return (
    <>
      <Navbar />
      <Container>
        <section className="py-10 font-montserrat">
          <div className=" w-full md:w-[50%] mx-auto my-7">
            <span className="text-gray-500 text-xl ">Kids Coding</span>
            <h1 className="font-semibold my-2 text-3xl md:text-5xl">
              {" "}
              Summer coding for kids to begin soon
            </h1>
            <span className="text-gray-500 text-xl ">Oct 10, 2023</span>
          </div>
          <img
            className="h-[300px] md:h-[500px] w-full object-cover"
            src="https://cdn.pixabay.com/photo/2023/10/06/02/49/flowers-8297333_1280.jpg"
            alt="post image"
          />

          {/* post body */}
          <div className="w-full my-7 md:max-w-4xl mx-auto">
            <p className="leading-loose">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
              reprehenderit expedita quos veritatis dolorem soluta similique
              eius animi vitae eaque voluptate sit unde aspernatur, aut qui
              rerum quod nobis tempora aperiam! Accusantium, illo. Nisi aliquam,
              temporibus itaque odio voluptatem error aliquid quaerat,
              laudantium reiciendis, accusantium aperiam sapiente eos ipsum
              facilis. Velit, error? Natus architecto aliquam corrupti ex
              repellendus alias pariatur, sapiente quo quia similique laboriosam
              saepe nisi facilis voluptas mollitia illo sunt, quam itaque
              voluptatem, ipsum cupiditate dolores nesciunt quasi in! Expedita
              nobis iure iusto earum ullam ab nemo optio odio doloremque.
              Doloremque eos voluptatem perspiciatis, officiis adipisci et
              excepturi reiciendis modi eligendi quod nobis illum nihil, dolore
              est inventore velit, in culpa ipsum commodi! Velit doloribus iste
              voluptates modi sequi nostrum ut. Fugit porro repellat vero, modi
              delectus excepturi! Veritatis excepturi architecto distinctio
              voluptatum dolorem, ad id nostrum itaque. Obcaecati commodi
              voluptatem consequuntur similique veniam ullam voluptas, omnis
              impedit quam perferendis quidem quisquam iste neque eligendi
              fugiat minus. Dolorum maiores minus molestias maxime. Sed labore
              suscipit, dignissimos cumque accusantium similique velit, et
              perspiciatis repudiandae necessitatibus amet in. Voluptates
              doloremque blanditiis dolorem esse? Quo consectetur dolorem
              temporibus repudiandae voluptatibus est labore sint laboriosam,
              provident porro at autem maxime beatae cum, cumque, vero maiores
              necessitatibus explicabo officia veniam? Nostrum similique
              perferendis id praesentium quasi, tenetur possimus hic ut omnis
              natus debitis odit temporibus alias. Perspiciatis unde itaque ea
              voluptates dignissimos voluptatum, vitae iure possimus id quasi
              ratione minima quisquam labore ipsum quam in, quis optio at
              architecto, debitis consectetur. Nobis maiores eos placeat
              necessitatibus totam voluptates est molestiae inventore
              accusantium hic at et sed ipsa culpa aut unde modi corrupti,
              tenetur natus rem! Magni illo corporis esse iste recusandae! At,
              quis sed magni doloribus blanditiis odio nostrum dolorum voluptate
              explicabo! Omnis quod corrupti dolor vero quam pariatur voluptas
              distinctio eveniet. Dignissimos, quos voluptates animi dolor cum
              nemo perferendis eaque reiciendis doloribus dolore voluptatum iste
              recusandae laboriosam nisi consequatur sunt odio non error minima
              velit adipisci quisquam pariatur quo! Magnam beatae dolor minima
              aliquid corporis quod numquam autem quisquam illo necessitatibus?
              Dolorem reprehenderit laboriosam, debitis dolor mollitia enim
              aperiam excepturi doloremque aspernatur velit est! Obcaecati
              dolores laboriosam perferendis ut id officiis impedit laborum
              atque excepturi saepe incidunt vitae illo, harum fugiat? Ipsa
              labore similique quod autem nisi recusandae perferendis mollitia
              dolore, earum impedit facere blanditiis corporis commodi rem
              expedita magni nemo cum excepturi. Est sed mollitia, corrupti
              ducimus expedita dolor atque natus.
            </p>
            {/* comment textfield */}
            <div className="flex flex-col space-y-2 mt-7">
              <h3 className="font-bold text-lg">Comments:</h3>
              <CommentBox />
              <CommentBox />
              <CommentBox />
              <div className="flex items-center">
                <input
                  type="text"
                  name="comment"
                  className="flex-1 border border-gray-500 outline-none rounded-md p-2 "
                />
                <button className="bg-orange-500 text-white rounded-md p-2">
                  Comment
                </button>
              </div>
            </div>
          </div>
        </section>
      </Container>
      <Footer />
    </>
  );
}

export default PostDetails;
