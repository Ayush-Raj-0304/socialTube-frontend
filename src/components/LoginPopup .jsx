import React from "react";
import { Link } from "react-router-dom";
import { Button, Logo } from "../components";

const LoginPopup = () => {
    return (
        <div className="fixed bg-black bg-opacity-0 backdrop-blur-lg inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
            <div className="bg-black bg-opacity-50 backdrop-blur-lg backdrop-blur-lg border-slate-800 rounded-lg p-5 text-white text-center">
                <div className="  flex flex-col gap-2 items-center mb-10">
                    <Logo size="30" />
                </div>
                <p className="text-xl font-medium mb-2">
                    Login or Signup to continue
                </p>
                <Link to="/login">
                    <Button
                        className="bg-purple-500 w-full py-2 px-4 font-bold text-lg rounded"
                        textColor="text-black"
                    >
                        Login
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default LoginPopup;
