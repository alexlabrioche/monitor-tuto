import { useRef, useEffect, useState, useCallback } from "react";

import "./App.css";

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

  useEffect(() => {
    if (!video.loop) {
      console.log("trigger next video not loop: ", video);
      next();
    }
  }, [video, next]);

  useEffect(() => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.play();
    }
  }, [step, videoPlayerRef]);

  return (
    <div className="app">
      <video
        autoPlay
        // autobuffer="autobuffer"
        // preload="preload"
        // playsInline
        className="video"
        loop={video.loop}
        ref={videoPlayerRef}
        src={`${process.env.PUBLIC_URL}/videos/${video.name}.mp4`}
        type="video/mp4"
      />
      <div>
        <button disabled={!canTriggerPrevStep} onClick={prev}>
          Précédent
        </button>
        <button disabled={!canTriggerNextStep} onClick={next}>
          Suivant
        </button>
      </div>
      {/* <h3>{contents[step].title}</h3>
      <p>{contents[step].desc}</p> */}
    </div>
  );
}

export default App;
