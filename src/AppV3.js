import { useRef, useEffect, useState } from "react";

import "./App.css";

const content = {
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
  const [step, setStep] = useState(1);
  console.log({ step });
  const [canTriggerNextStep, setCanTriggerNextStep] = useState(true);
  const [canTriggerPrevStep, setCanTriggerPrevStep] = useState(false);
  const videoRef = useRef();

  const next = () => {
    setCanTriggerPrevStep(false);
    setCanTriggerNextStep(false);
    const video = videoRef.current;
    video.play();
    video.addEventListener("timeupdate", function listener() {
      if (video.currentTime >= video.duration - 0.5) {
        const nextStep = step + 1;
        setStep(nextStep);
        setCanTriggerPrevStep(nextStep > 1);
        console.log({ nextStep, cc: Object.keys(content).length });
        setCanTriggerNextStep(nextStep < Object.keys(content).length);
        video.removeEventListener("timeupdate", listener);
      }
    });
  };

  const prev = () => {
    setCanTriggerPrevStep(false);
    setCanTriggerNextStep(false);
    const video = videoRef.current;
    video.play();
    video.addEventListener("timeupdate", function listener() {
      if (video.currentTime >= video.duration - 0.5) {
        const prevStep = step - 1;
        setStep(prevStep);
        setCanTriggerPrevStep(prevStep > 1);
        setCanTriggerNextStep(prevStep < Object.keys(content).length);
        video.removeEventListener("timeupdate", listener);
      }
    });
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [step, videoRef]);

  return (
    <div className="app">
      <video
        className="video"
        loop
        ref={videoRef}
        src={`${process.env.PUBLIC_URL}/videos/Onboarding_Ecran_0${step}.mp4`}
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
      <h3>{content[step].title}</h3>
      <p>{content[step].desc}</p>
    </div>
  );
}

export default App;
