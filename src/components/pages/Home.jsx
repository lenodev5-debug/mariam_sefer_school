import BooksCard from "../shared/Books"
import Card from "../ui/spaceCard"

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Hero section with card */}
      <div className="relative h-[70vh]">
        <Card />
        
        {/* Overlay content */}
        <div className="absolute inset-0 top-32 flex flex-col items-center justify-center z-100 px-4">
          {/* Main heading */}
          <div className="text-center mt-8">
            <h1 className="text-5xl md:text-8xl font-bold text-white">
              Building the Future
            </h1>
            <h1 className="text-4xl md:text-7xl font-black text-white">
              Academic Excellence
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-gray-300 text-center max-w-2xl text-sm md:text-base mb-8">
            Empowering the next generation with modern, accessible, 
          </p>
          <p className="text-gray-300 text-center max-w-2xl text-sm md:text-base mb-8">
          and collaborative learning tools
          </p>

          {/* Search bar */}
          <div className="relative w-1/3 max-w-xl">
            <div className="relative">
              <svg 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
              
              <input 
                type="search" 
                placeholder="Search courses, topics, or resources..."
                className="
                  w-full
                  h-18
                  pl-12 
                  pr-24
                  rounded-2xl
                  bg-white/90
                  backdrop-blur-xl
                  border
                  border-white/20
                  text-gray-900
                  placeholder-gray-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500/50
                  focus:border-transparent
                  transition-all
                  duration-300
                  shadow-lg
                  shadow-black/20
                " 
              />
              
              <button
                className="
                  absolute 
                  right-1.5 
                  top-1/2 
                  -translate-y-1/2
                  px-6
                  py-5
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-500
                  to-purple-600
                  text-white
                  font-medium
                  text-sm
                  hover:shadow-lg
                  hover:shadow-blue-500/30
                  transition-all
                  duration-300
                  hover:scale-105
                "
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Books section with proper spacing */}
      <div className="relative z-20 bg-[#090a0f] -mt-20">
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-8 text-center">
          </div>
          <BooksCard />
        </div>
      </div>
    </div>
  )
}