import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowRight, 
  faClock, 
  faChartLine, 
  faChevronRight, 
  faChevronLeft 
} from "@fortawesome/free-solid-svg-icons";

const NewsHome = () => {
  const featuredStories = [
    {
      id: 1,
      title: "Global Family Travels Climate Education",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400&h=500",
      tag: "Education"
    },
    {
      id: 2,
      title: "The Sustainable Future of Asia Tourism",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400&h=500",
      tag: "People"
    },
    {
      id: 3,
      title: "We All Share: Atmospheric Circulation",
      image: "https://images.unsplash.com/photo-1582967788606-a171f1080ca8?auto=format&fit=crop&q=80&w=400&h=500",
      tag: "Environment"
    },
    {
      id: 4,
      title: "Cabo Verde: The Next Hiking Destination",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=400&h=500",
      tag: "Destination"
    },
    {
      id: 5,
      title: "LifeStraw's New Go Series Water Filter Bottles",
      image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=400&h=500",
      tag: "Adventure Hack"
    }
  ];

  const trendingStories = [
    { id: 1, title: "These Brides Are Trying to Kill Us", time: "2 days ago", read: "6 mins read" },
    { id: 2, title: "A Lost Hiker Used an Online Bear Camera to Call for Rescue", time: "12 hours ago", read: "3 mins read" },
    { id: 3, title: "Tourists Chasing a Bear is the Dumbest Yellowstone Video Yet", time: "1 day ago", read: "5 mins read" },
    { id: 4, title: "Let's All Agree to Stop Stealing Hawaii's Lava Rocks", time: "1 hour ago", read: "5 mins read" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* --- Hero Section --- */}
      <div className="relative w-full h-[600px] lg:h-[700px]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=2000')" }}
        >
          {/* Dark Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-32">
          
          {/* Tags */}
          <div className="flex space-x-3 mb-6">
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white"></span> Editor Choice
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-4 py-1.5 rounded-full">
              Adventure Event
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8 max-w-3xl">
            Announcing AdventureWeek at Okinawa
          </h1>

          {/* Meta Info */}
          <div className="flex items-center space-x-6 text-white/90 text-sm font-medium">
            <button className="flex items-center gap-2 hover:text-white transition-colors">
              <div className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center">
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </div>
              Read Story
            </button>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
              5 mins read
            </div>
          </div>
        </div>

        {/* Bottom Feature Strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md border-t border-white/10 hidden md:block">
          <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center text-white text-sm font-medium">
            
            <div className="flex items-center gap-4 max-w-[280px]">
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center shrink-0">2</div>
              <p className="leading-tight">Protecting Animals and Nature in Adventure Travel</p>
            </div>

            <div className="flex items-center gap-4 max-w-[280px]">
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center shrink-0">3</div>
              <p className="leading-tight">Guides are the Storytellers of Destinations</p>
            </div>

            <div className="flex items-center gap-4 max-w-[280px]">
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center shrink-0">4</div>
              <p className="leading-tight">Together to Promote Sustainable Development</p>
            </div>

            <div className="flex items-center gap-4 max-w-[280px]">
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center shrink-0">5</div>
              <p className="leading-tight">Empowers Adventure Operators in Kyrgyzstan</p>
            </div>

          </div>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Featured Stories */}
        <div className="mb-20">
          <div className="flex justify-between items-end mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-teal-700 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-900">Featured Stories</h2>
            </div>
            
            {/* Carousel Controls */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex gap-1.5 mr-4">
                <span className="w-2 h-2 rounded-full bg-teal-700"></span>
                <span className="w-2 h-2 rounded-full bg-slate-200"></span>
                <span className="w-2 h-2 rounded-full bg-slate-200"></span>
                <span className="w-2 h-2 rounded-full bg-slate-200"></span>
              </div>
              <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                <FontAwesomeIcon icon={faChevronLeft} className="text-slate-400 text-sm" />
              </button>
              <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                <FontAwesomeIcon icon={faChevronRight} className="text-slate-800 text-sm" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredStories.map((story) => (
              <div key={story.id} className="group cursor-pointer relative rounded-2xl overflow-hidden h-[320px]">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Tag */}
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full">
                  {story.tag}
                </div>

                {/* Title */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold leading-tight group-hover:underline decoration-2 underline-offset-4">
                    {story.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lower Section: Latest & Trending */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left Column: The Latest */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 bg-teal-700 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-900">The Latest</h2>
            </div>

            <div className="flex flex-col gap-10">
              
              {/* Article 1 */}
              <article className="flex flex-col sm:flex-row gap-6 group cursor-pointer">
                <div className="sm:w-2/5 shrink-0 overflow-hidden rounded-2xl h-56 sm:h-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1504280506542-7f1e7a5a4a94?auto=format&fit=crop&q=80&w=600" 
                    alt="Lake District" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors">
                    How to enjoy an outdoor adventure – in the Lake District and beyond
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-3">
                    With festivals, clubs and courses galore it's a great time to try your hand at: an open-air activity or sport – from rock climbing to canoeing or torchlighting.
                  </p>
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                    <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full">Adventure Hack</span>
                    <span className="flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faClock} /> 13 mins ago
                    </span>
                    <span className="flex items-center gap-1.5">• 3 mins read</span>
                  </div>
                </div>
              </article>

              {/* Divider */}
              <hr className="border-slate-100" />

              {/* Article 2 */}
              <article className="flex flex-col sm:flex-row gap-6 group cursor-pointer">
                <div className="sm:w-2/5 shrink-0 overflow-hidden rounded-2xl h-56 sm:h-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=600" 
                    alt="Appalachian Trail" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors">
                    Inside 75-Year-Old Will French's Globe-Trotting Adventure on the International Appalachian Trail
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-3">
                    For most AT thru-hikers, Katahdin is the finish line. For Will French, it was the halfway point on a 25-year, 4,320-mile journey along the prehistoric spine of the Appalachians.
                  </p>
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                    <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full">Hiking</span>
                    <span className="flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faClock} /> 41 mins ago
                    </span>
                    <span className="flex items-center gap-1.5">• 5 mins read</span>
                  </div>
                </div>
              </article>

            </div>
          </div>

          {/* Right Column: On Trending */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl font-bold text-teal-700">On Trending</h2>
              <FontAwesomeIcon icon={faChartLine} className="text-teal-600 text-xl" />
            </div>

            <div className="flex flex-col gap-6">
              {trendingStories.map((story, index) => (
                <div key={story.id} className="group cursor-pointer flex gap-4">
                  <div className="text-3xl font-extrabold text-slate-200 group-hover:text-teal-100 transition-colors">
                    #{index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2 leading-snug group-hover:text-teal-700 transition-colors">
                      "{story.title}"
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                      <span>{story.time}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span>{story.read}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NewsHome;