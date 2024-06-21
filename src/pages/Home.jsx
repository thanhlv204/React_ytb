import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function Home({ data }) {
  return (
    <>
      <h1 className="font-bold text-3xl ">Danh sách sản phẩm</h1>
      <div className=" grid grid-cols-4 gap-8 mt-5">
        {data.map((products) => (
          <div key={products.id} className="card mt-5">
            <Link to={`/product-detail/${products.id}`}>
              <img
                src={products.thumbnail}
                alt={products.title}
                className="bg-slate-300 "
              />
            </Link>
            <Link to={`/product-detail/${products.id}`}>
              <h2 className="font-bold mt-4 text-xl ps-3">{products.title}</h2>
            </Link>
            <p className="text-zinc-500 ps-2">{products.description}</p>
            <p className="text-red-500 font-bold text-xl ps-1">
              {products.price}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
