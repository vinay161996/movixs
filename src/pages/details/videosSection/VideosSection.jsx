import { useState } from "react";

import "./VideosSection.scss";
import ContentWrapper from "../../../component/ContentWrapper/ContentWrapper";
import PlayIcon from "../PlayBtn";
import VideoPopup from "../../../component/videoPopup/VideoPopup";
import Img from "../../../component/LazyLoadImg/Img";



const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {data?.map(item => (
                            <div
                                key={item.id}
                                className="videoItem"
                                onClick={() => {
                                    setVideoId(item.key);
                                    setShow(true)
                                }}
                            >
                                <div className="videoThumbnail">
                                    <Img src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`} />
                                    <PlayIcon />
                                </div>
                                <div className="videoTitle">
                                    {item.name}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;