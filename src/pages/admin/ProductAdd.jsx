import { zodResolver } from "@hookform/resolvers/zod";
import { data } from "autoprefixer";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(6, { message: "Tên sản phẩm có ít nhất 6 ký tự" }),
  price: z.number().min(0),
  description: z.string().optional(),
});

const ProductAdd = ({ onAdd }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <div className="w-50 m-auto">
      <form onSubmit={handleSubmit((data) => onAdd(data))}>
        <h1 className="font-bold mb-3"> Product Add</h1>
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
            Add new Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductAdd;
