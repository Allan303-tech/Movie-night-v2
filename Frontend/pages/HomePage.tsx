import { useEffect, useState } from "react"
import type { showType } from "../components/showType"
import Shows from "../components/Shows"



<link rel="icon" type="image/svg+xml" href="blue.png" />

const HomePage = () => {
    const [allShows, setAllShows] = useState<showType[] | undefined>()
    const [filteredShows, setFilteredShows] = useState<showType[] | undefined>()
    const [pageNum, setPageNum] = useState(1)
    const [favs, setFavs] = useState<string[]>([])

    const fetchShows = (pageNum: number) => {
        const url = `http://localhost:3000/movies?page=${pageNum}`

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
    }, [pageNum])

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

    return (
        <>
            {/*Search Bar*/}
            <div className="flex justify-center p-4">
                <input onChange={handleSearch} className="border-2 p-2 w-60" placeholder="Search movies or series"/>
                <i className="fa-solid fa-magnifying-glass text-5xl rounded-md cursor-pointer"></i>
            </div>



            {/*Grid of shows*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {filteredShows && filteredShows.length > 0 ? (
                    filteredShows.map((show) => (
                        <Shows show={show}  favs={favs} key={show._id} />))
                ) : (
                    <p className="text-center col-span-3 text-blue-600">No Shows Found</p>
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