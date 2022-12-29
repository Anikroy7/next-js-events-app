/* const stripe = require("stripe")(process.env.STRIPE_SECERT_KEY)

export default async (req, res) => {
    // const { item, email, price } = req.body;
    // console.log('create checkout again', item, email, price);
    console.log('create checkout', req.body);
    const { item, email, price } = req.body;
    const transfromedItem = {
        quantity: 1,
        price_data: {
            currency: "usd",
            unit_amount: price * 100, // price in cents
            product_data: {
                name: item.title
            }
        },
        description: item.description,
        // images: [item.image], // optional
    };





    try {
        const session = await stripe.checkout.sessions.create({
            //payment_method_types: ['card'],
            line_items: [transfromedItem],
            mode: "payment",
            success_url: "http://localhost:3000",
            metadata: {
                email,
            }
        });
        res.status(200).json({
            // id: session.id
            name: "hello",
            item, email
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
} */



/* 


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: '{{PRICE_ID}}',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}*/


const stripe = require('stripe')(process.env.STRIPE_SECERT_KEY);

export default async function handler(req, res) {
  const { items, email } = req.body;
  // console.log(item, email, price);
  const transformedItems = items.map((item) => ({
    quantity: 1,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        description: item.description,
        name: item.title,
        images: [item.image],
      },
    },
  }));



  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    /*    shipping_rates: ["shr_1LkVMHSArY9HEMGlxjejfRWf"],
       shipping_address_collection: {
         allowed_countries: ["GB", "US", "CA"],
       }, */
    line_items: transformedItems,
    mode: "payment",
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).json({ id: session.id, message: "Successfull" });
}
