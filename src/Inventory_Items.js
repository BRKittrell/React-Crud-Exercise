import axios from "axios";

const Inventory_Items = ({ inventoryItems, setInventoryItems }) => {
  const deleteItem = (inventory_id) => {
    axios
      .delete(`http://localhost:4440/inventory/${inventory_id}`)
      .then((response) => {
        console.log("This item has been deleted!");
      });
  };

  const patchItem = (
    inventory_id,
    updatedItemName,
    updatedQuantity,
    updatedDate
  ) => {
    const newData = {
      item_name: updatedItemName,
      item_quantity: updatedQuantity,
      inventory_date: updatedDate,
    };
  
    axios
      .patch(`http://localhost:4440/inventory/${inventory_id}`, newData)
      .then((response) => {
        console.log("This item has been edited!");
        // update the inventoryItems state with the new data
        setInventoryItems((prevItems) => {
          const updatedItems = prevItems.map((item) => {
            if (item.inventory_id === inventory_id) {
              return { ...item, ...newData };
            }
            return item;
          });
          return updatedItems;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Inventory Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item, index) => (
            <tr key={index}>
              <td>{item.item_name}</td>
              <td>{item.item_quantity}</td>
              <td>{new Date(item.inventory_date).toLocaleDateString()}</td>
              <td>
                <input
                  type="text"
                  defaultValue={item.item_name}
                  onChange={(event) =>
                    patchItem(
                      item.inventory_id,
                      event.target.value,
                      item.item_quantity,
                      item.inventory_date
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  defaultValue={item.item_quantity}
                  onChange={(event) =>
                    patchItem(
                      item.inventory_id,
                      item.item_name,
                      event.target.value,
                      item.inventory_date
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="date"
                  defaultValue={item.inventory_date}
                  onChange={(event) =>
                    patchItem(
                      item.inventory_id,
                      item.item_name,
                      item.item_quantity,
                      event.target.value
                    )
                  }
                />
              </td>
              <td>
                <button onClick={() => patchItem(item.inventory_id)}>
                  Edit
                </button>
                <button onClick={() => deleteItem(item.inventory_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Inventory_Items;
