import Image from 'next/image';

const EventsCatPage = ({ data }) => {
    console.log(data);
    return (
        <div>
            <h1>Events in {data[0].city}</h1>
            {
                data.map(ev => <a key={ev.id} href={`/events/${ev.city}/${ev.id}`}>
                    <Image src={ev.image} height={300} width={300} alt={ev.title} />
                    <h4>{ev.title}</h4>
                </a>)
            }

        </div>
    );
}
export default EventsCatPage;


export async function getStaticPaths() {
    const { events_categories } = await import('../../../data/data.json');
    const allPaths = events_categories.map(ev => {
        return {
            params: {
                cat: ev.id.toString(),
            }
        }
    })
    console.log(allPaths);
    return {
        paths: allPaths,
        fallback: false
    }
}


export async function getStaticProps(context) {
    console.log(context.params.cat);
    const id = context.params.cat;
    const { allEvents } = await import('/data/data.json');
    const data = allEvents.filter(ev => ev.city === id);
    return {
        props: { data }
    }
}