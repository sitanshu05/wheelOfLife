import { Link, NavLink } from "react-router-dom";
import Hamburger from 'hamburger-react'
import { useState } from "react";



const Nav = () => {

    const [isOpen,setIsOpen] = useState<boolean>(false);

    const logOut = () => {
        localStorage.removeItem("Authorization")
        window.location.reload()
    }

    const NavLinks = () => {
        return (
            <>
                {localStorage.getItem("Authorization") && <NavLink to="/profile"><p className="text-2xl font-simple_text pt-2">Profile</p></NavLink>}
                
                {!localStorage.getItem("Authorization") && <NavLink to="/login"><p className="text-2xl font-simple_text pt-2">Login</p></NavLink>}
    
                {!localStorage.getItem("Authorization") && <NavLink to="/signup"><p className="text-2xl font-simple_text pt-2">Sign Up</p></NavLink>}
    
                {localStorage.getItem("Authorization") && <button onClick={logOut}><p className="text-2xl font-simple_text pt-2">Log out</p></button>}
              
                {localStorage.getItem("Authorization") && <NavLink to="/allWheels"><p className="text-2xl font-simple_text pt-2 pb-5">All Wheels</p></NavLink> }
            </>
        )
    }


    function toggleMenu(event : any) {
        event.preventDefault();
        setIsOpen(!isOpen);
    }
    
    
    return(
        <>
        <nav className="flex items-center justify-end w-full">
            <div className="hidden justify-between items-center w-2/6   md:flex">
                <NavLinks/>
            </div>
            <div className="md:hidden">
                <Hamburger toggled={isOpen} toggle={setIsOpen} />
            </div>
        </nav>
        {
            isOpen && (
                <div className="flex flex-col items-center basis-full bg-darker_almond">
                    <NavLinks/>
                </div>
            )
        }
        </>
    )
}

export default Nav;