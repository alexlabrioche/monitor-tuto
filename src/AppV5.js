import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./App.css";

const contents = {
  1: {
    title: "L’acceuil regroupe les informations principales",
    desc: "Pour y accéder, cliquez sur l’icône de maison dans le bas de l’écran. Vous retrouverez un aperçu rapide sur les informations principales de votre activité des prochains jours",
  },
  2: {
    title: "Vos prochains jours",
    desc: "Les parties bleues correspondent aux leçons réservées et les parties blanches aux créneaux sans leçon",
  },
  3: {
    title: "Leçon en cours",
    desc: "La leçon en cours est affichée dans le haut de l’acceuil. Si ancune leçon n’est en cours, vous trouvrerez les informations de la prochaine leçon",
  },
  4: {
    title: "Leçon suivante",
    desc: "Vous avez accès à tout le détail de la prochaine leçon : identité de l’élève, type de leçon et lieu de rendez-vous",
  },
  5: {
    title: "Leçon en attente d’actions",
    desc: "En bas de la page, vous trouverez toutes les leçons sur lesquelles une action de votre part est attendue : les comptes-rendu non effectués, les propositions de leçons non acceptées par les élèves...",
  },
  6: {
    title: "Actions rapides",
    desc: "Le bouton + permet de proposer des leçons, d’ouvrir vos disponibiltés ou de mettre des indisponibilités ponctuelles",
  },
};

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const titleVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  const [step, setStep] = useState(1);
  const [canTriggerNextStep, setCanTriggerNextStep] = useState(true);
  const [canTriggerPrevStep, setCanTriggerPrevStep] = useState(false);
  const videoPlayerRef = useRef();
  console.log({ canTriggerPrevStep, canTriggerNextStep });

  const next = useCallback(() => {
    setCanTriggerPrevStep(false);
    setCanTriggerNextStep(false);
    const video = videoPlayerRef.current;
    const nextStep = step + 1;
    setStep(nextStep);
    video.addEventListener("timeupdate", function listener() {
      if (video.currentTime >= video.duration - 0.2) {
        setCanTriggerPrevStep(nextStep > 1);
        setCanTriggerNextStep(nextStep < Object.keys(contents).length);
        video.removeEventListener("timeupdate", listener);
      }
    });
  }, [step]);

  const prev = useCallback(() => {
    setCanTriggerPrevStep(false);
    setCanTriggerNextStep(false);
    const video = videoPlayerRef.current;
    const prevStep = step - 1;
    setStep(prevStep);
    video.addEventListener("timeupdate", function listener() {
      if (video.currentTime >= video.duration - 0.5) {
        setCanTriggerPrevStep(prevStep > 1);
        setCanTriggerNextStep(prevStep < Object.keys(contents).length);
        video.removeEventListener("timeupdate", listener);
      }
    });
  }, [step]);

  return (
    <div className="app">
      <div className="tuto-container">
        {/* <AnimatePresence key={step} exitBeforeEnter> */}
        <video
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          transition={{ duration: 2 }}
          autoPlay
          autobuffer="autobuffer"
          preload="preload"
          className="videotuto"
          ref={videoPlayerRef}
          src={`${process.env.PUBLIC_URL}/videos/Onboarding_Ecran_0${step}.mp4`}
          type="video/mp4"
        />
        {/* </AnimatePresence> */}
        <div className="video-overlay">
          <h3
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={titleVariants}
            transition={{ duration: 0.5 }}
          >
            {contents[step].title}
          </h3>
          <p
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={titleVariants}
            transition={{ duration: 0.5 }}
          >
            {contents[step].desc}
          </p>
          <div className="btn-container">
            <button
              className="button"
              disabled={!canTriggerPrevStep}
              onClick={prev}
            >
              Précédent
            </button>
            <button
              className="button"
              disabled={!canTriggerNextStep}
              onClick={next}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
