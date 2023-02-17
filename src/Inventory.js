import {React, useState, useEffect} from "react";
import axios from "axios";
import "../src/index.css"
import Inventory_Items from "./Inventory_Items";

const Inventory = () =>{
    const [inventoryInfo, setInventoryInfo] = useState({ 
      item_name: "", 
      item_quantity: 0, 
      inventory_date: ""});

    const handleChange =(e) =>{
      setInventoryInfo({...inventoryInfo, [e.target.name]: e.target.value})
      console.log(e.target.value)
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(inventoryInfo);
      const body = {...inventoryInfo};
      try{
        const createInventory = await fetch ('http://localhost:4440/inventory',{
          method: "POST",
          headers: {"Content-Type": "application/json; charset=utf-8"},
          body: JSON.stringify(body)
        })
      .then((createInventory)=>createInventory.json());
        console.log(createInventory);
        setInventoryInfo({item_name: "", item_quantity: 0, inventory_date: ""})
      }catch (err){
        console.log(err.message)
      }
    }

    const [inventoryItems, setInventoryItems] = useState([]);

    useEffect(() => {
      const getInventory = async () => {
        const response = await axios.get("http://localhost:4440/inventory");
        setInventoryItems(response.data);
      };
      getInventory();
    }, [inventoryInfo, inventoryItems]);

    return (
      <div id="form_container">
        <form id="inventory_form" onSubmit={handleSubmit}>
          <label>Item Name</label>
          <input required type="text" name="item_name" value={inventoryInfo.item_name} onChange={handleChange}></input>
          <label>Quantity</label>
          <input type="number" name="item_quantity" value={inventoryInfo.item_quantity} onChange={handleChange}></input>
          <label>Inventory Date</label>
          <input type="date" name="inventory_date" value={inventoryInfo.inventory_date} onChange={handleChange}></input>
          <button type="submit">Submit Inventory</button>
        </form>
        <Inventory_Items inventoryItems={inventoryItems} setInventoryItems={setInventoryItems} />
      </div>
    )
}

export default Inventory;
