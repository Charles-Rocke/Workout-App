import { memo, useCallback, useEffect, useMemo, useState } from "react";
import clickSound from "./ClickSound.m4a";

function Calculator({ workouts, allowSound }) {
  // set number of exercises
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  // set number of sets
  const [sets, setSets] = useState(3);
  // set pace
  const [speed, setSpeed] = useState(90);
  // set how long of a break
  const [durationBreak, setDurationBreak] = useState(5);

  const [duration, setDuration] = useState(0);

  // play sound helper method
  // const playSound = useCallback(
  //   function () {
  //     if (!allowSound) return;
  //     // Audio is a browser feature
  //     const sound = new Audio(clickSound);
  //     sound.play();
  //   },
  //   [allowSound]
  // );

  // use effect to keep in sync with all other state variables (usually should not do this)
  useEffect(
    function () {
      setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
    },
    [number, sets, speed, durationBreak]
  );

  // sound sync with duratio state to play sound on change of duration
  useEffect(
    function () {
      const playSound = function () {
        if (!allowSound) return;
        // Audio is a browser feature
        const sound = new Audio(clickSound);
        sound.play();
      };
      playSound();
    },
    //  add duration voluntarily to play sound on duration change
    [duration, allowSound]
  );
  // set length of workout duration timer DERIVED STATE
  // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
  // convert timer duration to minutes
  const mins = Math.floor(duration);
  // set timer seconds
  const seconds = (duration - mins) * 60;

  function handleInc() {
    setDuration((duration) => Math.floor(duration + 1));
  }

  function handleDec() {
    setDuration((duration) => (duration > 1 ? Math.ceil(duration - 1) : 0));
  }

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(e.target.value)}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDec}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={handleInc}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator);
