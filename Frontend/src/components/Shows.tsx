import { Link } from "react-router"
import type { showType } from "./showType"

interface Props {
    show: showType
    favs: string[]
    toggleFav: (id: string) => void
}


const Shows = ({ show, favs}: Props) => {
    return (
        <div className="relative group overflow-hidden rounded-xl shadow-lg aspect-[2/3]">

            <img
                src={show.poster}
                alt={show.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300" />

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300">

                <Link to={`/show/${show._id}`}>
                    <h2 className="text-lg font-bold hover:underline hover:text-blue-600">
                        {show.title}
                    </h2>
                </Link>

                <p className="text-xl">{show.year}</p>


                <p className="text-yellow-400 text-xl">⭐ {show.imdb.rating}</p>

                <p className="mt-2 text-2xl transition">
                    {favs.includes(show._id) ? (
                        <i className="fa-solid fa-bookmark text-yellow-400"></i>
                    ) : (
                        <i className="fa-regular fa-bookmark text-yellow-400"></i>
                    )}
                </p>
            </div>
        </div>
    )
}

export default Shows










//Website made by 1Kazso(Kobe)