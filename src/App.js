import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HashRouter, Route } from "react-router-dom";

import "./App.css";

const steps = {
  0: { loopStart: 0, loopEnd: 0 },
  1: { loopStart: 0, loopEnd: 2000 },
  2: { loopStart: 5350, loopEnd: 6550 },
  3: { loopStart: 7700, loopEnd: 9600 },
  4: { loopStart: 15000, loopEnd: 18731 },
  5: { loopStart: 21000, loopEnd: 30000 },
  6: { loopStart: 33000, loopEnd: 39000 },
  7: { loopStart: 41200, loopEnd: 45800 },
  8: { loopStart: 47795, loopEnd: 49361 },
};

const content = {
  0: {
    title: "Lepermislibre fait peau neuve",
    desc: "La platforme lepermislibre a été entièrement revue pour répondre à vos besoins.",
  },
  1: {
    title: "Lepermislibre fait peau neuve",
    desc: "La platforme lepermislibre a été entièrement revue pour répondre à vos besoins.",
  },
  2: {
    title: "La navigation se passe en bas de la page",
    desc: "Vous y trouverez l’accès au menu ainsi que les différents raccouris.",
  },
  3: {
    title: "Le menu principal est ici !",
    desc: "Vous pourrez accéder facilement à toutes les pages de l’application.",
  },
  4: {
    title: "La page accueil",
    desc: "Un accès rapide pour voir votre prochaine leçon et les leçons en attente d’actions.",
  },
  5: {
    title: "La page planning",
    desc: "Accédez rapidement à un aperçu de votre planning soit à la journée, soit à la semaine en tournant votre téléphone.",
  },
  6: {
    title: "La page élèves",
    desc: "Retrouvez les élèves que vous avez en formation",
  },
  7: {
    title: "Vous êtes prêt !",
    desc: "Lepermislibre vous souhaite une bonne route !",
  },
  8: {
    title: "",
    desc: "",
  },
};

function App() {
  const [step, setStep] = useState(0);
  const [canTriggerNextStep, setCanTriggerNextStep] = useState(true);

  const currentStep = steps[step];
  const currentContent = content[step];
  const videoRef = useRef();

  const triggerVideo = ({ forward }) => {
    const { loopEnd } = currentStep;
    const video = videoRef.current;
    video.currentTime = loopEnd / 1000;
    video.play();

    const newStep = forward ? step + 1 : step - 1;
    setStep(newStep);
    setCanTriggerNextStep(false);
  };

  useEffect(() => {
    const video = videoRef.current;

    const handleLoopPlayback = () => {
      const { loopStart, loopEnd } = currentStep;
      if (video.currentTime * 1000 >= loopEnd) {
        video.currentTime = loopStart / 1000;
        video.play();
        setCanTriggerNextStep(true);
      }
    };

    if (currentStep) {
      video.addEventListener("timeupdate", handleLoopPlayback);
    }
    return () => {
      video.removeEventListener("timeupdate", handleLoopPlayback);
    };
  }, [currentStep]);

  return (
    <div className="app">
      {currentStep ? (
        <>
          <video
            style={{ visibility: step === 0 ? "hidden" : "visible" }}
            className="video"
            ref={videoRef}
            src={`${process.env.PUBLIC_URL}/videos/full_onboarding.mp4`}
            type="video/mp4"
          />
          <div style={{ padding: "1rem" }}>
            <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {currentContent.title}
            </motion.h3>
            <p>{currentContent.desc}</p>
          </div>
          <div style={{ display: "flex" }}>
            <button
              onClick={() => triggerVideo({ forward: false })}
              // style={{ visibility: canTriggerNextStep ? "visible" : "hidden" }}
            >
              Précédent
            </button>
            <button
              onClick={() => triggerVideo({ forward: true })}
              // style={{ visibility: canTriggerNextStep ? "visible" : "hidden" }}
            >
              {step === 0 ? "Démarrer" : "Continuer"}
            </button>
          </div>
        </>
      ) : (
        <h1>fini</h1>
      )}
    </div>
  );
}

// gh pages trick
const RouterApp = () => (
  <HashRouter basename={process.env.PUBLIC_URL}>
    <Route exact path="/" component={App} />
  </HashRouter>
);

export default App;
