import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCheck,
  faSpinner,
  faImage,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import bookstoreService from "../../../../../lib/service/books/bookstoreService";
import { useAuth } from "../../../../context/AuthContext";

/* ============================================================
 * Field primitives
 * ============================================================ */
const Label = ({ children, required }) => (
  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
    {children}
    {required && <span className="ml-1 text-red-500">*</span>}
  </label>
);

const Input = ({ label, required, ...props }) => (
  <div className="flex flex-col">
    <Label required={required}>{label}</Label>
    <input
      {...props}
      className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-white/10 dark:bg-[#1e1e1e] dark:text-white dark:placeholder:text-gray-500"
    />
  </div>
);

const Textarea = ({ label, required, ...props }) => (
  <div className="flex flex-col">
    <Label required={required}>{label}</Label>
    <textarea
      {...props}
      rows={3}
      className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-white/10 dark:bg-[#1e1e1e] dark:text-white dark:placeholder:text-gray-500"
    />
  </div>
);

const Select = ({ label, required, options = [], ...props }) => (
  <div className="flex flex-col">
    <Label required={required}>{label}</Label>
    <select
      {...props}
      className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-white/10 dark:bg-[#1e1e1e] dark:text-white"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

/* ============================================================
 * Genre chips input
 * ============================================================ */
const GenrePicker = ({ value = [], onChange }) => {
  const [draft, setDraft] = useState("");

  const add = () => {
    const g = draft.trim().toLowerCase();
    if (!g || value.includes(g) || value.length >= 10) return;
    onChange([...value, g]);
    setDraft("");
  };

  const remove = (g) => onChange(value.filter((x) => x !== g));

  return (
    <div className="flex flex-col">
      <Label>Genres (max 10)</Label>

      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="e.g. self-help"
          className="h-10 flex-1 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-white/10 dark:bg-[#1e1e1e] dark:text-white"
        />
        <button
          type="button"
          onClick={add}
          className="flex h-10 items-center gap-1.5 rounded-lg bg-blue-500 px-3 text-xs font-semibold text-white transition hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={faPlus} className="text-[10px]" />
          Add
        </button>
      </div>

      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {value.map((g) => (
            <span
              key={g}
              className="flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700 dark:bg-white/10 dark:text-gray-300"
            >
              {g}
              <button
                type="button"
                onClick={() => remove(g)}
                className="text-slate-400 hover:text-red-500"
              >
                <FontAwesomeIcon icon={faXmark} className="text-[10px]" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

/* ============================================================
 * Color picker — matches palette used in dashboard
 * ============================================================ */
const PALETTE = [
  "bg-[#F26A3E]",
  "bg-[#F4D03F]",
  "bg-[#2C3E50]",
  "bg-[#FDFBF7]",
  "bg-[#A5D6D9]",
  "bg-[#E5D38B]",
  "bg-[#C49BC7]",
  "bg-[#3E3E3E]",
];

const ColorPicker = ({ value, onChange }) => (
  <div className="flex flex-col">
    <Label>Card background</Label>
    <div className="flex flex-wrap gap-2">
      {PALETTE.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={`h-8 w-8 rounded-lg border-2 transition ${c} ${
            value === c
              ? "border-blue-500 scale-110 shadow-md"
              : "border-white/40 hover:scale-105"
          }`}
          aria-label={c}
        />
      ))}
    </div>
  </div>
);

/* ============================================================
 * Main form
 * ============================================================ */
export default function BookForm({ onSuccess }) {
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    author: "",
    ISBN: "",
    publisher: "",
    price: "",
    stock: "",
    availableCopies: "",
    coverImage: "",
    description: "",
    language: "English",
    maxBorrowDuration: 14,
    status: "available",
    bgColor: "bg-[#F26A3E]",
    tag: "",
    tagColor: "",
    genre: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Guard: must be logged in
    if (!user || !user._id) {
      setError("You must be logged in to add books.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: form.title.trim(),
        author: form.author.trim(),
        ISBN: form.ISBN.replace(/[-\s]/g, ""),
        publisher: form.publisher.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        availableCopies:
          form.availableCopies === ""
            ? Number(form.stock)
            : Number(form.availableCopies),
        coverImage: form.coverImage.trim(),
        description: form.description.trim(),
        language: form.language.trim() || "English",
        maxBorrowDuration: Number(form.maxBorrowDuration) || 14,
        status: form.status,
        genre: form.genre,
        bgColor: form.bgColor,
        tag: form.tag.trim(),
        tagColor: form.tagColor.trim(),

        // ── Who created it ──
        addedBy: user._id,
        postedBy: {
          name: user.name || "Unknown",
          role: user.role,
          userId: user._id,
        },
      };

      await bookstoreService.createBook(payload);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSuccess?.();
      }, 1000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to create book"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-5">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-white/10">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
          <FontAwesomeIcon icon={faBook} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            New book
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Add a title to the library
            {user?.name && ` • as ${user.name}`}
          </p>
        </div>
      </div>

      {/* Title + Author */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Title"
          required
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Atomic Habits"
          maxLength={200}
        />
        <Input
          label="Author"
          required
          value={form.author}
          onChange={(e) => set("author", e.target.value)}
          placeholder="James Clear"
          maxLength={100}
        />
      </div>

      {/* ISBN + Publisher */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="ISBN"
          required
          value={form.ISBN}
          onChange={(e) => set("ISBN", e.target.value)}
          placeholder="9780735211292"
          maxLength={20}
        />
        <Input
          label="Publisher"
          required
          value={form.publisher}
          onChange={(e) => set("publisher", e.target.value)}
          placeholder="Avery"
          maxLength={100}
        />
      </div>

      {/* Price + Stock + Available */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Input
          label="Price ($)"
          required
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={(e) => set("price", e.target.value)}
          placeholder="32"
        />
        <Input
          label="Stock"
          required
          type="number"
          min="0"
          value={form.stock}
          onChange={(e) => set("stock", e.target.value)}
          placeholder="5"
        />
        <Input
          label="Available copies"
          type="number"
          min="0"
          value={form.availableCopies}
          onChange={(e) => set("availableCopies", e.target.value)}
          placeholder="(defaults to stock)"
        />
      </div>

      {/* Cover image */}
      <Input
        label="Cover image URL"
        type="url"
        value={form.coverImage}
        onChange={(e) => set("coverImage", e.target.value)}
        placeholder="https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg"
      />

      {/* Preview */}
      {form.coverImage && (
        <div className="flex items-center gap-3">
          <div className="h-20 w-14 shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-white/10">
            <img
              src={form.coverImage}
              alt="preview"
              className="h-full w-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            <FontAwesomeIcon icon={faImage} className="mr-1.5" />
            Cover preview
          </span>
        </div>
      )}

      {/* Description */}
      <Textarea
        label="Description"
        value={form.description}
        onChange={(e) => set("description", e.target.value)}
        placeholder="Short summary of the book..."
        maxLength={2000}
      />

      {/* Genre + Language */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <GenrePicker value={form.genre} onChange={(g) => set("genre", g)} />
        <Input
          label="Language"
          value={form.language}
          onChange={(e) => set("language", e.target.value)}
          placeholder="English"
        />
      </div>

      {/* Status + Duration */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Status"
          value={form.status}
          onChange={(e) => set("status", e.target.value)}
          options={[
            { value: "available", label: "Available" },
            { value: "maintenance", label: "Maintenance" },
            { value: "lost", label: "Lost" },
          ]}
        />
        <Input
          label="Max borrow (days)"
          type="number"
          min="1"
          max="90"
          value={form.maxBorrowDuration}
          onChange={(e) => set("maxBorrowDuration", e.target.value)}
        />
      </div>

      {/* Card styling */}
      <div className="rounded-xl border border-gray-100 p-4 dark:border-white/10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Card styling
        </p>

        <ColorPicker value={form.bgColor} onChange={(c) => set("bgColor", c)} />

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Badge text"
            value={form.tag}
            onChange={(e) => set("tag", e.target.value)}
            placeholder="BESTSELLER"
          />
          <Input
            label="Badge color (Tailwind)"
            value={form.tagColor}
            onChange={(e) => set("tagColor", e.target.value)}
            placeholder="bg-slate-800 text-white"
          />
        </div>
      </div>

      {/* Feedback */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-xs text-green-700 dark:border-green-900/40 dark:bg-green-950/20 dark:text-green-400">
          <FontAwesomeIcon icon={faCheck} />
          Book created successfully
        </div>
      )}

      {/* Submit */}
      <div className="flex justify-end gap-2 border-t border-gray-100 pt-4 dark:border-white/10">
        <button
          type="button"
          onClick={() => onSuccess?.()}
          className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin />
              Creating…
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPlus} />
              Create book
            </>
          )}
        </button>
      </div>
    </form>
  );
}