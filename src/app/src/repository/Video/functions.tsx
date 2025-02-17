import { VideoResult } from './types';

export function GetVideoComponent(video: VideoResult): JSX.Element {
  return (
    <>
      <iframe
        width="560"
        height="315"
        src={video?.link.value.href}
        title={video.title?.value}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
      ></iframe>
    </>
  );
}
