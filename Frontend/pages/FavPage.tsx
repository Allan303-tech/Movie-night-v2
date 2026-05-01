import { useEffect, useState } from "react";
import type { showType } from "../components/showType";
import Shows from "../components/Shows";

const FavPage = () => {
  const [favs, setFavs] = useState<showType[] | undefined>();

  // Favourites
  const fetchFavs = () => {
    fetch("http://localhost:3000/favs", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        setFavs(data);
      });
  };

  useEffect(() => {
    fetchFavs();
  }, []);

  // Delete favourite
  const deleteFav = (id: string) => {
    fetch(`http://localhost:3000/favs/delete/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(() => {
        // refresh list after delete
        fetchFavs();
      });
  };

  return (
    <>
      <h1 className="text-2xl p-4">My Favourites</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {favs && favs.length > 0 ? (
          favs.map((show: any) => (
            <div key={show._id} className="relative">

              {/* show */}
              <Shows show={show} />

              {/* delete button */}
              <button
                onClick={() => deleteFav(show.favID || show._id)}
                className="mt-2 bg-red-500 text-white p-2 rounded w-full"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No favourites yet.</p>
        )}
      </div>
    </>
  );
};

export default FavPage;