import { faBookOpen, faChevronRight, faClock, faFileText } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BookLoader from "../../../ui/readpage";

const books = [
  {
    title: "Mothers: Stories",
    author: "Chris Power",
    reviews: 87,
    ratings: 449,
    rating: 3.62,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "Life Support",
    author: "Julia Copus",
    reviews: 15,
    ratings: 115,
    rating: 3.27,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "The Kites",
    author: "Romain Gary",
    reviews: 232,
    ratings: 2491,
    rating: 4.28,
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "Mothers: Storie",
    author: "Chris Power",
    reviews: 87,
    ratings: 449,
    rating: 3.62,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80",
  },
];

const readingBooks = [
  {
    title: "The Little Prince",
    progress: 64,
  },
  {
    title: "Fahrenheit 451",
    progress: 87,
  },
  {
    title: "Gone with the Wind",
    progress: 13,
  },
];

const days = [
  { height: "65%" },
  { height: "82%" },
  { height: "72%" },
  { height: "92%" },
  { height: "55%" },
  { height: "84%" },
  { height: "61%" },
];

function Rating({ value }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex text-orange-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-sm">
            ★
          </span>
        ))}
      </div>

      <span className="ml-1 text-xs text-gray-500">{value}</span>
    </div>
  );
}

function BookCard({ book }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-[#1B1A1A] p-2 shadow-sm">
      {/* Book cover */}
      <img
        src={book.image}
        alt={book.title}
        className="h-22 w-24.5 rounded-xl object-cover"
      />

      {/* Information */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[15px] font-semibold text-gray-800">
          {book.title}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          by {book.author}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
          <span>{book.reviews} reviews</span>

          <span className="text-gray-300">•</span>

          <span>{book.ratings} ratings</span>

          <Rating value={book.rating} />
        </div>
      </div>

      <button className="mr-2 flex h-8 w-8 items-center justify-center rounded-full text-[#55b6b6] transition hover:bg-[#eefafa]">
        <FontAwesomeIcon icon={faChevronRight} size={20}/>
      </button>
    </div>
  );
}

function PremiumCard() {
  return (
    <div className="relative flex min-h-[285px] flex-col overflow-hidden rounded-2xl bg-[#1B1A1A] p-5 shadow-sm">
      <h2 className="max-w-[180px] text-[17px] font-semibold leading-7 text-gray-800">
        Get Premium free for
        <br />
        1 month!
      </h2>

      <p className="mt-2 max-w-[210px] text-xs leading-5 text-gray-500">
        You'll get free access to all 700+ books
        <br />
        from our collection.
      </p>

      {/* Simple illustration placeholder */}
       <BookLoader />

      <button className="absolute bottom-4 left-5 right-5 rounded-xl bg-[#55b6b6] py-3 text-sm font-medium text-white transition hover:bg-[#43a6a6]">
        Get Premium
      </button>
    </div>
  );
}

function KeepReading() {
  return (
    <div className="rounded-2xl bg-[#1B1A1A] p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-gray-800">
          Keep Reading
        </h2>

        <button className="text-xs font-medium text-[#55b6b6] hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-5">
        {readingBooks.map((book) => (
          <div key={book.title}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <span className="truncate text-xs font-medium text-gray-700">
                {book.title}
              </span>

              <span className="text-xs font-medium text-gray-500">
                {book.progress}%
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Progress */}
              <div className="h-[4px] flex-1 overflow-hidden rounded-full bg-[#f1d8cf]">
                <div
                  className="h-full rounded-full bg-[#ed7950]"
                  style={{ width: `${book.progress}%` }}
                />
              </div>

              <button className="w-[98px] rounded-lg bg-[#55b6b6] py-2 text-xs font-medium text-white transition hover:bg-[#43a6a6]">
                Read
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AverageTime() {
  return (
    <div className="rounded-2xl bg-[#0E0E0E] p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[16px] font-semibold text-gray-800">
            Average time
          </h2>

          <p className="mt-7 text-xs text-gray-500">
            Per Day
          </p>

          <div className="mt-1 flex items-center gap-2">
            <FontAwesomeIcon icon={faClock} className="text-gray-400" size={18} />

            <span className="text-xl font-semibold text-gray-800">
              2 hours
            </span>
          </div>
        </div>

        {/* Weekly chart */}
        <div className="flex h-[100px] items-end gap-4">
          {days.map((day, index) => (
            <div
              key={index}
              className="relative h-[95px] w-[10px] overflow-hidden rounded-full bg-[#f8d8cc]"
            >
              <div
                className="absolute bottom-0 w-full rounded-full bg-[#ed7950]"
                style={{ height: day.height }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-9 grid grid-cols-2 gap-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff4ef]">
            <FontAwesomeIcon
              icon={faBookOpen}
              size={25}
              className="text-[#ed7950]"
            />
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Read Books
            </p>

            <p className="mt-1 text-xl font-semibold text-gray-800">
              35
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff4ef]">
            <FontAwesomeIcon
              icon={faFileText}
              size={25}
              className="text-[#ed7950]"
            />
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Book Pages
            </p>

            <p className="mt-1 text-xl font-semibold text-gray-800">
              7653
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReadingDashboard() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f6f5] p-5 md:p-7 dark:bg-[#0E0E0E]">
      {/* Ambient background layers */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(60%_50%_at_15%_0%,#e8f5f5_0%,transparent_60%),radial-gradient(50%_45%_at_100%_10%,#fdeee4_0%,transparent_60%)] dark:bg-[radial-gradient(60%_50%_at_15%_0%,#0f2424_0%,transparent_60%),radial-gradient(50%_45%_at_100%_10%,#2a1710_0%,transparent_60%)]"
      />

      <div className="relative mx-auto max-w-[1200px]">
        {/* =========================
            TOP SECTION
        ========================== */}
        <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
          {/* Books */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-[17px] font-semibold text-gray-800">
                Books for You
              </h1>

              <button className="text-xs font-medium text-[#55b6b6] hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-2">
              {books.map((book) => (
                <BookCard
                  key={book.title}
                  book={book}
                />
              ))}
            </div>
          </section>

          {/* Premium */}
          <PremiumCard />
        </div>

        {/* =========================
            BOTTOM SECTION
        ========================== */}
        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          <KeepReading />

          <AverageTime />
        </div>
      </div>
    </div>
  );
}