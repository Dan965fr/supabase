import express from 'express';
import supabase from './db.js';
import { authenticate } from './utils.js';
import { config } from "dotenv";
config();



const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000





app.post('/login',async (req,res)=>{
    const {username,password} = req.body;
    const user = await authenticate(username,password)
    if(user){
        res.json({msg:"login successful",user})
    }else{
        res.status(401).json({msg:"wrong username or password "})
    }
})


app.get('/products',async (req,res)=>{
    const username = req.headers['username']
    const password = req.headers['password']


    if (!username || !password) {
        return res.status(400).json({ msg: "Missing credentials in headers" });
    }

    const user = await authenticate(username, password);
    if (!user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }


    const { data: products, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        return res.status(500).json({ msg: "Failed to fetch products", error });
    }

    res.json({ products });
});





app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})