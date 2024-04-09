import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductDataModel } from "../../../models/ProductModel";

function CustomTable({
  list,
  deleteButtonPressed,
  editButtonPressed,
}: {
  list: ProductDataModel[];
  deleteButtonPressed: (id: string) => void;
  editButtonPressed: (id: ProductDataModel) => void;
}) {
  const generateRows = (listOfProduct: ProductDataModel[]) => {
    return listOfProduct.map((item) => (
      <tr key={item.id}>
        <td>{item.brand}</td>
        <td>{item.category}</td>
        <td>{item.title}</td>
        <td>{item.rating}</td>
        <td>{item.stock}</td>
        <td>{item.price}</td>
        <td>
          <FontAwesomeIcon
            className="delete-icon"
            icon={faTrash}
            onClick={() => deleteButtonPressed(item.id!)}
          />
        </td>
        <td>
          <FontAwesomeIcon
            className="edit-icon"
            icon={faEdit}
            onClick={() => editButtonPressed(item!)}
          />
        </td>
      </tr>
    ));
  };

  return (
    <div className="product-list-section">
      <table>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Category</th>
            <th>Title</th>
            <th>Rating</th>
            <th>Stock</th>
            <th>price</th>
            <th className="unique-header"></th>
            <th className="unique-header"></th>
          </tr>
        </thead>

        <tbody>{generateRows(list)}</tbody>
      </table>
    </div>
  );
}

export default CustomTable;
