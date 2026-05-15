import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import type { showType } from "../components/showType"





const ShowOne = () => {
    const { id } = useParams()

    const [show, setShow] = useState<showType | undefined>()
    const [isFav, setIsFav] = useState(false)
    const [watched, setWatched] = useState(false)



    // Fetch single show by ID
    const fetchShow = (showID: string | undefined) => {
        if (!showID) return

        const url = `http://localhost:3000/movie/${showID}`

        const req = new Request(url, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        fetch(req)
            .then((res) => res.json())
            .then((data) => {
                setShow(data)
            })
    }

    useEffect(() => {
        if (!id) return

        fetchShow(id)

        fetch("http://localhost:3000/favs")
            .then(res => res.json())
            .then(data => {
                const fav = data.find((f: any) => f.showID === id)

                if (fav) {
                    setIsFav(true)
                    setWatched(fav.watched)
                }
            })
    }, [id])


    const handleAddFav = () => {
        if (!id) return

        fetch(`http://localhost:3000/favs/add/${id}`, {
            method: "POST"
        }).then(() => {
            setIsFav(true)
        })
    }


    const handleDeleteFav = () => {
        if (!id) return

        fetch(`http://localhost:3000/favs/delete/${id}`, {
            method: "DELETE"
        }).then(() => {
            setIsFav(false)
            setWatched(false)
        })
    }


    const handleWatchToggle = () => {
        if (!id) return

        fetch(`http://localhost:3000/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                note: "",
                watched: !watched
            })
        }).then(() => {
            setWatched(prev => !prev)
        })
    }


    // Navigate back to previous page
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <>
            <div className="p-4">
                {/* Back button */}
                <button
                    className="p-2 rounded bg-blue-600 hover:bg-blue-400 text-white"
                    onClick={handleGoBack}
                >
                    Go Back
                </button>

                {/* Show info */}
                <div className="mt-4">
                    {show && (
                        <div className="border border-blue-600 p-4  mt-4 rounded bg-black-300 text-white">
                            <div></div>
                            <h1 className="text-2xl font-bold text-blue-600">{show.title}</h1>

                            <img src={show.poster} className="w-64 my-3  object-cover border-2 border-blue-600" />

                            <p>{show.plot}</p>

                            <div className="flex gap-4 mt-3">
                                <p className="">
                                    <i className="fa-regular fa-clock text-yellow-400"></i>
                                    {show.runtime} </p>

                                <p className="">
                                    <i className="fa-regular fa-calendar text-lg text-yellow-400"></i>
                                    {show.year}</p>

                                <p className="">
                                    <i className="fa-solid fa-star text-yellow-400"></i>
                                    {show.imdb.rating}</p>

                                <p className="">Genres: {show.genres.join(", ")}</p>

                                <p className="">Rated: {show.rated}</p>

                                <p className="">
                                    <i className="fa-solid fa-globe text-lg text-yellow-400"></i>
                                    {show.languages.join(", ")}
                                </p>

                                <p className="">
                                    <i className="fa-regular fa-flag text-lg text-yellow-400"></i>
                                    {show.countries.join(", ")}
                                </p>

                                <p className="">
                                    <i className="fa-solid fa-film text-lg text-yellow-400"></i>
                                    {show.type}
                                </p>
                            </div>

                            {/* add to favourites and watch button and delete button*/}
                            <div className="flex gap-4">

                                {/* "add and added" */}
                                <button
                                    onClick={isFav ? undefined : handleAddFav}
                                    className={`mt-3 p-2 rounded cursor-pointer 
                                        ${isFav ? "bg-green-600" : "bg-blue-600 hover:bg-blue-400"} text-white`}
                                >
                                    {isFav ? "Added to Favourites" : "Add to Favourites"}
                                </button>

                                {/* "watch and watched" */}
                                <button
                                    onClick={handleWatchToggle}
                                    className={`mt-3 p-2 rounded w-24 ${watched
                                        ? "bg-yellow-500" : "bg-blue-600 hover:bg-blue-400"} text-white`}
                                >
                                    {watched ? "Watched" : "Watch"}
                                </button>

                                {/* delete from favourites */}
                                <button
                                    onClick={handleDeleteFav}
                                    className="mt-3 p-2 rounded bg-red-600 hover:bg-red-400 text-white"
                                >
                                    Delete from Favourites
                                </button>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ShowOne










//Website made by 1Kazso(Kobe)