const router = require("express").Router();
const Stripe = require("stripe");
const stripe=Stripe("sk_test_51MBv7EEiClOmVDcAhO0TSJNk8LKW7HefaCVqCSA7qmYFyTBcitZtsQ8qbxQy3iLdVsG7BAgu6kecjhBympFuIROZ00AOOdJviQ");

router.post("/payment", (req,res)=>{
    stripe.charges.create({
        source: req.body.tokenId,
        amount:req.body.amount,
        currency: "usd",
    },(stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr)
            
                switch (stripeErr.type) {
                  case 'StripeCardError':
                    console.log(`A payment error occurred: ${stripeErr.message}`);
                    break;
                  case 'StripeInvalidRequestError':
                    console.log('An invalid request occurred.');
                    break;
                  default:
                    console.log('Another problem occurred, maybe unrelated to Stripe.');
                    break;
                }
        }else{
            res.status(200).json(stripeRes)
        }
    });
});


module.exports = router;