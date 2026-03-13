import { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";

export default function App() {
  const [screen, setScreen] = useState("home"); // "home" | "quiz" | "result"
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {screen === "home" && (
        <HomeScreen onStart={() => setScreen("quiz")} />
      )}
      {screen === "quiz" && (
        <QuestionScreen
          onFinish={(finalScore, finalTotal) => {
            setScore(finalScore);
            setTotal(finalTotal);
            setScreen("result");
          }}
        />
      )}
      {screen === "result" && (
        <ResultScreen
          score={score}
          total={total}
          onReplay={() => setScreen("home")}
        />
      )}
    </div>
  );
}