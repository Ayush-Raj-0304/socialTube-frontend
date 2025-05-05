import React from "react";
import { Link } from "react-router-dom";
import { Button, Logo } from "../components";

const LoginPopup = () => {
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-60 backdrop-blur-md p-4">
            <div className="bg-black bg-opacity-50 border border-slate-600 rounded-xl text-white p-6 w-full max-w-md text-center space-y-6">
                <div className="flex flex-col items-center gap-2">
                    <Logo size="30" />
                    <p className="text-xl font-semibold">Login or Signup to continue</p>
                </div>

                <Link to="/login" className="block">
                    <Button
                        className="w-full text-lg py-2 hover:bg-purple-700"
                        bgColor="bg-purple-500"
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
