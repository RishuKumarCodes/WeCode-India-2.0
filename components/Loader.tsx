export default function Loader() {
  return (
    <>
      {/* Enhanced Animated Loader - MUCH BIGGER */}
      <div className="relative flex items-center justify-center">
        {/* Outer rotating ring */}
        <div className="absolute w-40 h-40 border-6 border-slate-200 dark:border-slate-700 rounded-full animate-spin">
          <div className="absolute top-0 left-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform -translate-x-1/2 -translate-y-2"></div>
        </div>

        {/* Middle pulsing ring */}
        <div className="absolute w-28 h-28 border-4 border-blue-300 dark:border-blue-600 rounded-full animate-pulse opacity-60"></div>

        {/* Inner rotating dots */}
        <div className="relative w-20 h-20">
          <div
            className="absolute w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-bounce top-0 right-0"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="absolute w-5 h-5 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-bounce bottom-0 right-0"
            style={{ animationDelay: "0.4s" }}
          ></div>
          <div
            className="absolute w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-bounce bottom-0 left-0"
            style={{ animationDelay: "0.6s" }}
          ></div>
        </div>

        {/* Central glowing core */}
        <div className="absolute w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-sm animate-pulse opacity-80"></div>
        <div className="absolute w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center gap-4 text-center mt-4">
        {/* Main heading with gradient text */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent animate-pulse">
          Generating your AI-powered roadmap
        </h2>

        {/* Subtext with improved typography */}
        <p className="text-slate-600 dark:text-slate-300 text-center max-w-sm leading-relaxed font-medium">
          Please wait a few moments while we craft your personalized learning
          journey
        </p>

        {/* Animated progress indicator */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex gap-1">
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
          <span className="text-sm text-slate-500 dark:text-slate-400 font-medium ml-2">
            🚀 Almost ready
          </span>
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-8 left-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-8 right-8 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl"></div>
      </div>
    </>
  );
}
