import { useEffect, useMemo, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookOpen,
    faClock,
    faTriangleExclamation,
    faCalendarCheck,
    faRotateLeft,
    faMagnifyingGlass,
    faUser,
    faChevronLeft,
    faChevronRight,
    faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import bookstoreService from "../../../../lib/service/books/bookstoreService";

/* ============================================================
 * Theme tokens (match LibrarianBookStore / LibrarianDashboard)
 * ============================================================ */
const THEME = {
    teal: "#55b6b6",
    tealHover: "#43a6a6",
    tealSoft: "#eefafa",
    tealSoftDark: "#0f2424",
    tealText: "#0f2424",
    tealTextDark: "#7adcdc",
    orange: "#ed7950",
    orangeSoft: "#fff4ef",
    amber: "#c78f2c",
    amberSoft: "#fdf4e3",
    warmBarBg: "#f8d8cc",
};

/* ============================================================
 * Helpers
 * ============================================================ */
const safeArray = (value) => {
    if (Array.isArray(value)) return value;
    if (Array.isArray(value?.data)) return value.data;
    return [];
};

const formatDate = (date) => {
    if (!date) return "—";
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "—";
    return parsed.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const getDaysDifference = (date) => {
    if (!date) return null;
    const target = new Date(date);
    if (Number.isNaN(target.getTime())) return null;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetDay = new Date(
        target.getFullYear(),
        target.getMonth(),
        target.getDate()
    );

    return Math.ceil((targetDay - today) / (1000 * 60 * 60 * 24));
};

const getBorrowStatus = (borrow) => {
    if (borrow?.status === "returned") return "returned";
    const days = getDaysDifference(borrow?.dueDate);
    if (days !== null && days < 0) return "overdue";
    return "borrowed";
};

const getBorrowerName = (borrow) =>
    borrow?.borrower?.name || "Unknown borrower";

const getBookTitle = (borrow) =>
    borrow?.book?.title || "Unknown book";

/* ============================================================
 * Status Badge — theme-matched
 * ============================================================ */
const StatusBadge = ({ status }) => {
    if (status === "overdue") {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-500">
                <FontAwesomeIcon icon={faTriangleExclamation} />
                Overdue
            </span>
        );
    }

    if (status === "returned") {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500">
                <FontAwesomeIcon icon={faCircleCheck} />
                Returned
            </span>
        );
    }

    return (
        <span
            className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
            style={{
                backgroundColor: THEME.tealSoft,
                color: THEME.tealText,
            }}
        >
            <FontAwesomeIcon icon={faBookOpen} />
            Borrowed
        </span>
    );
};

/* ============================================================
 * Due Info
 * ============================================================ */
const DueInfo = ({ borrow, status }) => {
    if (status === "returned") {
        return (
            <div className="text-sm">
                <p className="text-gray-500">Returned</p>
                <p className="mt-1 font-medium text-emerald-500">
                    {formatDate(borrow.returnedAt)}
                </p>
            </div>
        );
    }

    const days = getDaysDifference(borrow.dueDate);

    if (days === null) {
        return <div className="text-sm text-gray-400">No due date</div>;
    }

    if (days < 0) {
        const overdueDays = Math.abs(days);
        return (
            <div className="text-sm">
                <p className="text-red-500">
                    {overdueDays} {overdueDays === 1 ? "day" : "days"} overdue
                </p>
                <p className="mt-1 text-xs text-gray-500">
                    Due {formatDate(borrow.dueDate)}
                </p>
            </div>
        );
    }

    if (days === 0) {
        return (
            <div className="text-sm">
                <p className="font-medium" style={{ color: THEME.amber }}>
                    Due today
                </p>
                <p className="mt-1 text-xs text-gray-500">
                    {formatDate(borrow.dueDate)}
                </p>
            </div>
        );
    }

    return (
        <div className="text-sm">
            <p className="font-medium text-gray-700 dark:text-gray-200">
                {days} {days === 1 ? "day" : "days"} left
            </p>
            <p className="mt-1 text-xs text-gray-500">
                Due {formatDate(borrow.dueDate)}
            </p>
        </div>
    );
};

