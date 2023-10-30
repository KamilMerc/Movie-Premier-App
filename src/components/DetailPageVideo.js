import React from "react";
import { useState, useEffect } from "react";
import YouTube from 'react-youtube';

const DetailPageVideo = (props) => {
    const [trailer, setTrailer] = useState([])

    const videoUrl = `${process.env.REACT_APP_BASE_URL}${props.id}/videos${process.env.REACT_APP_API_KEY}`

    async function getVideos() {
        await fetch(videoUrl)
            .then((res) => res.json())
            .then((data) => {
                setTrailer(data.results.find(d => d.name === "Official Trailer"))
            })
    }

    useEffect(() => {
        getVideos()
    },[])

    console.log(trailer)

    return (
        <div className="trailer-container">
            {trailer ? 
                <>
                    <p className="trailer-header">Trailer:</p>
                    <div className="video-container">
                        <YouTube
                            videoId={trailer.key}
                            className="trailer"
                            title="Oficial Trailer"
                            opts={{
                                width: "100%",
                                height: "100%",
                                playerVars: {
                                    controls: 1
                                }
                            }}
                        />
                    </div>
                </>
                :
                <p className="trailer-header">Trailer: Not found</p>
            } 
        </div>
    )
}

export default DetailPageVideo