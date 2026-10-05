import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faChevronRight,
  faClock,
  faFileText,
} from "@fortawesome/free-solid-svg-icons";

import FloatingMenu from "../../shared/ui/FloatingMenu";
import bookstoreService from "../../../../lib/service/books/bookstoreService";

/* ============================================================
 * Small helpers
 * ============================================================ */
const safeNum = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const Rating = ({ value = 0, count = 0 }) => (
  <div className="flex items-center gap-1">
    <div className="flex text-orange-400">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={`text-sm ${
            s <= Math.round(safeNum(value)) ? "" : "opacity-25"
          }`}
        >
          ★
        </span>
      ))}
    </div>
    <span className="ml-1 text-xs text-gray-500">
      {safeNum(value).toFixed(2)} · {count}
    </span>
  </div>
);

/* ============================================================
 * Book row card (mirrors the reading dashboard)
 * ============================================================ */
const BookRowCard = ({ book }) => (
  <div className="flex items-center gap-4 rounded-2xl bg-white p-2 shadow-sm dark:bg-[#1B1A1A]">
    <img
      src={book.coverImage || ""}
      alt={book.title}
      className="h-22 w-24.5 shrink-0 rounded-xl object-cover"
      onError={(e) => (e.currentTarget.style.opacity = "0.2")}
    />

    <div className="min-w-0 flex-1">
      <h3 className="truncate text-[15px] font-semibold text-gray-800 dark:text-gray-100">
        {book.title}
      </h3>
      <p className="mt-1 text-xs text-gray-500">by {book.author}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
        <span>{book.availableCopies} in stock</span>
        <span className="text-gray-300">•</span>
        <span>{book.stock} total</span>
        <Rating value={book.rating?.average} count={book.rating?.count} />
      </div>
    </div>

    <button
      type="button"
      className="mr-2 flex h-8 w-8 items-center justify-center rounded-full text-[#55b6b6] transition hover:bg-[#eefafa] dark:hover:bg-white/5"
      aria-label={`Open ${book.title}`}
    >
      <FontAwesomeIcon icon={faChevronRight} size={18} />
    </button>
  </div>
);

/* ============================================================
 * Stats card (replaces "Premium card")
 * ============================================================ */
const StatsCard = ({ total, available, borrowed, lowStock }) => (
  <div className="relative flex min-h-[285px] flex-col overflow-hidden rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1B1A1A]">
    <h2 className="max-w-[200px] text-[17px] font-semibold leading-7 text-gray-800 dark:text-gray-100">
      Library at a glance
    </h2>
    <p className="mt-2 max-w-[220px] text-xs leading-5 text-gray-500">
      Real-time snapshot of your collection and circulation.
    </p>

    <div className="mt-5 grid grid-cols-2 gap-3">
      <div className="rounded-xl bg-[#eefafa] p-3 dark:bg-[#0f2424]">
        <p className="text-[11px] text-gray-500">Total titles</p>
        <p className="mt-0.5 text-xl font-bold text-[#0f2424] dark:text-[#7adcdc]">
          {total}
        </p>
      </div>
      <div className="rounded-xl bg-[#eefafa] p-3 dark:bg-[#0f2424]">
        <p className="text-[11px] text-gray-500">Available</p>
        <p className="mt-0.5 text-xl font-bold text-[#0f2424] dark:text-[#7adcdc]">
          {available}
        </p>
      </div>
      <div className="rounded-xl bg-[#fff4ef] p-3 dark:bg-[#2a1710]">
        <p className="text-[11px] text-gray-500">Borrowed</p>
        <p className="mt-0.5 text-xl font-bold text-[#ed7950]">{borrowed}</p>
      </div>
      <div className="rounded-xl bg-[#fdf4e3] p-3 dark:bg-[#2a2210]">
        <p className="text-[11px] text-gray-500">Low stock</p>
        <p className="mt-0.5 text-xl font-bold text-[#c78f2c]">{lowStock}</p>
      </div>
    </div>

    <button
      type="button"
      className="absolute bottom-4 left-5 right-5 rounded-xl bg-[#55b6b6] py-3 text-sm font-medium text-white transition hover:bg-[#43a6a6]"
    >
      Manage collection
    </button>
  </div>
);

