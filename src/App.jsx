import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import instance from "./axios";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/admin/Dashboard";
import PrivateRoute from "./pages/PrivateRoute";
import ProductForm from "./pages/ProductForm";
import AuthForm from "./pages/AuthForm";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get("/products");
        setProducts(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const nav = useNavigate();
  const removeProduct = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa?")) {
      (async () => {
        try {
          await instance.delete(`/products/${id}`);
          const newData = products.filter((item) => item.id !== id);
          setProducts(newData);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  };

  const handleProduct = async (data) => {
    if (data.id) {
      // logic cho edit product
      await instance.patch(`/products/${data.id}`, data);
      // console.log(result.data);
      const newData = await instance.get(`/products`);
      setProducts(newData.data);
    } else {
      // logic cho add
      const result = await instance.post("/products", data);
      // console.log(result.data);
      setProducts([...products, result.data]);
    }
    if (confirm("Succesfullly!, redirect to Admin page!")) {
      nav("/admin");
    }
  };

  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home data={products} />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />

          <Route path="/register" element={<AuthForm isRegister />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/" element={<Navigate to="/admin" />} />

          <Route path="/admin" element={<PrivateRoute />}>
            <Route
              path="/admin"
              element={
                <Dashboard data={products} removeProduct={removeProduct} />
              }
            />
            <Route
              path="/admin/product-add"
              element={<ProductForm handleProduct={handleProduct} />}
            />

            <Route
              path="/admin/product-edit/:id"
              element={<ProductForm handleProduct={handleProduct} />}
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
