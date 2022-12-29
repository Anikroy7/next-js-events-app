import Image from 'next/image';
import axios from 'axios';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
    process.env.stripe_public_Key);

const EventPage = ({ data }) => {
    // console.log(data);
    const { image, title, description } = data;

    data.price = 50;

    const items = [data];

    // console.log(newData);

    const createCheckout = async () => {
        const stripe = await stripePromise;
        // Backend session
        const checkoutSesssion = await axios.post('http://localhost:3000/api/checkout_sessions', {
            items: items,
            email: "anikkumerroy7@gmail.com",

        })
        console.log(checkoutSesssion);
        const result = stripe.redirectToCheckout({
            sessionId: checkoutSesssion.data.id
        })

        if (result.error) alert(result.error.message)
    }






    return (
        <div className='single_event'>
            <Image src={image} height={500} width={1024} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
            <p>Price: $500</p>
            <button onClick={createCheckout}>Procced to Checkout</button>
            {/*  <form action="/api/checkout_sessions" method="POST">
                <section>
                    <button type="submit" role="link">
                        Checkout
                    </button>
                </section>
            </form> */}
        </div>
    )
}

export default EventPage;


export async function getStaticPaths() {
    const { allEvents } = await import('/data/data.json');
    const allPaths = allEvents.map((path) => {
        return {
            params: {
                id: path.id,
                cat: path.city
            }
        }
    })

    return {
        paths: allPaths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    // console.log(context);
    const id = context.params.id;
    const { allEvents } = await import('/data/data.json');
    // console.log(allEvents);
    const data = allEvents.find(ev => ev.id === id);
    // console.log(data);
    return {
        props: { data }
    }

}