/* ============================================================
 * Stat Card — theme-matched
 * ============================================================ */
const StatCard = ({ title, value, subtitle, icon, iconClass, valueClass }) => (
    <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1B1A1A]">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p
                    className={`mt-2 text-3xl font-semibold ${
                        valueClass || "text-gray-800 dark:text-gray-100"
                    }`}
                >
                    {value}
                </p>
                {subtitle && (
                    <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
                )}
            </div>
            <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
            >
                <FontAwesomeIcon icon={icon} />
            </div>
        </div>
    </div>
);

/* ============================================================
 * Main
 * ============================================================ */
export default function BorrowedBookDashboard() {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("active");

    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({
        total: 0,
        page: 1,
        limit: 20,
        pages: 1,
    });

    const [returningId, setReturningId] = useState(null);

    /* ---------- Load ---------- */
    const loadBorrowedBooks = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const response = await bookstoreService.getBorrowedBooks({
                status: statusFilter,
                page,
                limit: 20,
            });

            setBorrowedBooks(safeArray(response));

            if (response?.meta) {
                setMeta(response.meta);
            } else {
                // fall back so pagination UI still makes sense
                const count = safeArray(response).length;
                setMeta({
                    total: count,
                    page,
                    limit: 20,
                    pages: 1,
                });
            }
        } catch (err) {
            console.error("Failed to load borrowed books:", err);
            setError(
                err?.response?.data?.message ||
                    "Failed to load borrowed books."
            );
            setBorrowedBooks([]);
        } finally {
            setLoading(false);
        }
    }, [statusFilter, page]);

    useEffect(() => {
        loadBorrowedBooks();
    }, [loadBorrowedBooks]);

    /* ---------- Derived ---------- */
    const processedBooks = useMemo(
        () =>
            borrowedBooks.map((borrow) => ({
                ...borrow,
                calculatedStatus: getBorrowStatus(borrow),
            })),
        [borrowedBooks]
    );

    const filteredBooks = useMemo(() => {
        const keyword = search.trim().toLowerCase();
        if (!keyword) return processedBooks;

        return processedBooks.filter((borrow) => {
            const bookTitle = borrow?.book?.title?.toLowerCase() || "";
            const author = borrow?.book?.author?.toLowerCase() || "";
            const borrower = borrow?.borrower?.name?.toLowerCase() || "";
            const email = borrow?.borrower?.email?.toLowerCase() || "";

            return (
                bookTitle.includes(keyword) ||
                author.includes(keyword) ||
                borrower.includes(keyword) ||
                email.includes(keyword)
            );
        });
    }, [processedBooks, search]);

    const statistics = useMemo(() => {
        const active = processedBooks.filter(
            (item) =>
                item.calculatedStatus === "borrowed" ||
                item.calculatedStatus === "overdue"
        );
        const overdue = processedBooks.filter(
            (item) => item.calculatedStatus === "overdue"
        );
        const dueToday = active.filter(
            (item) => getDaysDifference(item.dueDate) === 0
        );
        const dueSoon = active.filter((item) => {
            const days = getDaysDifference(item.dueDate);
            return days !== null && days >= 1 && days <= 3;
        });

        return {
            active: active.length,
            overdue: overdue.length,
            dueToday: dueToday.length,
            dueSoon: dueSoon.length,
        };
    }, [processedBooks]);

    /* ---------- Actions ---------- */
    const handleReturn = async (borrow) => {
        const bookId = borrow?.book?._id;
        const borrowerId = borrow?.borrower?._id;

        if (!bookId || !borrowerId) {
            setError("Book or borrower information is missing.");
            return;
        }

        const confirmed = window.confirm(
            `Return "${getBookTitle(borrow)}" from ${getBorrowerName(borrow)}?`
        );
        if (!confirmed) return;

        try {
            setReturningId(borrow._id);
            setError("");

            await bookstoreService.returnBook(bookId, { borrowerId });
            await loadBorrowedBooks();
        } catch (err) {
            console.error("Failed to return book:", err);
            setError(
                err?.response?.data?.message ||
                    "Failed to return the book."
            );
        } finally {
            setReturningId(null);
        }
    };

    const handleStatusChange = (status) => {
        setPage(1);
        setStatusFilter(status);
    };

    /* ============================================================
     * RENDER
     * ============================================================ */
    return (
        <div className="min-h-screen overflow-hidden bg-[#f7f6f5] px-5 pb-10 pt-24 md:px-7 md:pt-28 dark:bg-[#0E0E0E]">
            {/* Ambient background — matches other librarian pages */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 bg-[radial-gradient(60%_50%_at_15%_0%,#e8f5f5_0%,transparent_60%),radial-gradient(50%_45%_at_100%_10%,#fdeee4_0%,transparent_60%)] dark:bg-[radial-gradient(60%_50%_at_15%_0%,#0f2424_0%,transparent_60%),radial-gradient(50%_45%_at_100%_10%,#2a1710_0%,transparent_60%)]"
            />

            <div className="relative mx-auto max-w-[1200px]">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                                Borrowed Books
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage currently borrowed books, due dates,
                                and returns.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={loadBorrowedBooks}
                            disabled={loading}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#55b6b6] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#43a6a6] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <FontAwesomeIcon
                                icon={faRotateLeft}
                                className={loading ? "animate-spin" : ""}
                            />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400">
                        {error}
                    </div>
                )}

                {/* Statistics */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        title="Currently Borrowed"
                        value={statistics.active}
                        subtitle="Active borrowing records"
                        icon={faBookOpen}
                        iconClass="bg-[#eefafa] text-[#0f2424] dark:bg-[#0f2424] dark:text-[#7adcdc]"
                    />
                    <StatCard
                        title="Overdue"
                        value={statistics.overdue}
                        subtitle="Past their due date"
                        icon={faTriangleExclamation}
                        iconClass="bg-red-500/10 text-red-500"
                        valueClass="text-red-500"
                    />
                    <StatCard
                        title="Due Today"
                        value={statistics.dueToday}
                        subtitle="Should be returned today"
                        icon={faCalendarCheck}
                        iconClass="bg-[#fdf4e3] text-[#c78f2c] dark:bg-[#2a2210]"
                        valueClass="text-[#c78f2c]"
                    />
                    <StatCard
                        title="Due Soon"
                        value={statistics.dueSoon}
                        subtitle="Due within 3 days"
                        icon={faClock}
                        iconClass="bg-[#fff4ef] text-[#ed7950] dark:bg-[#2a1710]"
                        valueClass="text-[#ed7950]"
                    />
                </div>

                {/* Main panel */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#1B1A1A]">
                    {/* Toolbar */}
                    <div className="border-b border-gray-100 p-4 dark:border-gray-800">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            {/* Search */}
                            <div className="relative w-full lg:max-w-md">
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search book or borrower..."
                                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-[#55b6b6] dark:border-gray-700 dark:bg-[#101010] dark:text-gray-100"
                                />
                            </div>

                            {/* Status filters */}
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { value: "active", label: "Active" },
                                    { value: "borrowed", label: "Borrowed" },
                                    { value: "overdue", label: "Overdue" },
                                    { value: "returned", label: "Returned" },
                                ].map((item) => {
                                    const active =
                                        statusFilter === item.value;
                                    return (
                                        <button
                                            key={item.value}
                                            type="button"
                                            onClick={() =>
                                                handleStatusChange(
                                                    item.value
                                                )
                                            }
                                            className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                                                active
                                                    ? "bg-[#55b6b6] text-white"
                                                    : "bg-[#eefafa] text-[#0f2424] hover:bg-[#d8f0f0] dark:bg-[#0f2424] dark:text-[#7adcdc] dark:hover:bg-[#143232]"
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Loading / Empty / Content */}
                    {loading ? (
                        <div className="flex min-h-[350px] items-center justify-center">
                            <div className="text-center">
                                <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#55b6b6] dark:border-gray-800" />
                                <p className="text-sm text-gray-500">
                                    Loading borrowed books...
                                </p>
                            </div>
                        </div>
                    ) : filteredBooks.length === 0 ? (
                        <div className="flex min-h-[350px] items-center justify-center px-6">
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eefafa] text-[#55b6b6] dark:bg-[#0f2424]">
                                    <FontAwesomeIcon
                                        icon={faBookOpen}
                                        className="text-xl"
                                    />
                                </div>
                                <h3 className="font-medium text-gray-800 dark:text-gray-100">
                                    No borrowing records
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    No books match the current filter.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Desktop table */}
                            <div className="hidden overflow-x-auto lg:block">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100 text-left dark:border-gray-800">
                                            <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Book
                                            </th>
                                            <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Borrower
                                            </th>
                                            <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Borrowed
                                            </th>
                                            <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Due
                                            </th>
                                            <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Status
                                            </th>
                                            <th className="px-5 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredBooks.map((borrow) => {
                                            const status =
                                                borrow.calculatedStatus;
                                            return (
                                                <tr
                                                    key={borrow._id}
                                                    className="border-b border-gray-100 transition hover:bg-[#eefafa]/40 dark:border-gray-800 dark:hover:bg-white/[0.02]"
                                                >
                                                    {/* Book */}
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#eefafa] dark:bg-[#0f2424]">
                                                                {borrow?.book
                                                                    ?.coverImage ? (
                                                                    <img
                                                                        src={
                                                                            borrow
                                                                                .book
                                                                                .coverImage
                                                                        }
                                                                        alt={getBookTitle(
                                                                            borrow
                                                                        )}
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faBookOpen
                                                                        }
                                                                        className="text-[#55b6b6]"
                                                                    />
                                                                )}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="truncate font-medium text-gray-800 dark:text-gray-100">
                                                                    {getBookTitle(
                                                                        borrow
                                                                    )}
                                                                </p>
                                                                <p className="mt-1 truncate text-xs text-gray-500">
                                                                    {borrow
                                                                        ?.book
                                                                        ?.author ||
                                                                        "Unknown author"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Borrower */}
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eefafa] text-[#0f2424] dark:bg-[#0f2424] dark:text-[#7adcdc]">
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faUser
                                                                    }
                                                                    className="text-xs"
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                                                    {getBorrowerName(
                                                                        borrow
                                                                    )}
                                                                </p>
                                                                <p className="mt-0.5 text-xs text-gray-500">
                                                                    {borrow
                                                                        ?.borrower
                                                                        ?.role ||
                                                                        "User"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Borrowed */}
                                                    <td className="px-5 py-4 text-sm text-gray-500">
                                                        {formatDate(
                                                            borrow.borrowedAt
                                                        )}
                                                    </td>

                                                    {/* Due */}
                                                    <td className="px-5 py-4">
                                                        <DueInfo
                                                            borrow={borrow}
                                                            status={status}
                                                        />
                                                    </td>

                                                    {/* Status */}
                                                    <td className="px-5 py-4">
                                                        <StatusBadge
                                                            status={status}
                                                        />
                                                    </td>

                                                    {/* Action */}
                                                    <td className="px-5 py-4 text-right">
                                                        {status !==
                                                            "returned" && (
                                                            <button
                                                                type="button"
                                                                disabled={
                                                                    returningId ===
                                                                    borrow._id
                                                                }
                                                                onClick={() =>
                                                                    handleReturn(
                                                                        borrow
                                                                    )
                                                                }
                                                                className="rounded-lg bg-[#55b6b6] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#43a6a6] disabled:cursor-not-allowed disabled:opacity-50"
                                                            >
                                                                {returningId ===
                                                                borrow._id
                                                                    ? "Returning..."
                                                                    : "Return"}
                                                            </button>
                                                        )}

                                                        {status ===
                                                            "returned" && (
                                                            <span className="text-xs text-gray-400">
                                                                Completed
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile cards */}
                            <div className="space-y-3 p-4 lg:hidden">
                                {filteredBooks.map((borrow) => {
                                    const status = borrow.calculatedStatus;
                                    return (
                                        <div
                                            key={borrow._id}
                                            className="rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-[#101010]"
                                        >
                                            <div className="flex gap-3">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#eefafa] dark:bg-[#0f2424]">
                                                    {borrow?.book
                                                        ?.coverImage ? (
                                                        <img
                                                            src={
                                                                borrow.book
                                                                    .coverImage
                                                            }
                                                            alt={getBookTitle(
                                                                borrow
                                                            )}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <FontAwesomeIcon
                                                            icon={faBookOpen}
                                                            className="text-[#55b6b6]"
                                                        />
                                                    )}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="min-w-0">
                                                            <h3 className="truncate font-medium text-gray-800 dark:text-gray-100">
                                                                {getBookTitle(
                                                                    borrow
                                                                )}
                                                            </h3>
                                                            <p className="mt-1 truncate text-xs text-gray-500">
                                                                {borrow?.book
                                                                    ?.author ||
                                                                    "Unknown author"}
                                                            </p>
                                                        </div>
                                                        <StatusBadge
                                                            status={status}
                                                        />
                                                    </div>

                                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                                        <div>
                                                            <p className="text-xs text-gray-400">
                                                                Borrower
                                                            </p>
                                                            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                                                                {getBorrowerName(
                                                                    borrow
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-400">
                                                                Borrowed
                                                            </p>
                                                            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                                                                {formatDate(
                                                                    borrow.borrowedAt
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-400">
                                                                Due
                                                            </p>
                                                            <div className="mt-1">
                                                                <DueInfo
                                                                    borrow={
                                                                        borrow
                                                                    }
                                                                    status={
                                                                        status
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-end justify-end">
                                                            {status !==
                                                                "returned" && (
                                                                <button
                                                                    type="button"
                                                                    disabled={
                                                                        returningId ===
                                                                        borrow._id
                                                                    }
                                                                    onClick={() =>
                                                                        handleReturn(
                                                                            borrow
                                                                        )
                                                                    }
                                                                    className="rounded-lg bg-[#55b6b6] px-3 py-2 text-xs font-medium text-white disabled:opacity-50"
                                                                >
                                                                    {returningId ===
                                                                    borrow._id
                                                                        ? "Returning..."
                                                                        : "Return"}
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-xs text-gray-500">
                                    Page {meta.page || page} of{" "}
                                    {meta.pages || 1}
                                    {" · "}
                                    {meta.total || 0} records
                                </p>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        disabled={page <= 1 || loading}
                                        onClick={() =>
                                            setPage((current) =>
                                                Math.max(1, current - 1)
                                            )
                                        }
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:text-[#55b6b6] disabled:cursor-not-allowed disabled:opacity-30 dark:border-gray-700 dark:bg-[#101010]"
                                    >
                                        <FontAwesomeIcon
                                            icon={faChevronLeft}
                                        />
                                    </button>

                                    <span className="px-2 text-sm text-gray-500">
                                        {page}
                                    </span>

                                    <button
                                        type="button"
                                        disabled={
                                            page >= (meta.pages || 1) ||
                                            loading
                                        }
                                        onClick={() =>
                                            setPage((current) => current + 1)
                                        }
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:text-[#55b6b6] disabled:cursor-not-allowed disabled:opacity-30 dark:border-gray-700 dark:bg-[#101010]"
                                    >
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}