import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import ProductDetail from "./ProductDetail";
import ProductForm from "./components/ProductForm";
import Dashboard from "./pages/admin/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AuthForm from "./components/AuthForm";
import LayoutClient from "./layouts/LayoutClient";
import LayoutAdmin from "./layouts/LayoutAdmin";

function App() {
  {
    /*
     const [products, setProducts] = useState([]);

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
    */
  }

  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/register" element={<AuthForm isRegister />} />
          <Route path="/login" element={<AuthForm />} />

          <Route path="/" element={<LayoutClient />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
          </Route>

          <Route path="/admin" element={<PrivateRoute />}>
            <Route path="/admin" element={<LayoutAdmin />}>
              <Route index element={<Dashboard />} />
              <Route path="/admin/product-add" element={<ProductForm />} />
              <Route path="/admin/product-edit/:id" element={<ProductForm />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
