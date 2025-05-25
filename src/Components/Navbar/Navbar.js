import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    
    const handleClick = () => setClick(!click);
    
    const extractUsernameFromEmail = (email) => {
        if (!email) return '';
        const namePart = email.split('@')[0];
        return namePart.charAt(0).toUpperCase() + namePart.slice(1);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        setEmail('');
        window.location.reload();
    };

    useEffect(() => { 
        const storedEmail = sessionStorage.getItem("email");
        const storedName = sessionStorage.getItem("name");

        if (storedEmail) {
            setIsLoggedIn(true);
            setEmail(storedEmail);
            setUsername(storedName || extractUsernameFromEmail(storedEmail));
        }
    }, []);

    return (
        <nav>
            <div className="nav__logo">
                <Link to="/">
                    StayHealthy <i style={{color:'#2190FF'}} className="fa fa-user-md"></i>
                </Link>
                <span>.</span>
            </div>
            <div className="nav__icon" onClick={handleClick}>
                <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
            </div>
            <ul className={click ? 'nav__links active' : 'nav__links'}>
                <li className="link">
                    <Link to="/">Home</Link>
                </li>
                <li className="link">
                    <Link to="/search/doctors">Appointments</Link>
                </li>
                <li className="link">
                    <Link to="/healthblog">Health Blog</Link>
                </li>
                <li className="link">
                    <Link to="/reviews">Reviews</Link>
                </li>
                {isLoggedIn ? (
                    <Link to="/profile">
                    <li className="link">
                        <div className="user-container">
                            <span className="username">Hello, {username}</span>
                            <button className="btn2" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </li>
                    </Link>
                ) : (
                    <>
                        <li className="link">
                            <Link to="/signup">
                                <button className="btn1">Sign Up</button>
                            </Link>
                        </li>
                        <li className="link">
                            <Link to="/login">
                                <button className="btn1">Login</button>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;