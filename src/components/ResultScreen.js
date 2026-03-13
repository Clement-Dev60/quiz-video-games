export default function ResultScreen({ score, total, onReplay }) {
    const pourcentage = (score / total) * 100
    function getMessage() {
        if (pourcentage === 100) return "Tout simplement le meilleur ! 🏆";
        if (pourcentage >= 80) return "Excellent ! 🏆";
        if (pourcentage >= 50) return "Pas mal ! 💪";
        return "Peut mieux faire... 😅";
    }

    return (
        <div className="w-full max-w-md text-center">
            <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-sm">

                <div className="w-24 h-24 rounded-full border-4 border-black flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-medium">{score}/{total}</span>
                </div>

                <h2 className="text-2xl font-medium mb-2">{getMessage()}</h2>
                <p className="text-gray-400 mb-8">
                    Tu as répondu correctement à {score} questions sur {total}
                </p>

                <div className="flex gap-4 mb-8">
                    <div className="flex-1 bg-green-50 rounded-xl p-4">
                        <div className="text-2xl font-medium text-green-700">{score}</div>
                        <div className="text-sm text-green-600">correctes</div>
                    </div>
                    <div className="flex-1 bg-red-50 rounded-xl p-4">
                        <div className="text-2xl font-medium text-red-700">{total - score}</div>
                        <div className="text-sm text-red-600">incorrectes</div>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-xl p-4">
                        <div className="text-2xl font-medium text-gray-700">{Math.round(pourcentage)}%</div>
                        <div className="text-sm text-gray-500">score</div>
                    </div>
                </div>

                <button
                    onClick={onReplay}
                    className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                >
                    Rejouer
                </button>
            </div>
        </div>
    );
}