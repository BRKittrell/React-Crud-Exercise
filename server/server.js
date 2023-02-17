const express = require('express')

const app = express();
app.use(express.static('public')) 

const cors = require('cors');
app.use(cors());

const {Pool}= require('pg');
const PORT = process.env.port || 4440;

app.use(express.json());

const pool = new Pool({
    user: 'brandonkittrell',
    password: "",
    host: 'localhost',
    port: 5432,
    database: 'inventory'
});

app.post('/inventory', async (req,res) =>{
    try{
        const {item_name, item_quantity, inventory_date} = req.body;
        const {rows} = await pool.query('INSERT INTO inventory (item_name, item_quantity, inventory_date) VALUES ($1, $2, $3)', [item_name, item_quantity, inventory_date])
        res.send(rows)
        console.log("Post successful.")
    }catch (err){
        res.send(err.message)
    }
})

app.get('/inventory', async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM inventory')
        res.send(rows);
        console.log("Get all successful.")
    } catch (err){
        res.send(err.message);
    }
})


app.get('/inventory/:inventory_id', async (req, res) => {
    try {
        const {inventory_id} = req.params
        const {rows} = await pool.query('SELECT * FROM inventory WHERE inventory_id = $1', [inventory_id])
        res.send(rows) 
        console.log("Get one successful.")
    }catch (err){
        console.log(err.message);
    }
})

app.patch('/inventory/:inventory_id', async (req, res) => {
    try{
        const {inventory_id} = req.params
        const {item_name, item_quantity, inventory_date} = req.body
        const {rows} = await pool.query('UPDATE inventory SET item_name = $1, item_quantity = $2, inventory_date = $3 WHERE inventory_id = $4', [item_name, item_quantity, inventory_date, inventory_id])
        res.send(rows)
        console.log('Update successful.')
    }catch (error){ 
        res.send(error);
}
})

app.delete('/inventory/:inventory_id', async (req, res) => {
    const {inventory_id} = req.params
    try{
        const {rows} = await pool.query('DELETE FROM inventory WHERE inventory_id = $1', [inventory_id])
        res.send(rows)
        console.log('Item deleted.');
    }catch (error){
        res.send(error.message);
    }
})

app.listen(PORT, () =>{
    console.log('Listening port:' + PORT)
})