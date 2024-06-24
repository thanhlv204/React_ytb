import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import instance from "../axios";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Mật khẩu ít nhất 6 ký tự!" }),
});

const AuthForm = ({ isRegister }) => {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      if (isRegister) {
        // logic cho register
        await instance.post(`/register`, data);
        if (confirm("Successfully, redirect to login page?")) {
          nav("/login");
        }
      } else {
        // logic cho login
        const result = await instance.post(`/login`, data);
        localStorage.setItem("user", JSON.stringify(result.data));
        if (confirm("Successfully, redirect to login page?")) {
          nav("/admin");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  return (
    <div className="w-50 m-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="font-bold mb-3"> {isRegister ? "Register" : "Login"}</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            {...register("email", { required: true })}
          ></input>
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password", { required: true })}
          ></input>
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary w-100">
            {isRegister ? "Register" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
