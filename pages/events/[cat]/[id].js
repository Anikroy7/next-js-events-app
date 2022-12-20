import Image from 'next/image';

const EventPage = ({ data }) => {
    console.log(data);
    const { image, title, description } = data;
    return (
        <div>
            <Image src={image} height={300} width={300} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>

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
    console.log(context);
    const id = context.params.id;
    const { allEvents } = await import('/data/data.json');
    console.log(allEvents);
    const data = allEvents.find(ev => ev.id === id);
    // console.log(data);
    return {
        props: { data }
    }

}