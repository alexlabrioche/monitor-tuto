import React, { useRef, useEffect, useState, useCallback } from "react";

import "./App.css";

const FPS = 30;

function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

function useTimeout(callback, delay) {
  const timeoutRef = React.useRef(null);
  const savedCallback = React.useRef(callback);
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  React.useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === "number") {
      timeoutRef.current = window.setTimeout(tick, delay);
      return () => window.clearTimeout(timeoutRef.current);
    }
  }, [delay]);
  return timeoutRef;
}

const VIDEOS = {
  1: { name: "onboarding_01_loop", loop: true },
  2: { name: "onboarding_02_thru", loop: false },
  3: { name: "onboarding_02_loop", loop: true },
  4: { name: "onboarding_03_thru", loop: false },
  5: { name: "onboarding_03_loop", loop: true },
};

const contents = {
  1: {
    title: "Lepermislibre fait peau neuve",
    desc: "La platforme lepermislibre a été entièrement revue pour répondre à vos besoins.",
  },
  2: {
    title: "Lepermislibre fait peau neuve",
    desc: "La platforme lepermislibre a été entièrement revue pour répondre à vos besoins.",
  },
  3: {
    title: "La navigation se passe en bas de la page",
    desc: "Vous y trouverez l’accès au menu ainsi que les différents raccouris.",
  },
  4: {
    title: "Le menu principal est ici !",
    desc: "Vous pourrez accéder facilement à toutes les pages de l’application.",
  },
  5: {
    title: "La page accueil",
    desc: "Un accès rapide pour voir votre prochaine leçon et les leçons en attente d’actions.",
  },
  6: {
    title: "La page planning",
    desc: "Accédez rapidement à un aperçu de votre planning soit à la journée, soit à la semaine en tournant votre téléphone.",
  },
  7: {
    title: "La page élèves",
    desc: "Retrouvez les élèves que vous avez en formation",
  },
  8: {
    title: "Vous êtes prêt !",
    desc: "Lepermislibre vous souhaite une bonne route !",
  },
};

function App() {
  const [frame, setFrame] = useState(1);

  const [video, setVideo] = useState(VIDEOS[1]);
  const [step, setStep] = useState(1);
  console.log({ step });
  const [canTriggerNextStep, setCanTriggerNextStep] = useState(true);
  const [canTriggerPrevStep, setCanTriggerPrevStep] = useState(false);
  const videoPlayerRef = useRef();

  const next = useCallback(() => {
    setCanTriggerPrevStep(false);
    setCanTriggerNextStep(false);
    const video = videoPlayerRef.current;
    video.play();
    video.addEventListener("timeupdate", function listener() {
      if (video.currentTime >= video.duration - 0.2) {
        const nextStep = step + 1;
        setVideo(VIDEOS[nextStep]);
        setStep(nextStep);
        setCanTriggerPrevStep(nextStep > 1);
        // console.log({ nextStep, cc: Object.keys(contents).length });
        setCanTriggerNextStep(nextStep < Object.keys(contents).length);
        video.removeEventListener("timeupdate", listener);
      }
    });
  }, [step]);

  // const updateFrame = () => (frame.current = frame + 1);

  useInterval(() => {
    setFrame((s) => s + 1);
  }, 1000 / FPS);

  // console.log({ test });

  const prev = useCallback(() => {
    setCanTriggerPrevStep(false);
    setCanTriggerNextStep(false);
    const video = videoPlayerRef.current;
    video.play();
    video.addEventListener("timeupdate", function listener() {
      if (video.currentTime >= video.duration - 0.5) {
        const prevStep = step - 1;
        setVideo(VIDEOS[prevStep]);
        setStep(prevStep);
        setCanTriggerPrevStep(prevStep > 1);
        setCanTriggerNextStep(prevStep < Object.keys(contents).length);
        video.removeEventListener("timeupdate", listener);
      }
    });
  }, [step]);

  // useEffect(() => {
  //   if (!video.loop) {
  //     console.log("trigger next video not loop: ", video);
  //     next();
  //   }
  // }, [video, next]);

  useEffect(() => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.play();
    }
  }, [step, videoPlayerRef]);

  return (
    <div className="app">
      <Scroll frame={frame} fps={FPS}>
        <video
          tabIndex="0"
          autobuffer="autobuffer"
          preload="preload"
          style={{ width: "100%", objectFit: "contain" }}
          playsInline
        >
          <source
            type="video/mp4"
            src={`${process.env.PUBLIC_URL}/videos/full_onboarding.mp4`}
          />
        </video>
      </Scroll>
    </div>
  );
}

function Scroll({ children, frame, fps, ...rest }) {
  const videoRef = React.createRef();
  const divWrapperRef = React.createRef();

  const [isReady, setIsReady] = useState(false);

  const attachRefToVideo = () => {
    return React.cloneElement(children, { ref: videoRef });
  };

  useEffect(() => {
    const _ref = videoRef.current;
    _ref.addEventListener("loadedmetadata", () => {
      setIsReady(true);
    });
    if (isReady) {
      const currentFrame = frame / fps;
      _ref.currentTime = currentFrame;
    }
    return () => {
      _ref.removeEventListener("loadedmetadata", () => {
        console.log(_ref);
      });
    };
  }, [videoRef, frame, isReady, fps]);

  return (
    <div ref={divWrapperRef} {...rest}>
      <div style={{ position: "fixed" }}>{attachRefToVideo()}</div>

      <div style={{ position: "fixed", zIndex: 10, color: "black" }}>
        {frame}
      </div>
    </div>
  );
}

export default App;
