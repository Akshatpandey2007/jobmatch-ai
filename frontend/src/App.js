function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold text-blue-600 mb-2">
          JobMatch AI
        </h1>
        <p className="text-gray-500 mb-6">
          AI-powered job matching platform
        </p>
        <div className="bg-blue-50 rounded-xl p-4 mb-4">
          <p className="text-blue-700 text-sm font-medium">
            ✓ React is working
          </p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-green-700 text-sm font-medium">
            ✓ Tailwind CSS is working
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;