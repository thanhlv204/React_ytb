import { useParams } from "react-router-dom";
import instance from "../axios";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const [products, setProducts] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`/products/${id}`);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="ml-5 ">
      <h1 className="text-2xl font-bold mb-3">Product Detail</h1>
      <div className="flex">
        <img
          src={products.thumbnail}
          alt={products.title}
          className="bg-slate-300 "
        />
        <div className="*:mb-8 *:ml-10">
          <h1 className="font-semibold text-xl ">{products.title}</h1>
          <p className="text-zinc-500 ps-2  mr-8">{products.description}</p>
          <p className="text-red-500 font-bold text-xl ps-1">
            {products.price}
          </p>
          <button
            type="submit"
            className="border-1 border-red-500 rounded-md px-5 py-2 hover:bg-red-400 hover:text-white"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
