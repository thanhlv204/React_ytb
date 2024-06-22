import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import instance from "./axios";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/admin/Dashboard";
import ProductAdd from "./pages/admin/ProductAdd";
import ProductEdit from "./pages/admin/ProductEdit";

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
  const handleSubmit = (data) => {
    (async () => {
      try {
        const result = await instance.post("/products", data);
        // console.log(result.data);
        setProducts([...products, result.data]);
        if (confirm("Add product succesfullly!, redirect to Admin page!")) {
          nav("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const handleSubmitEdit = (data) => {
    (async () => {
      try {
        const result = await instance.patch(`/products/${data.id}`, data);
        // console.log(result.data);
        const newData = await instance.get(`/products`);
        setProducts(newData.data);
        if (confirm("Add product succesfullly!, redirect to Admin page!")) {
          nav("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    })();
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
          <Route path="/Login" element={<Login />} />
          <Route path="/admin" element={<Dashboard data={products} />} />
          <Route
            path="/admin/product-add"
            element={<ProductAdd onAdd={handleSubmit} />}
          />
          <Route
            path="/admin/product-edit/:id"
            element={<ProductEdit onEdit={handleSubmitEdit} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
