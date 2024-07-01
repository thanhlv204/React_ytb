import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
/* eslint-disable react/prop-types */
function Home() {
  const { state } = useContext(ProductContext);

  return (
    <>
      <h1 className="font-bold text-3xl ">Danh sách sản phẩm</h1>
      <div className=" grid grid-cols-4 gap-8 mt-5">
        {state.products.map((item) => (
          <div key={item.id} className="card mt-5">
            <Link to={`/product-detail/${item.id}`}>
              <img
                src={item.thumbnail}
                alt={item.title}
                className="bg-slate-300 "
              />
            </Link>
            <Link to={`/product-detail/${item.id}`}>
              <h2 className="font-bold mt-4 text-xl ps-3">{item.title}</h2>
            </Link>
            <p className="text-zinc-500 ps-2">{item.description}</p>
            <p className="text-red-500 font-bold text-xl ps-1">{item.price}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
