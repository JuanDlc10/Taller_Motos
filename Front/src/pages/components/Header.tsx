import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <div className="flex items-center justify-center px-4 py-0">
            <Link href='/'>
                <Image
                    src="/img/Logo_Moto-modified.png"
                    priority
                    width={100}
                    height={100}
                    alt="logo"
                />
            </Link>
            <h2 className="text-lg md:text-xl xl:text-2xl text-center font-extrabold text-black-900 mx-4">
                Taller de Motos Rock Rider
            </h2>
            <Link href='/'>
                <Image
                    src="/img/Logo_Moto-modified.png"
                    priority
                    width={100}
                    height={100}
                    alt="logo"
                />
            </Link>
        </div>
    );
}

