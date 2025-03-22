import React from "react";
import { Link } from "react-router-dom";

function Logo({ size = "30" }) {
    return (
        <>
            <Link to={'/'} className="flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="bi bi-play-fill" viewBox="0 0 16 16">
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
            </svg>
                <span className="font-bold text-white">SocialTube</span>
            </Link>
        </>
    );
}

export default Logo;
