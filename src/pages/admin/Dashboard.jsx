/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Dashboard = ({ data, removeProduct }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold ml-3"> Hello Admin</h1>
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
          {data.map((item) => (
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
                  onClick={() => removeProduct(item.id)}
                  className="btn btn-danger"
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
