import {Link} from "react-router"

const NavBar = () => {
    return (
        <> 
            <div className="text-4xl font-bold text-blue-600 cursor-pointer">WELCOME TO MOVIE NIGHT</div>
            <Link className="justify-end mx-3 text-xl text-bold cursor-pointer " to="/movies">Home</Link>
            <Link className="mx-3 text-xl text-bold cursor-pointer" to="/favourites">Favourites</Link>
        </>
    )
}

export default NavBar