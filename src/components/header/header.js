import Link from "next/link";

export const Header = () => (
    <header>
        <nav>
            <Link href="/" passHref>Home</Link>
            <Link href="/events" passHref>Events</Link>
            <Link href="/about-us" passHref>About-us</Link>
        </nav>
    </header>
)