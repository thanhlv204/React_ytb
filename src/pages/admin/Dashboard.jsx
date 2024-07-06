/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import { useContext } from "react";
import instance from "../../axios";

const Dashboard = () => {
  const handleRemove = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa?")) {
      await instance.delete(`/products/${id}`);
      dispatch({ type: "DELETE_PRODUCTS", payload: id });
    }
  };

  const { state, dispatch } = useContext(ProductContext);
  return (
    <div>
      <Link to="/admin/product-add" className="btn btn-primary mb-3 mt-3 ml-3">
        Add new product
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>thumbnail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.description || "Đang cập nhật!"}</td>
              <td>
                {item.thumbnail ? (
                  <img src={item.thumbnail} alt="Đang cập nhật!" />
                ) : (
                  "Đang cập nhật!"
                )}
              </td>
              <td>
                <Link
                  to={`/admin/product-edit/${item.id}`}
                  className="btn btn-warning mb-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
