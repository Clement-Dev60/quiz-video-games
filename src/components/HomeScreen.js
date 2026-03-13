export default function HomeScreen({ onStart }) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-sm">
          <div className="text-6xl mb-6">🎮</div>
          <h1 className="text-3xl font-medium mb-2">Quiz Jeux Vidéo</h1>
          <p className="text-gray-400 mb-8">10 questions pour tester tes connaissances gaming</p>
  
          <div className="flex justify-center gap-8 mb-8">
            <div>
              <div className="text-2xl font-medium">10</div>
              <div className="text-sm text-gray-400">questions</div>
            </div>
            <div>
              <div className="text-2xl font-medium">20s</div>
              <div className="text-sm text-gray-400">par question</div>
            </div>
            <div>
              <div className="text-2xl font-medium">4</div>
              <div className="text-sm text-gray-400">choix</div>
            </div>
          </div>
  
          <button
            onClick={onStart}
            className="w-full bg-black text-white py-3 rounded-xl text-lg hover:bg-gray-800 transition"
          >
            Lancer le quiz
          </button>
        </div>
      </div>
    );
  }