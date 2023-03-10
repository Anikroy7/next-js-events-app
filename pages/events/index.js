import Image from 'next/image';
import Link from 'next/link';

const EventsPage = ({ data }) => {
    // console.log(events_categories);
    return (
        <div>
            <h1>Events page</h1>

            <div>
                {data.map(ev =>
                    <Link key={ev.id} href={`/events/${ev.id}`}>

                        <Image height={300} priority width={300} src={ev.image} alt={ev.title} />
                        <h2>{ev.title}</h2>

                    </Link>
                )}
            </div>
        </div >
    );
}
export default EventsPage;

export async function getServerSideProps() {
    const { events_categories } = await import('../../data/data.json');
    return {
        props: {
            data: events_categories
        }
    }
}