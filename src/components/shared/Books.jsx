import { useState } from "react";

import book from "../../assets/image/book.jpg";
import book1 from "../../assets/image/book.jpeg";
import book2 from "../../assets/image/book1.jpeg";
import book3 from "../../assets/image/book2.webp";
import book4 from "../../assets/image/book3.png";
import book5 from "../../assets/image/book5.png";

const bookData = [
  {
    id: 1,
    name: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genre: "Classic Fiction",
    rating: 4.5,
    description:
      "A story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    image: book,
  },
  {
    id: 2,
    name: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    genre: "Southern Gothic",
    rating: 4.8,
    description:
      "The story of racial injustice and the loss of innocence in the Deep South.",
    image: book1,
  },
  {
    id: 3,
    name: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "Dystopian Fiction",
    rating: 4.7,
    description:
      "A dystopian novel about totalitarianism and surveillance in a future society.",
    image: book2,
  },
  {
    id: 4,
    name: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Romantic Fiction",
    rating: 4.6,
    description:
      "The story of Elizabeth Bennet as she navigates issues of manners, upbringing, and marriage.",
    image: book3,
  },
  {
    id: 5,
    name: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
    genre: "Coming-of-age Fiction",
    rating: 4.3,
    description:
      "The story of Holden Caulfield and his experiences in New York City after being expelled from prep school.",
    image: book4,
  },
  {
    id: 6,
    name: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    genre: "Fantasy",
    rating: 4.9,
    description:
      "A fantasy novel about Bilbo Baggins as he journeys to reclaim the treasure of the Lonely Mountain.",
    image: book5,
  },
  {
    id: 7,
    name: "The Alchemist",
    author: "Paulo Coelho",
    year: 1988,
    genre: "Philosophical Fiction",
    rating: 4.4,
    description:
      "A philosophical novel about a young Andalusian shepherd named Santiago who dreams of finding treasure in the Egyptian pyramids.",
    image: book,
  },
  {
    id: 8,
    name: "The Shining",
    author: "Stephen King",
    year: 1977,
    genre: "Horror",
    rating: 4.3,
    description:
      "A horror novel about Jack Torrance, his wife Wendy, and their son Danny, who become caretakers of the isolated Overlook Hotel.",
    image: book1,
  },
  {
    id: 9,
    name: "Dune",
    author: "Frank Herbert",
    year: 1965,
    genre: "Science Fiction",
    rating: 4.8,
    description:
      "A science fiction novel set on the desert planet Arrakis, exploring themes of politics, religion, and ecology.",
    image: book2,
  },
  {
    id: 10,
    name: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    year: 1954,
    genre: "Fantasy",
    rating: 4.9,
    description:
      "An epic fantasy novel about the quest to destroy the One Ring and defeat the dark lord Sauron.",
    image: book3,
  },
  {
    id: 11,
    name: "The Da Vinci Code",
    author: "Dan Brown",
    year: 2003,
    genre: "Mystery Thriller",
    rating: 4.2,
    description:
      "A mystery thriller novel about a symbologist who uncovers a conspiracy involving the Holy Grail and the Catholic Church.",
    image: book4,
  },
  {
    id: 12,
    name: "The Hunger Games",
    author: "Suzanne Collins",
    year: 2008,
    genre: "Dystopian Fiction",
    rating: 4.7,
    description:
      "A dystopian novel about a girl who volunteers to participate in a deadly competition in a post-apocalyptic nation.",
    image: book5,
  },
  {
    id: 13,
    name: "The Chronicles of Narnia",
    author: "C.S. Lewis",
    year: 1950,
    genre: "Fantasy",
    rating: 4.6,
    description:
      "A series of fantasy novels set in the magical world of Narnia, exploring themes of good versus evil.",
    image: book,
  },
  {
    id: 14,
    name: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    year: 2005,
    genre: "Crime Thriller",
    rating: 4.4,
    description:
      "A crime thriller novel about a journalist and a hacker who investigate a wealthy family's dark secrets.",
    image: book1,
  },
  {
    id: 15,
    name: "The Kite Runner",
    author: "Khaled Hosseini",
    year: 2003,
    genre: "Historical Fiction",
    rating: 4.7,
    description:
      "A historical fiction novel about friendship, betrayal, and redemption set in Afghanistan.",
    image: book2,
  },
  {
    id: 16,
    name: "The Book Thief",
    author: "Markus Zusak",
    year: 2005,
    genre: "Historical Fiction",
    rating: 4.8,
    description:
      "A historical fiction novel narrated by Death, set in Nazi Germany, about a young girl who steals books.",
    image: book3,
  },
  {
    id: 17,
    name: "The Road",
    author: "Cormac McCarthy",
    year: 2006,
    genre: "Post-Apocalyptic",
    rating: 4.3,
    description:
      "A post-apocalyptic novel about a father and son's journey through a desolate landscape after an unspecified catastrophe.",
    image: book4,
  },
  {
    id: 18,
    name: "The Help",
    author: "Kathryn Stockett",
    year: 2009,
    genre: "Historical Fiction",
    rating: 4.6,
    description:
      "A historical fiction novel about African American maids working in white households in Jackson, Mississippi during the 1960s.",
    image: book5,
  },
];

function BookCard({ book }) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div
      className="
        group relative w-[180px] 
        rounded-2xl border border-white/5 
        bg-gradient-to-b from-white/5 to-white/[0.02]
        backdrop-blur-sm
        shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        transition-all duration-300 
        hover:-translate-y-2 hover:border-white/20 
        hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)]
        overflow-hidden
      "
    >
      {/* Image Container */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={book.image}
          alt={book.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Rating Badge */}
        <div className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
          ⭐ {book.rating}
        </div>

        {/* Genre Badge */}
        <span className="absolute bottom-2 left-2 rounded-full bg-white/10 px-2 py-1 text-[10px] text-white backdrop-blur-md">
          {book.genre}
        </span>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-white">
          {book.name}
        </h3>
        <p className="mt-0.5 truncate text-xs text-gray-400">
          {book.author}
        </p>

        <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
          <span>{book.year}</span>
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white transition hover:bg-white/10"
          >
            {showDetail ? "Close" : "More"}
          </button>
        </div>
      </div>

      {/* Expandable Detail */}
      {showDetail && (
        <div className="border-t border-white/10 bg-black/30 p-3 animate-[fadeIn_0.2s_ease-in-out]">
          <p className="text-[11px] leading-relaxed text-gray-300">
            {book.description}
          </p>
          <div className="mt-2 flex items-center justify-between text-[10px] text-gray-500">
            <span>Published: {book.year}</span>
            <span className="font-medium text-yellow-400">★ {book.rating}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BooksCard() {
  // Split into three rows with proper data
  const row1 = bookData.slice(0, 6);
  const row2 = bookData.slice(6, 11); // Fixed: now takes books 7-12
  const row3 = bookData.slice(12, 18);

  return (
    <div className="w-full px-4 py-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Row 1 - centered */}
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {row1.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        
        {/* Row 2 - centered (removed translate-x) */}
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {row2.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        
        {/* Row 3 - centered */}
        <div className="flex justify-center gap-4 flex-wrap">
          {row3.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}