/* ============================================================
 * Low-stock alerts (replaces "Keep Reading")
 * ============================================================ */
const LowStock = ({ books = [] }) => (
  <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1B1A1A]">
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-[16px] font-semibold text-gray-800 dark:text-gray-100">
        Low stock alerts
      </h2>
      <button className="text-xs font-medium text-[#55b6b6] hover:underline">
        View all
      </button>
    </div>

    {books.length === 0 ? (
      <p className="py-6 text-center text-xs text-gray-500">
        All titles are well stocked ✅
      </p>
    ) : (
      <div className="space-y-5">
        {books.map((b) => {
          const ratio = b.stock > 0 ? (b.availableCopies / b.stock) * 100 : 0;
          const alert = b.availableCopies === 0;

          return (
            <div key={b._id}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="truncate text-xs font-medium text-gray-700 dark:text-gray-300">
                  {b.title}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    alert ? "text-red-500" : "text-[#c78f2c]"
                  }`}
                >
                  {b.availableCopies}/{b.stock}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-[4px] flex-1 overflow-hidden rounded-full bg-[#f8d8cc]">
                  <div
                    className={`h-full rounded-full ${
                      alert ? "bg-red-500" : "bg-[#ed7950]"
                    }`}
                    style={{ width: `${Math.min(100, ratio)}%` }}
                  />
                </div>
                <button className="w-[98px] rounded-lg bg-[#55b6b6] py-2 text-xs font-medium text-white transition hover:bg-[#43a6a6]">
                  Restock
                </button>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

/* ============================================================
 * Average / Activity card (replaces "Average time")
 * ============================================================ */
const ActivityCard = ({ books = [] }) => {
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const last7 = (() => {
    const out = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      out.push(d);
    }
    return out;
  })();

  const daily = last7.map((d) => {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const value = books.filter((b) => {
      if (!b?.createdAt) return false;
      const c = new Date(b.createdAt);
      const ck = `${c.getFullYear()}-${String(c.getMonth() + 1).padStart(2, "0")}-${String(c.getDate()).padStart(2, "0")}`;
      return ck === key;
    }).length;
    return { label: DAYS[d.getDay()], value };
  });

  const maxVal = Math.max(1, ...daily.map((d) => d.value));
  const totalPages = books.reduce((sum, b) => sum + safeNum(b.pageCount), 0);
  const totalRead = books.filter((b) => b.status === "available").length;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-[#0E0E0E]">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[16px] font-semibold text-gray-800 dark:text-gray-100">
            Reading activity
          </h2>
          <p className="mt-7 text-xs text-gray-500">This week</p>
          <div className="mt-1 flex items-center gap-2">
            <FontAwesomeIcon
              icon={faClock}
              className="text-gray-400"
              size={18}
            />
            <span className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {daily.reduce((s, d) => s + d.value, 0)} added
            </span>
          </div>
        </div>

        {/* Week bars */}
        <div className="flex h-[100px] items-end gap-4">
          {daily.map((d, i) => {
            const h = (d.value / maxVal) * 95;
            return (
              <div
                key={i}
                className="relative h-[95px] w-[10px] overflow-hidden rounded-full bg-[#f8d8cc]"
                title={`${d.label}: ${d.value}`}
              >
                <div
                  className="absolute bottom-0 w-full rounded-full bg-[#ed7950]"
                  style={{ height: `${Math.max(4, h)}%` }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-9 grid grid-cols-2 gap-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff4ef] dark:bg-[#2a1710]">
            <FontAwesomeIcon
              icon={faBookOpen}
              size={22}
              className="text-[#ed7950]"
            />
          </div>
          <div>
            <p className="text-xs text-gray-500">Available books</p>
            <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-gray-100">
              {totalRead}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff4ef] dark:bg-[#2a1710]">
            <FontAwesomeIcon
              icon={faFileText}
              size={22}
              className="text-[#ed7950]"
            />
          </div>
          <div>
            <p className="text-xs text-gray-500">Total pages</p>
            <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-gray-100">
              {totalPages.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
 * Main
 * ============================================================ */
export default function LibrarianBookStore() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    bookstoreService
      .getAllBooks({ sort: "-createdAt", limit: 50 })
      .then((res) => {
        const list = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];
        setBooks(list);
      })
      .catch((err) => {
        console.error("LibrarianBookStore fetch error:", err);
        setError(err?.message || "Failed to load books");
        setBooks([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const safeBooks = Array.isArray(books) ? books : [];
  const totalBooks = safeBooks.length;
  const availableBooks = safeBooks.filter((b) => b?.isAvailable === true).length;
  const borrowedBooks = safeBooks.filter((b) => safeNum(b?.borrowedOut) > 0).length;

  const lowStockBooks = safeBooks
    .filter((b) => safeNum(b?.availableCopies) <= 1)
    .sort((a, b) => safeNum(a.availableCopies) - safeNum(b.availableCopies))
    .slice(0, 3);

  const recentBooks = safeBooks.slice(0, 4);

  /* ============================================================
   * Shared page wrapper — same top offset for all 3 states
   * ============================================================ */
  const pageClass =
    "min-h-screen overflow-hidden bg-[#f7f6f5] px-5 pb-10 pt-24 md:px-7 md:pt-28 dark:bg-[#0E0E0E]";

  /* ============================================================
   * LOADING
   * ============================================================ */
  if (loading) {
    return (
      <div className={pageClass}>
        <div className="relative mx-auto max-w-[1200px]">
          <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800"
                />
              ))}
            </div>
            <div className="h-[285px] animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
          </div>
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <div className="h-64 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
            <div className="h-64 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================
   * ERROR
   * ============================================================ */
  if (error) {
    return (
      <div className={pageClass}>
        <div className="mx-auto max-w-[1200px] rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/40 dark:bg-red-950/20">
          <h2 className="font-semibold text-red-700 dark:text-red-400">
            Could not load library
          </h2>
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  /* ============================================================
   * MAIN
   * ============================================================ */
  return (
    <div className={pageClass}>
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(60%_50%_at_15%_0%,#e8f5f5_0%,transparent_60%),radial-gradient(50%_45%_at_100%_10%,#fdeee4_0%,transparent_60%)] dark:bg-[radial-gradient(60%_50%_at_15%_0%,#0f2424_0%,transparent_60%),radial-gradient(50%_45%_at_100%_10%,#2a1710_0%,transparent_60%)]"
      />

      <div className="relative mx-auto max-w-[1200px]">
        {/* TOP */}
        <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-[17px] font-semibold text-gray-800 dark:text-gray-100">
                Recently added
              </h1>
              <button className="text-xs font-medium text-[#55b6b6] hover:underline">
                View All
              </button>
            </div>

            {recentBooks.length === 0 ? (
              <div className="rounded-2xl bg-white p-8 text-center text-sm text-gray-500 dark:bg-[#1B1A1A]">
                No books yet. Add one from the FAB.
              </div>
            ) : (
              <div className="space-y-2">
                {recentBooks.map((b) => (
                  <BookRowCard key={b._id} book={b} />
                ))}
              </div>
            )}
          </section>

          <StatsCard
            total={totalBooks}
            available={availableBooks}
            borrowed={borrowedBooks}
            lowStock={lowStockBooks.length}
          />
        </div>

        {/* BOTTOM */}
        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          <LowStock books={lowStockBooks} />
          <ActivityCard books={safeBooks} />
        </div>
      </div>
      <FloatingMenu />
    </div>
  );
}