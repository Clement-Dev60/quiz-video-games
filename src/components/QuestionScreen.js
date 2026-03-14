import { useState, useEffect } from "react";

const FALLBACK_QUESTIONS = [
    { question: "Dans quel jeu incarne-t-on le personnage de Link ?", correct: "The Legend of Zelda", answers: ["The Legend of Zelda", "Final Fantasy", "Metroid", "Castlevania"] },
    { question: "Quel est le nom du plombier de Nintendo ?", correct: "Mario", answers: ["Mario", "Luigi", "Wario", "Toad"] },
    { question: "Dans quel jeu retrouve-t-on des Creepers ?", correct: "Minecraft", answers: ["Minecraft", "Terraria", "Roblox", "Fortnite"] },
    { question: "Quel studio a créé la saga Dark Souls ?", correct: "FromSoftware", answers: ["FromSoftware", "Bandai Namco", "Square Enix", "Capcom"] },
    { question: "Dans quel jeu joue-t-on un chasseur de primes dans l'espace ?", correct: "Metroid", answers: ["Metroid", "Halo", "Mass Effect", "Destiny"] },
    { question: "Quel est le nom de la princesse de Hyrule ?", correct: "Zelda", answers: ["Zelda", "Peach", "Samus", "Daisy"] },
    { question: "Dans quel jeu retrouve-t-on des 'Among Us' ?", correct: "Among Us", answers: ["Among Us", "Fall Guys", "Fortnite", "Rocket League"] },
    { question: "Quel personnage dit 'Itsume, ...!' ?", correct: "Mario", answers: ["Mario", "Luigi", "Wario", "Bowser"] },
    { question: "Dans quel jeu doit-on survivre sur une île avec 99 autres joueurs ?", correct: "Fortnite", answers: ["Fortnite", "PUBG", "Warzone", "Apex Legends"] },
    { question: "Quel est le nom du renard dans Star Fox ?", correct: "Fox McCloud", answers: ["Fox McCloud", "Falco", "Wolf", "Slippy"] },
];

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function decodeHTML(str) { const txt = document.createElement("textarea"); txt.innerHTML = str; return txt.value; }

export default function QuestionScreen({ onFinish }) {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(20);

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10&category=15&type=multiple")
            .then((res) => res.json())
            .then((data) => {
                if (!data.results || data.results.length === 0) {
                    setQuestions(shuffle(FALLBACK_QUESTIONS));
                } else {
                    setQuestions(data.results.map((q) => ({
                        question: decodeHTML(q.question),
                        correct: decodeHTML(q.correct_answer),
                        answers: shuffle([...q.incorrect_answers.map(decodeHTML), decodeHTML(q.correct_answer)]),
                    })));
                }
                setLoading(false);
            })
            .catch(() => { setQuestions(shuffle(FALLBACK_QUESTIONS)); setLoading(false); });
    }, []);

    // Timer
    useEffect(() => {
        if (loading || selected !== null) return;
        if (timer === 0) { handleNext(); return; }
        const t = setTimeout(() => setTimer((v) => v - 1), 1000);
        return () => clearTimeout(t);
    }, [timer, loading, selected]);

    // Reset timer à chaque nouvelle question
    useEffect(() => { setTimer(20); }, [current]);

    function handleAnswer(answer) {
        if (selected !== null) return;
        setSelected(answer);
        if (answer === questions[current].correct) setScore((s) => s + 1);
    }

    function handleNext() {
        if (current + 1 >= questions.length) {
            onFinish(score, questions.length);
        } else {
            setCurrent((c) => c + 1);
            setSelected(null);
        }
    }

    if (loading) return <div className="text-center">Chargement...</div>;

    const q = questions[current];

    return (
        <div className="w-full max-w-xl">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">

                <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Question {current + 1} / {questions.length}</span>
                    <span className={`font-medium ${timer <= 5 ? "text-red-500 timer-pulse" : "text-gray-400"}`}>
                        ⏱ {timer}s
                    </span>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-6">
                    <div
                        className="bg-black h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${((current) / questions.length) * 100}%` }}
                    />
                </div>

                <p className="text-lg font-medium mb-6">{q.question}</p>

                <div className="flex flex-col gap-3">
                    {q.answers.map((answer) => {
                        let style = "border border-gray-200 hover:bg-gray-50 text-gray-700";
                        if (selected) {
                            if (answer === q.correct) style = "border-2 border-green-400 bg-green-50 text-green-800";
                            else if (answer === selected) style = "border-2 border-red-400 bg-red-50 text-red-800";
                            else style = "border border-gray-200 text-gray-300";
                        }
                        return (
                            <button
                                key={answer}
                                onClick={() => handleAnswer(answer)}
                                className={`text-left px-4 py-3 rounded-xl transition ${style}`}
                            >
                                {answer}
                            </button>
                        );
                    })}
                </div>

                {selected && (
                    <button
                        onClick={handleNext}
                        className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                    >
                        {current + 1 >= questions.length ? "Voir les résultats 🏆" : "Question suivante →"}
                    </button>
                )}
            </div>
        </div>
    );
}