import {Link} from "react-router"

const NavBar = () => {
    return (
        <> 
            <div className="text-4xl font-bold text-blue-600 cursor-pointer">WELCOME TO MOVIE NIGHT</div>
            <Link className="justify-end mx-3 text-md text-bold hover:bg-blue-600 cursor-pointer " to="/">Home</Link>
            <Link className="mx-3 text-md text-bold hover:bg-blue-600 cursor-pointer" to="/favs">Favourites</Link>
        </>
    )
}

export default NavBar