/* eslint-disable react-hooks/rules-of-hooks */

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import instance from "../axios";
import { ProductContext } from "../contexts/ProductContext";

const schema = z.object({
  title: z.string().min(6, { message: "Tên sản phẩm có ít nhất 6 ký tự" }),
  price: z.number().min(0),
  description: z.string().optional(),
});

const ProductForm = () => {
  const nav = useNavigate();
  const { dispatch } = useContext(ProductContext);

  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  if (id) {
    useEffect(() => {
      (async () => {
        const { data } = await instance.get(`/products/${id}`);
        reset(data);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
  }

  const onSubmit = async (data) => {
    if (id) {
      //logic edit
      const res = await instance.patch(`/products/${id}`, data);
      dispatch({ type: "UPDATE_PRODUCTS", payload: res.data });
    } else {
      //logic add
      const res = await instance.post(`/products`, data);
      dispatch({ type: "ADD_PRODUCTS", payload: res.data });
    }

    nav("/admin");
  };
  return (
    <div className="w-50 m-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="font-bold mb-3"> {id ? "Edit" : "Add"} product</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            {...register("title", { required: true })}
          ></input>
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            {...register("price", { required: true, valueAsNumber: true })}
          ></input>
          {errors.price && (
            <p className="text-danger">{errors.price.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            {...register("description")}
          ></input>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary w-100">
            {id ? "Edit" : "Add"} product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
