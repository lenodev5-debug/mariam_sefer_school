
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTruckFast, 
  faHandHoldingDollar, 
  faHeadset, 
  faShieldHalved,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";

const BookstoreServices = () => {
  
  // --- Mock Data ---
  const features = [
    { id: 1, title: "Free shipping", subtitle: "Anywhere in Bangladesh", icon: faTruckFast },
    { id: 2, title: "Cash on delivery", subtitle: "100% cash on delivery", icon: faHandHoldingDollar },
    { id: 3, title: "24/7 online supports", subtitle: "Call & get solution anytime!", icon: faHeadset },
    { id: 4, title: "Money back guarantee", subtitle: "Within 14 days", icon: faShieldHalved },
  ];

  const popularBooks = [
    { 
      id: 1, 
      title: "The subtle art of not giving a f*ck", 
      author: "Mark Manson", 
      price: 35, 
      oldPrice: 41, 
      bgColor: "bg-[#F26A3E]", // Orange
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300&h=450"
    },
    { 
      id: 2, 
      title: "The subtle art of not giving a f*ck", 
      author: "Mark Manson", 
      price: 35, 
      oldPrice: 41, 
      bgColor: "bg-[#F4D03F]", // Yellow
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300&h=450"
    },
    { 
      id: 3, 
      title: "The subtle art of not giving a f*ck", 
      author: "Mark Manson", 
      price: 35, 
      oldPrice: 41, 
      bgColor: "bg-[#2C3E50]", // Dark Blue/Teal for Harry Potter look
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=300&h=450"
    },
    { 
      id: 4, 
      title: "The subtle art of not giving a f*ck", 
      author: "Mark Manson", 
      price: 35, 
      oldPrice: 41, 
      bgColor: "bg-[#FDFBF7]", // Off-white/Cream
      image: "https://images.unsplash.com/photo-1555448248-2571daf6344b?auto=format&fit=crop&q=80&w=300&h=450"
    },
  ];

  const testimonials = [
    { id: 1, name: "Savannah Nguyen", handle: "@SavannahNguyen", text: "This book was an absolute page-turner! I couldn't put it down and was captivated from start to finish. The plot was engaging.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 2, name: "Devon Lane", handle: "@DevonLane", text: "This book was an absolute page-turner! I couldn't put it down and was captivated from start to finish. The plot was engaging.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 3, name: "Jane Cooper", handle: "@JaneCooper", text: "This book was an absolute page-turner! I couldn't put it down and was captivated from start to finish. The plot was engaging.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 4, name: "Nathan Woods", handle: "@HeisNathan", text: "This book was an absolute page-turner! I couldn't put it down and was captivated from start to finish. The plot was engaging.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 5, name: "Ralph Edwards", handle: "@Ralphedwards", text: "This book was an absolute page-turner! I couldn't put it down and was captivated from start to finish. The plot was engaging.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" },
  ];

  return (
    <div className="bg-[#FDFBF7] font-sans text-slate-800">
      
      {/* ==========================================
          SECTION 1: Features Strip
      ========================================== */}
      <div className="border-t border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap justify-between items-center gap-6">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 shrink-0">
                <FontAwesomeIcon icon={feature.icon} className="text-slate-600 text-xl" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">{feature.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==========================================
          SECTION 2: Popular This Month
      ========================================== */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-serif text-slate-900">Popular this month</h2>
          <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors">
            See all <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularBooks.map((book) => (
            <div key={book.id} className="flex flex-col group cursor-pointer">
              
              {/* Colored Book Container */}
              <div className={`relative ${book.bgColor} rounded-2xl p-6 h-80 flex items-center justify-center shadow-sm mb-5 transition-transform duration-300 group-hover:-translate-y-2`}>
                {/* Book Cover */}
                <div className="w-36 h-52 rounded-md shadow-2xl overflow-hidden border border-black/10">
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                </div>
                
                {/* Add to Cart Button inside the card */}
                <button className="absolute bottom-5 left-6 right-6 bg-white/95 backdrop-blur-sm text-slate-800 text-xs font-bold py-3 rounded-md border border-slate-200 hover:bg-[#C48B45] hover:text-white hover:border-[#C48B45] transition-colors shadow-sm">
                  Add to cart
                </button>
              </div>

              {/* Book Info below */}
              <h3 className="font-bold text-slate-900 text-base mb-1 leading-snug line-clamp-2">{book.title}</h3>
              <p className="text-xs text-slate-500 mb-3">By: {book.author}</p>
              <div className="flex items-center gap-3 mt-auto">
                <span className="font-extrabold text-slate-900 text-lg">${book.price}</span>
                <span className="text-slate-400 line-through text-sm">${book.oldPrice}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==========================================
          SECTION 3: Our Happy Customers (FLEX-WRAP)
      ========================================== */}
      <div className="bg-[#F9F7F2] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-serif text-slate-900 text-center mb-14">Our happy customers</h2>
          
          {/* Flex-Wrap Layout instead of Horizontal Scroll */}
          <div className="flex flex-wrap justify-center gap-6">
            {testimonials.map((t) => (
              <div 
                key={t.id} 
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col transition-shadow hover:shadow-md"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-3">
                    <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                      <p className="text-xs text-slate-500">{t.handle}</p>
                    </div>
                  </div>
                  {/* X (Twitter) Icon */}
                  <div className="text-slate-300 hover:text-slate-900 cursor-pointer transition-colors">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                  </div>
                </div>
                {/* Body */}
                <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                  "{t.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default BookstoreServices;