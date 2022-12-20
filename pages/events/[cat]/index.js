import Image from 'next/image';
import Link from 'next/link';

const EventsCatPage = ({ data }) => {
    console.log(data);
    const finalizeTitle = data[0].city.charAt(0).toUpperCase().concat(data[0].city.slice(1))

    return (
        <div>
            <h1>Events in {finalizeTitle}</h1>

            {
                data.map(ev =>
                    <Link key={ev.id} href={`/events/${ev.city}/${ev.id}`}>

                        <Image src={ev.image} height={300} width={300} alt={ev.title} />
                        <h4>{ev.title}</h4>

                    </Link>)
            }

        </div >
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