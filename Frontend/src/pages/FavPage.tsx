import { useEffect, useState } from "react"
import Shows from "../components/Shows"
import type { showType } from "../components/showType"

const FavPage = () => {
  const [movies, setMovies] = useState<showType[]>([])
  const [favIDs, setFavIDs] = useState<string[]>([])

  const toggleFav = async (showID: string) => {
    const res = await fetch("http://localhost:3000/favs/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ showID })
    })
    if (res.ok) {
      setFavIDs(favIDs.filter(id => id !== showID))
      setMovies(movies.filter(movie => movie._id !== showID))
    }
  }

  const fetchFavs = async () => {
    const res = await fetch("http://localhost:3000/favs")
    const favs = await res.json()

    const fullData = await Promise.all(
      favs.map(async (fav: any) => {
        const res = await fetch(`http://localhost:3000/movie/${fav.showID}`)
        return res.json()
      })
    )

    setMovies(fullData)
  }

  useEffect(() => {
    fetch("http://localhost:3000/favs")
      .then(res => res.json())
      .then(async (favs) => {

        setFavIDs(favs.map((f: any) => f.showID))

        const fullData = await Promise.all(
          favs.map(async (fav: any) => {
            const res = await fetch(`http://localhost:3000/movie/${fav.showID}`)
            return res.json()
          })
        )

        setMovies(fullData)
      })
  }, [])

  return (
    <>
      <h1 className="font-bold text-2xl text-blue-600 p-4">My Favourites</h1>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {movies.length > 0 ? (
          movies.map(show => (<Shows key={show._id} toggleFav={toggleFav} show={show} favs={favIDs} />))
        ) : (
          <p className="text-white col-span-3 text-center">
            No favourites yet
          </p>
        )}
      </div>
    </>
  )
}

export default FavPage













//Website made by 1Kazso(Kobe)