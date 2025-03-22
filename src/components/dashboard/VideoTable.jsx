import React from "react";
import { ImBin, GrEdit } from "../../components/icons";
import TogglePublish from "../TogglePublish";

function VideoTable({ videos, setPopUp, setVideoDetails }) {
    return (
        <>
            <section className="mx-auto w-full overflow-x-scroll">
                <table className="min-w-full  bg-opacity-50 backdrop-blur-lg">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-black bg-opacity-50 backdrop-blur-lg">
                                Toggle Publish
                            </th>
                            <th className="py-2 px-4 bg-black bg-opacity-50 backdrop-blur-lg">
                                Status
                            </th>
                            <th className="py-2 px-4 bg-black bg-opacity-50 backdrop-blur-lg">
                                Uploaded
                            </th>
                            <th className="py-2 px-4 bg-black bg-opacity-50 backdrop-blur-lg">
                                Rating
                            </th>
                            <th className="py-2 px-4 bg-black bg-opacity-50 backdrop-blur-lg">
                                Date Uploaded
                            </th>
                            <th className="py-2 px-4 bg-black bg-opacity-50 backdrop-blur-lg"></th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {videos?.map((video) => (
                            <tr key={video?._id}>
                                <td className="py-2 px-4 bg-black bg-opacity-50 backdrop-blur-lg">
                                    <TogglePublish
                                        isPublished={video?.isPublished}
                                        videoId={video?._id}
                                    />
                                </td>
                                <td className="py-2 px-4 bg-black bg-opacity-50 backdrop-blur-lg ">
                                    {video?.isPublished ? (
                                        <span className="text-green-500 py-1 px-2 border border-green-500 rounded-full">
                                            Published
                                        </span>
                                    ) : (
                                        <span className="text-orange-500 py-1 px-2 border border-orange-500 rounded-full">
                                            UnPublished
                                        </span>
                                    )}
                                </td>
                                <td className="py-2 px-4 bg-black bg-opacity-50 backdrop-blur-lg">
                                    {video?.title}
                                </td>
                                <td className="bg-black bg-opacity-50 backdrop-blur-lg">
                                    <span className="border rounded-lg outline-none px-2 bg-green-200 text-green-600">
                                        {video?.likesCount} likes
                                    </span>
                                </td>
                                <td className="py-2 px-4 bg-black bg-opacity-50 backdrop-blur-lg">
                                    {video?.createdAt?.day}/
                                    {video?.createdAt?.month}/
                                    {video?.createdAt?.year}
                                </td>
                                <td className="py-2 bg-black bg-opacity-50 backdrop-blur-lg">
                                    <span className="flex gap-3 justify-start">
                                        <ImBin
                                            size={20}
                                            className="cursor-pointer hover:text-purple-500"
                                            onClick={() => {
                                                setPopUp((prev) => ({
                                                    ...prev,
                                                    deleteVideo:
                                                        !prev.deleteVideo,
                                                }));
                                                setVideoDetails(video);
                                            }}
                                        />
                                        <GrEdit
                                            size={20}
                                            className="cursor-pointer hover:text-purple-500"
                                            onClick={() => {
                                                setPopUp((prev) => ({
                                                    ...prev,
                                                    editVideo: !prev.editVideo,
                                                }));
                                                setVideoDetails(video);
                                            }}
                                        />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default VideoTable;
