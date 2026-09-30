import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faStar, 
  faCartShopping, 
  faChevronRight,
  faArrowUpRightFromSquare
} from "@fortawesome/free-solid-svg-icons";

const BookstoreSections = () => {
  // --- Mock Data ---
  const recentlyAdded = [
    { id: 1, title: "House of stars", author: "Leli Lowndes", price: 35, oldPrice: 41, rating: 4.7, image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300&h=450" },
    { id: 2, title: "Charles dickens", author: "Helena kelly", price: 35, oldPrice: 41, rating: 4.7, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300&h=450" },
    { id: 3, title: "Curveball", author: "Barry zito", price: 35, oldPrice: 41, rating: 4.7, image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=300&h=450" },
    { id: 4, title: "Arory clements", author: "Leli Lowndes", price: 35, oldPrice: 41, rating: 4.7, image: "https://images.unsplash.com/photo-1555448248-2571daf6344b?auto=format&fit=crop&q=80&w=300&h=450" },
    { id: 5, title: "How to keep yo,", author: "Sarah jacquette ray", price: 35, oldPrice: 41, rating: 4.7, image: "https://images.unsplash.com/photo-1599590984813-6039b9b3b3b3?auto=format&fit=crop&q=80&w=300&h=450" },
  ];

  const bestSellers = [
    { id: 1, title: "10X rules", author: "Daniel J. Seigel", price: 35, oldPrice: 41, rating: 4.7, bgColor: "bg-[#A5D6D9]", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300&h=450" },
    { id: 2, title: "10X rules", author: "Daniel J. Seigel", price: 35, oldPrice: 41, rating: 4.7, bgColor: "bg-[#E5D38B]", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300&h=450" },
    { id: 3, title: "Rich dad,", author: "Daniel J. Seigel", price: 35, oldPrice: 41, rating: 4.7, bgColor: "bg-[#C49BC7]", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=300&h=450" },
    { id: 4, title: "Still like an", author: "Daniel J. Seigel", price: 35, oldPrice: 41, rating: 4.7, bgColor: "bg-[#3E3E3E]", image: "https://images.unsplash.com/photo-1555448248-2571daf6344b?auto=format&fit=crop&q=80&w=300&h=450" },
  ];

  return (
    <div className="bg-[#FDFBF7] font-sans text-slate-800 pb-20">
      
      {/* ==========================================
          SECTION 1: Recently Added
      ========================================== */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-serif text-slate-900">Recently added</h2>
          <a href="#" className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors">
            See all <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {recentlyAdded.map((book) => (
            <div key={book.id} className="group flex flex-col cursor-pointer">
              {/* Image Container */}
              <div className="w-full aspect-[3/4] bg-slate-200 rounded-md overflow-hidden mb-4 relative">
                <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              
              {/* Info */}
              <h3 className="font-bold text-slate-900 text-sm mb-1">{book.title}</h3>
              
              {/* Price Row */}
              <div className="flex items-center gap-2 mb-2 text-sm">
                <span className="font-bold text-slate-900">${book.price}</span>
                <span className="text-slate-400 line-through text-xs">${book.oldPrice}</span>
              </div>

              {/* Bottom Row: Author & Cart */}
              <div className="flex justify-between items-center mt-auto">
                <span className="text-[11px] text-slate-500">{book.author}</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-slate-400 text-[10px]">
                    <FontAwesomeIcon icon={faStar} className="mr-1 text-amber-500" />
                    <span className="text-slate-600 font-medium">{book.rating}</span>
                  </div>
                  <button className="text-slate-400 hover:text-[#C48B45] transition-colors">
                    <FontAwesomeIcon icon={faCartShopping} className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==========================================
          SECTION 2: Best Seller of all time
      ========================================== */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-serif text-slate-900">Best seller of all time</h2>
          <a href="#" className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors">
            See all <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((book) => (
            <div key={book.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 flex flex-col">
              
              {/* Colored Header Area with Book Image */}
              <div className={`relative ${book.bgColor} h-64 flex items-center justify-center p-6`}>
                
                {/* Top Right Arrow Icon */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-colors cursor-pointer">
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
                </div>

                {/* Book Cover */}
                <div className="w-32 h-48 rounded shadow-lg overflow-hidden relative z-10 border border-black/10">
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                </div>

                {/* Diagonal "Rent & Save" Ribbon */}
                <div className="absolute -bottom-4 -right-8 w-40 bg-[#34D399] text-white text-xs font-bold py-1.5 transform -rotate-45 text-center shadow-md z-20">
                  Rent & Save
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex flex-col flex-grow bg-white">
                <h3 className="font-bold text-slate-900 text-base mb-1">{book.title}</h3>
                <p className="text-xs text-slate-500 mb-4">By: {book.author}</p>
                
                {/* Price & Rating Row */}
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">${book.price}</span>
                      <span className="text-slate-400 line-through text-xs">${book.oldPrice}</span>
                    </div>
                    <div className="flex items-center text-slate-400 text-[10px]">
                      <FontAwesomeIcon icon={faStar} className="mr-1 text-amber-500" />
                      <span className="text-slate-600 font-medium">{book.rating}</span>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-[#C48B45] transition-colors">
                    <FontAwesomeIcon icon={faCartShopping} className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==========================================
          SECTION 3: Promotional Banners
      ========================================== */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Banner 1 */}
          <div className="bg-[#F2F0EB] rounded-xl p-6 flex items-center justify-between relative overflow-hidden group cursor-pointer border border-slate-200/50">
            <div className="z-10 relative">
              <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2">
                Flat 20% OFF<br />
                <span className="font-normal text-sm text-slate-600">for comics books!</span>
              </h3>
              <a href="#" className="text-xs font-medium text-slate-500 flex items-center gap-1 group-hover:text-slate-900 transition-colors mt-4">
                View details <FontAwesomeIcon icon={faChevronRight} className="text-[8px]" />
              </a>
            </div>
            {/* Placeholder for floating book images */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-gradient-to-l from-transparent to-[#F2F0EB] z-10"></div>
            <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=200&h=300" alt="Comics" className="absolute right-[-10px] bottom-[-20px] w-28 h-40 object-cover rounded shadow-md rotate-12 group-hover:rotate-6 transition-transform duration-300" />
          </div>

          {/* Banner 2 */}
          <div className="bg-[#F2F0EB] rounded-xl p-6 flex items-center justify-between relative overflow-hidden group cursor-pointer border border-slate-200/50">
            <div className="z-10 relative">
              <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2">
                Flat 25% OFF<br />
                <span className="font-normal text-sm text-slate-600">for science fiction books!</span>
              </h3>
              <a href="#" className="text-xs font-medium text-slate-500 flex items-center gap-1 group-hover:text-slate-900 transition-colors mt-4">
                View details <FontAwesomeIcon icon={faChevronRight} className="text-[8px]" />
              </a>
            </div>
            <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-gradient-to-l from-transparent to-[#F2F0EB] z-10"></div>
            <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200&h=300" alt="Sci-Fi" className="absolute right-[-10px] bottom-[-20px] w-28 h-40 object-cover rounded shadow-md rotate-12 group-hover:rotate-6 transition-transform duration-300" />
          </div>

          {/* Banner 3 */}
          <div className="bg-[#F2F0EB] rounded-xl p-6 flex items-center justify-between relative overflow-hidden group cursor-pointer border border-slate-200/50">
            <div className="z-10 relative">
              <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2">
                Flat 15% OFF<br />
                <span className="font-normal text-sm text-slate-600">for novels!</span>
              </h3>
              <a href="#" className="text-xs font-medium text-slate-500 flex items-center gap-1 group-hover:text-slate-900 transition-colors mt-4">
                View details <FontAwesomeIcon icon={faChevronRight} className="text-[8px]" />
              </a>
            </div>
            <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-gradient-to-l from-transparent to-[#F2F0EB] z-10"></div>
            <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=200&h=300" alt="Novels" className="absolute right-[-10px] bottom-[-20px] w-28 h-40 object-cover rounded shadow-md rotate-12 group-hover:rotate-6 transition-transform duration-300" />
          </div>

        </div>
      </div>

    </div>
  );
};

export default BookstoreSections;