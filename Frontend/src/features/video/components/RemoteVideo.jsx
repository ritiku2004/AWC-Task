import React, { useRef, useEffect } from 'react';

const RemoteVideo = ({ stream, username }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="mb-2">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full rounded-md bg-black"
      />
      <p className="text-center text-sm mt-1">{username}</p>
    </div>
  );
};

export default RemoteVideo;