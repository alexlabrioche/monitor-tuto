import { useRef, useEffect, useState } from "react";

import { HashRouter, Route } from "react-router-dom";

import "./App.css";

const steps = {
  1: { loopStart: 0, loopEnd: 0 },
  2: { loopStart: 4, loopEnd: 5 },
  3: { loopStart: 5, loopEnd: 5.5 },
  4: { loopStart: 6, loopEnd: 6.5 },
  5: { loopStart: 8, loopEnd: 9 },
};

function App() {
  const [step, setStep] = useState(1);
  const [canTriggerNextStep, setCanTriggerNextStep] = useState(true);
  console.log({ step });
  const currentStep = steps[step];
  const videoRef = useRef();

  const triggerVideo = ({ forward }) => {
    const { loopStart } = currentStep;
    const video = videoRef.current;
    video.currentTime = loopStart;
    video.play();

    const newStep = forward ? step + 1 : step - 1;
    setStep(newStep);
    setCanTriggerNextStep(false);
  };

  useEffect(() => {
    const video = videoRef.current;

    const handleLoopPlayback = () => {
      const { loopStart, loopEnd } = currentStep;
      console.log({ loopStart, loopEnd });
      if (video.currentTime >= loopEnd) {
        video.currentTime = loopStart;
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
            className="video"
            ref={videoRef}
            src={`${process.env.PUBLIC_URL}/videos/full_vid.mp4`}
            type="video/mp4"
          />
          <div style={{ display: "flex" }}>
            <button
              onClick={() => triggerVideo({ forward: false })}
              style={{ visibility: canTriggerNextStep ? "visible" : "hidden" }}
            >
              Précédent
            </button>
            <button
              onClick={() => triggerVideo({ forward: true })}
              style={{ visibility: canTriggerNextStep ? "visible" : "hidden" }}
            >
              {step === 1 ? "Démarrer" : "Continuer"}
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
