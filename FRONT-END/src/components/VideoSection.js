import React, { useRef, useEffect } from "react";

const VideoSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((error) => {
              console.log("Autoplay with sound blocked:", error);
              // Fallback: Video remains paused, user can interact to play
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the video is visible
      }
    );

    if (video) {
      observer.observe(video);
    }

    return () => {
      if (video) {
        observer.unobserve(video);
      }
    };
  }, []);

  return (
    <section className="section__container video__section" id="video">
      <video
        ref={videoRef}
        loop
        className="section__video"
        preload="auto"
        controls 
      >
        <source src="/assets/BMW 1.mp4" type="video/mp4" />
      </video>
      <div className="video__overlay">
        <h2>Explore Your Career Journey</h2>
        <p>Watch how NextGenJobs can transform your job search experience.</p>
      </div>
    </section>
  );
};

export default VideoSection;