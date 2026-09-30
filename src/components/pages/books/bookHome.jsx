import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowRight, 
  faStar, 
  faChevronRight,
  faBook,
  faChild,
  faRocket,
  faBrain,
  faMask
} from "@fortawesome/free-solid-svg-icons";

const BookHome = () => {
  // --- Mock Data ---
  const heroBooks = [
    { id: 1, title: "Atomic Habits", author: "James Clear", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=600" },
    { id: 2, title: "Ikigai", author: "Héctor García", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=600" },
    { id: 3, title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400&h=600" },
  ];

  const authors = [
    { id: 1, name: "James clear", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 2, name: "Napoleon Hill", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 3, name: "Robert Kiyosaki", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 4, name: "Brian Tracy", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100&h=100" },
  ];

  const recommendedBooks = [
    { 
      id: 1, 
      title: "Emotional Intelligence", 
      author: "Daniel Goleman", 
      price: 32, 
      rating: 4.9, 
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300&h=450",
      tag: "BESTSELLER",
      tagColor: "bg-slate-800 text-white"
    },
    { 
      id: 2, 
      title: "How to Talk to Anyone", 
      author: "Leil Lowndes", 
      price: 32, 
      rating: 4.9, 
      image: "https://images.unsplash.com/photo-1555448248-2571daf6344b?auto=format&fit=crop&q=80&w=300&h=450",
      tag: "DEAL",
      tagColor: "bg-yellow-400 text-black"
    },
    { 
      id: 3, 
      title: "Who Moved My Cheese?", 
      author: "Spencer Johnson", 
      price: 32, 
      rating: 4.9, 
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300&h=450",
      tag: "CLASSIC",
      tagColor: "bg-red-600 text-white"
    },
    { 
      id: 4, 
      title: "The Psychology of Money", 
      author: "Morgan Housel", 
      price: 32, 
      rating: 4.9, 
      image: "https://images.unsplash.com/photo-1599590984813-6039b9b3b3b3?auto=format&fit=crop&q=80&w=300&h=450",
      tag: "NEW",
      tagColor: "bg-teal-600 text-white"
    },
  ];

  // New Category Data matching the image structure
  const categories = [
    { id: 1, name: "History", icon: faBook },
    { id: 2, name: "Children's corner", icon: faChild },
    { id: 3, name: "Science fiction", icon: faRocket },
    { id: 4, name: "Self improvement", icon: faBrain },
    { id: 5, name: "Comics", icon: faMask },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-800 selection:bg-amber-200">
      
      {/* --- Hero Section --- */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <h1 className="text-6xl md:text-7xl font-serif text-slate-900 leading-[1.1] mb-6">
              Find Your <br /> Next Book
            </h1>
            <p className="text-slate-500 text-lg mb-8 max-w-md leading-relaxed">
              Discover a world where every page brings a new adventure. At Paper Haven, we curate a diverse collection of books.
            </p>
            <button className="bg-[#C48B45] hover:bg-[#A8763A] text-white font-medium px-8 py-3.5 rounded-md flex items-center gap-3 transition-colors shadow-sm">
              Explore now
              <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
            </button>
          </div>

          {/* Right Content - Book Showcase */}
          <div className="relative flex justify-center items-end h-[400px]">
            {/* Background Arch */}
            <div className="absolute inset-0 bg-[#F3EDE4] rounded-t-full w-full max-w-[500px] mx-auto h-[350px]"></div>
            
            {/* Books */}
            <div className="relative flex items-end gap-6 z-10 px-4">
              {heroBooks.map((book, index) => (
                <div 
                  key={book.id} 
                  className={`flex flex-col items-center transition-transform hover:-translate-y-2 duration-300
                    ${index === 1 ? 'mb-12 scale-110 z-20' : 'mb-0 scale-100 opacity-80'}
                  `}
                >
                  <div className="w-32 h-48 bg-white rounded shadow-xl overflow-hidden border border-slate-100">
                    <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-4 text-center font-medium uppercase tracking-wider">{book.title}</p>
                  <p className="text-[10px] text-slate-500 text-center">{book.author}</p>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-0 flex gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C48B45]"></span>
              <span className="w-2 h-2 rounded-full bg-slate-300"></span>
              <span className="w-2 h-2 rounded-full bg-slate-300"></span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Authors Strip --- */}
      <div className="border-t border-b border-slate-200 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap justify-between items-center gap-4">
          {authors.map((author) => (
            <div key={author.id} className="flex items-center gap-3 cursor-pointer group">
              <img 
                src={author.image} 
                alt={author.name} 
                className="w-8 h-8 rounded-full object-cover border border-slate-200 group-hover:border-[#C48B45] transition-colors" 
              />
              <span className="text-sm text-slate-600 group-hover:text-[#C48B45] transition-colors font-medium">
                Latest form {author.name}
              </span>
              <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-slate-400 group-hover:text-[#C48B45] transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* --- Recommended For You Section --- */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-serif text-slate-900">Recommended For You</h2>
          <a href="#" className="text-sm font-medium text-[#C48B45] hover:underline flex items-center gap-1">
            See all <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {recommendedBooks.map((book) => (
            // CARD CONTAINER
            <div key={book.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col group hover:shadow-md transition-shadow">
              
              {/* Book Cover with Tag */}
              <div className="relative w-full aspect-[2/3] bg-slate-50 rounded-md overflow-hidden mb-5">
                <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                
                {/* Tag (like the red/yellow tags in your screenshot) */}
                {book.tag && (
                  <div className={`absolute top-3 left-3 px-2 py-1 text-[10px] font-bold tracking-wider rounded-sm ${book.tagColor}`}>
                    {book.tag}
                  </div>
                )}
                
                {/* Simulated Book Spine Shadow */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/5"></div>
              </div>

              {/* Book Info */}
              <div className="flex flex-col flex-grow">
                <h3 className="font-bold text-slate-900 text-base mb-1 leading-snug line-clamp-2">{book.title}</h3>
                <p className="text-xs text-slate-500 mb-3">By: {book.author}</p>
                
                {/* Rating & Price */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center text-[#C48B45] text-xs font-bold">
                    <FontAwesomeIcon icon={faStar} className="mr-1 text-[10px]" />
                    {book.rating}
                  </div>
                  <span className="text-sm font-extrabold text-slate-900">${book.price}</span>
                </div>

                {/* Action Button */}
                <button className="mt-auto w-full py-2.5 border border-slate-300 rounded-md text-xs font-bold text-slate-700 hover:bg-[#C48B45] hover:text-white hover:border-[#C48B45] transition-colors">
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Category Section (Added back, styled like the image) --- */}
      <div className="max-w-7xl mx-auto px-6 pb-24 border-t border-slate-200 pt-12">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-serif text-slate-900">Category</h2>
          <a href="#" className="text-sm font-medium text-[#C48B45] hover:underline flex items-center gap-1">
            See all <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
          </a>
        </div>

        {/* Horizontal row of category items */}
        <div className="flex flex-wrap gap-8 md:gap-12">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-3 cursor-pointer group">
              {/* Icon Box */}
              <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 group-hover:border-[#C48B45] group-hover:text-[#C48B45] transition-colors">
                <FontAwesomeIcon icon={cat.icon} className="text-lg" />
              </div>
              {/* Text */}
              <span className="text-sm font-medium text-slate-600 group-hover:text-[#C48B45] transition-colors">
                {cat.name}
              </span>
              {/* Chevron */}
              <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-slate-400 group-hover:text-[#C48B45] transition-colors" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BookHome;