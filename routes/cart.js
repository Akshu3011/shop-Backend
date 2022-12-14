const router =require("express").Router();
 
const { verifyToken, verifyTokenAndAuthrization, verifyTokenAndAdmin } = require("./verifyToken");
const Cart = require("../models/Cart")

//CREATE

router.post("/",verifyToken, async (req,res)=>{
    const newCart = new Product(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)
    } catch (err) {
        res.status(500).json(err)
    }
})

 //UPDATE

router.put("/:id",verifyTokenAndAuthrization,async (req,res)=>{
    try{
        const updatedCart = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new:true }
        );
        res.status(200).json(updatedCart)
    }
    catch(err){
        res.status(500).json(err)
    }
})


//DELETE

router.delete("/:id", verifyTokenAndAuthrization, async (req,res)=>{
    try {
        await Cart.findByIdAndDelete(
            req.params.id,
            res.status(200).json("Cart has been Cancelled...")
        )
    } catch (err) {
        res.status(500).json(err)
    }
})


//GET USER CART
//user id 
router.get("/find/:id",verifyTokenAndAuthrization, async (req,res)=>{
    try {
        const cart =  await Cart.find({userId: req.params.id})
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
        
    }
})


//GET ALL 

router.get("/", verifyTokenAndAdmin, async (req,res)=>{
 
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (err) {
        res.status(500).json(err)
        
    }
})


module.exports=router;

