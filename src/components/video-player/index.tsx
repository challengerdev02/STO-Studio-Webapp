import { CSSProperties, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import Plyr from 'plyr';

export interface VideoPlayerProps {
  hlsConfig?: Record<string, any>;
  playerRef?: (ref: Record<string, any>) => void;
  src: string;
  options?: Record<string, any>;
  poster?: string;
  style?: CSSProperties;
}

export const VideoPlayer = (props: VideoPlayerProps) => {
  const { hlsConfig = {}, playerRef, src, options = {}, poster, style } = props;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleHLS = () => {
    let hls: Hls;

    const _initPlayer = () => {
      if (hls != null) {
        hls.destroy();
      }

      const newHls = new Hls({
        enableWorker: false,
        ...hlsConfig,
      });

      if (videoRef.current != null) {
        newHls.attachMedia(videoRef.current);
      }

      newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
        newHls.loadSource(src);

        newHls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (options.autoplay) {
            videoRef?.current
              ?.play()
              .catch(() =>
                console.log(
                  'Unable to autoplay prior to user interaction with the dom.'
                )
              );
          }
        });
      });

      newHls.on(Hls.Events.ERROR, function (_, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              newHls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              newHls.recoverMediaError();
              break;
            default:
              _initPlayer();
              break;
          }
        }
      });

      hls = newHls;
    };

    // Check for Media Source support
    if (Hls.isSupported()) {
      _initPlayer();
    }

    return () => {
      if (hls != null) {
        hls.destroy();
      }
    };
  };

  const initializePlyr = () => {
    if (videoRef.current) {
      const player = new Plyr(videoRef.current, options);
      if (playerRef) {
        // //console.log(playerRef);
        playerRef(player);
      }
    }
  };

  const getMIMEType = () => {
    const splitSRC = src.split('.');
    return splitSRC[splitSRC.length - 1];
  };

  const detectHLS = () => {
    const mimeType = getMIMEType();
    return mimeType === 'm3u8';
  };

  const isHLS = detectHLS();

  useEffect(() => {
    if (isHLS) {
      const destroy = handleHLS();
      return () => destroy();
    }
  }, [hlsConfig, src]);

  useEffect(() => {
    initializePlyr();
  }, [videoRef]);

  if (isHLS) {
    // If Media Source is supported, use HLS.js to play video
    if (Hls.isSupported()) {
      return (
        <video
          ref={videoRef}
          data-testid={'video-player'}
          src={src}
          controls
          poster={poster}
        />
      );
    }

    // Fallback to using a regular video player if HLS is supported by default in the user's browser
    return (
      <video
        ref={videoRef}
        data-testid={'video-player'}
        src={src}
        poster={poster}
        style={style}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      data-testid={'video-player'}
      src={src}
      poster={poster}
      style={style}
    />
  );
};
