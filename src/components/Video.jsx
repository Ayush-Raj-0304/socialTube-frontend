import React from "react";

function Video({ src, poster }) {
    return (
        <>
            <video
                src={src}
                poster={poster}
                autoPlay
                controls
                playsInline
                className="w-full h-auto max-h-[70vh] object-contain"
            ></video>
        </>
    );
}

export default Video;
