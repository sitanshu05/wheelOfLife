import { NavLink } from "react-router-dom";
import Hamburger from 'hamburger-react'
import { useEffect, useState } from "react";
import blackLogo from "../assets/images/black_logo.png"
import whiteLogo from "../assets/images/white_logo.png"
import { useRecoilState } from "recoil";
import { darkModeAtom } from "../data/atoms/darkModeAtom";
import { Popup } from "../components/Popup";

const Nav = () => {

    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState(false);
    const [darkMode, setDarkMode] = useRecoilState(darkModeAtom);


    useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
      }, [darkMode]);

    const toggleDarkMode = () => {
        const htmlElement = document.documentElement;
        if (darkMode) {
          htmlElement.classList.remove('dark');
        } else {
          htmlElement.classList.add('dark');
        }
        setDarkMode(!darkMode);
      };

      const handleRateUs = () => {
        if(isOpen){
            setIsOpen(false)
        }
        setOpenModal(true)
      }

    const NavLinks = () => {

        const style = "text-2xl font-body_font font-bold text-darkmode_bg hover:text-div_orange dark:text-white lg:dark:text-title_orange dark:hover:text-white  mb-8 lg:mb-0"
        return (
            <>
                {localStorage.getItem("Authorization") && <NavLink to="/profile"><p className={style}>Profile</p></NavLink>}
        
                {!localStorage.getItem("Authorization") && <NavLink to="/login"><p className={style}>Login</p></NavLink>}

                {localStorage.getItem("Authorization") && <NavLink to="/allWheels"><p className={style}>All Wheels</p></NavLink> }

                <a onClick={handleRateUs} className={style}>Rate Us</a> 
                <a href="https://linktr.ee/sitanshu05" className={style}>Find The Dev</a>

                <button><p className={style} onClick={toggleDarkMode}>{darkMode ? "Light Mode" : "Dark Mode"}</p></button>
            </>
        )
    }

    
    
    return(
        <>
        <nav className="flex items-center justify-end w-full z-50">
            <div className="w-full flex justify-between items-center">
                <div className="w-[3rem] md:w-[3.5rem] lg:w-[5rem]">
                    <img src={darkMode ? whiteLogo : blackLogo} alt="" className="w-full"/>
                </div>
              
                <div className="hidden justify-between items-center lg:flex lg:w-[80%] lg:max-w-2xl">
                    <NavLinks/>
                </div>
                <div className="lg:hidden">
                    <Hamburger toggled={isOpen} toggle={setIsOpen} color={darkMode ? "white" : "black"}/>
                </div>
            </div>
        </nav>
        <div className="flex justify-center">
           <Popup showModal={openModal} setShowModal={setOpenModal}/>
        </div>
        {
            isOpen && (
                <div className="h-full w-full z-40  absolute top-0 left-0 flex flex-col items-center justify-center bg-gradient-to-br from-gradient-light_start from-10% to-gradient-light_end to-90% dark:from-gradient-dark_start dark:to-gradient-dark_end">
                    <NavLinks/>
                </div>
            )
        }
        </>
    )
}

export default Nav;