export default function StatGrid({ children }) {
    return (
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {children}
        </div>
    );
}