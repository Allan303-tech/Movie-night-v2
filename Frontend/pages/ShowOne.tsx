import { useEffect, useState } from "react"
import { useNavigate, useParams} from "react-router"
import type { showType } from "../components/showType"

const ShowOne = () => {
    const { id } = useParams()

    const [show, setShow] = useState<showType | undefined>()

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
        fetchShow(id)
    }, [id])

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

                            <img src={show.poster}className="w-64 my-3 border-2 border-blue-600"/>

                            <p>{show.plot}</p>


                        <p className="">Runtime: {show.runtime}minutes </p>

                        <p className="">Year: {show.year}</p>
                        


                        <p className="text-yellow-400 font-bold text-lg">⭐ {show.imdb.rating}</p>
                           
                        <p>Genres: {show.genres.join(", ")}</p>

                        <p>Rated: {show.rated}</p>

                        <p>Languages: {show.languages.join(", ")}</p>

                        <p>Country: {show.countries.join(", ")}</p>

                        <p>Type: {show.type}</p> 

                        
                          

                            {/* add to favourites and watch button */}
                            <div className="flex  gap-4">

                            <button className="mt-3 cursor-pointer bg-blue-600 hover:bg-blue-400 text-white p-2 rounded">
                                Add to Favourites
                            </button>

                            <button className="mt-3 cursor-pointer bg-blue-600 w-20 hover:bg-blue-400 text-white p-2 rounded">
                                Watch
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