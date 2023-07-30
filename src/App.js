import { useEffect, useMemo, useState } from "react";
import Calculator from "./Calculator";
import ToggleSounds from "./ToggleSounds";

// format date function
function formatTime(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

function App() {
  // set sound on/off
  const [allowSound, setAllowSound] = useState(true);
  // set workout timer
  const [time, setTime] = useState(formatTime(new Date()));

  // Will be be AM or PM
  const partOfDay = time.slice(-2);

  // list of workouts and number of excercises based on time of day
  const workouts = useMemo(() => {
    return [
      {
        name: "Full-body workout",
        numExercises: partOfDay === "AM" ? 9 : 8,
      },
      {
        name: "Arms + Legs",
        numExercises: 6,
      },
      {
        name: "Arms only",
        numExercises: 3,
      },
      {
        name: "Legs only",
        numExercises: 4,
      },
      {
        name: "Core only",
        numExercises: partOfDay === "AM" ? 5 : 4,
      },
    ];
  }, [partOfDay]);

  // set the time
  useEffect(function () {
    const id = setInterval(function () {
      setTime(formatTime(new Date()));
    }, 1000);
    console.log(id);
    return () => clearInterval(id);
  }, []);

  return (
    <main>
      <h1>Workout timer</h1>
      <time>For your workout on {time}</time>
      <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
      <Calculator workouts={workouts} allowSound={allowSound} />
    </main>
  );
}

export default App;
