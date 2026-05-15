import { useEffect, useState } from "react"
import type { showType } from "../components/showType"
import Shows from "../components/Shows"


const HomePage = () => {
    const [allShows, setAllShows] = useState<showType[] | undefined>()
    const [filteredShows, setFilteredShows] = useState<showType[] | undefined>()
    const [pageNum, setPageNum] = useState(1)
    const [favs, setFavs] = useState<string[]>([])
    const [type, setType] = useState("movie")

    const fetchShows = (pageNum : number) => {
        const url = `http://localhost:3000/movies?page=${pageNum}&type=${type}`

        const req = new Request(url, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        fetch(req)
            .then((res) => res.json())
            .then((data) => {
                setAllShows(data)
                setFilteredShows(data)
            })
    }
    useEffect(() => {
        fetch("http://localhost:3000/favs")
            .then(res => res.json())
            .then(data => {
                const favIDs = data.map((f: any) => f.showID)
                setFavs(favIDs)
            })
    }, [])

   useEffect(() => {
    fetchShows(pageNum)
}, [pageNum, type]) 

    {/* Next and Prev Buttons */}
   const handleNext = () => {
    setPageNum(pg => pg + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
}

    const handlePrev = () => {
    setPageNum(pg => (pg - 1 <= 0 ? 1 : pg - 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
}

    {/*Search for rating or year or title*/}
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value.toLowerCase()

        setFilteredShows(
            allShows?.filter((show) => {
                return (
                    show.title?.toLowerCase().includes(search) ||
                    show.year?.toString().includes(search) ||
                    show.imdb?.rating?.toString().includes(search)
                )
            })
        )
    }

    const toggleFav = (id: string) => {
    if (favs.includes(id)) {
        fetch(`http://localhost:3000/favs/delete/${id}`, {
            method: "DELETE"
        }).then(() => {
            setFavs(prev => prev.filter(f => f !== id))
        })
    } else {
        fetch(`http://localhost:3000/favs/add/${id}`, {
            method: "POST"
        }).then(() => {
            setFavs(prev => [...prev, id])
        })
    }
}

    return (
        <>
            {/*Search Bar and filter dropdown box*/}
            <div className="relative flex items-center p-4">


            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                <input onChange={handleSearch} className="border-2 text-center p-2 w-60" placeholder="Search movies or series"/>
                <i className="fa-solid fa-magnifying-glass text-5xl rounded-md cursor-pointer"></i>
            </div>

            <div className="ml-auto">
                <select onChange={(e) => setType(e.target.value)} className="bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded">
                    <option value="movie">Movies</option>
                    <option value="series">Series</option>
                </select>
            </div>
            </div>



            {/*Grid of shows*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {filteredShows && filteredShows.length > 0 ? (
                    filteredShows.map((show) => (
                        <Shows show={show} favs={favs} toggleFav={toggleFav} key={show._id} />))
                ) : (
                    <p className="text-center text-4xl col-span-3 text-blue-600">No Shows Found</p>
                )}
            </div>

            {/* Next and Prev */}
            <div className="flex justify-around mt-4">
                <button
                    className="border-black bg-blue-600 hover:text-black hover:bg-blue-300 text-white p-2 w-24 rounded"onClick={handlePrev}
                >
                    Prev
                </button>

                <button
                    className="border-black bg-blue-600 hover:text-black hover:bg-blue-300 text-white p-2 w-24 rounded"onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </>
    )
}

export default HomePage
















//Website made by 1Kazso(Kobe)