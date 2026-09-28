
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ExpandableMenuVertical from "./menuVertical";
import { FORM_TABS } from "../cards/Forms/config/forms";

import {
    faPlus,
    faHome,
    faMagnifyingGlass,
    faClockRotateLeft,
    faUser,
    faGraduationCap,
    faCalendarDays,
    faTableCells,
    faBuilding,
    faBook,
} from "@fortawesome/free-solid-svg-icons";

/* Icon per form tab */
const TAB_ICONS = {
    grade: faGraduationCap,
    academicYear: faCalendarDays,
    timetable: faTableCells,
    department: faBuilding,
    subject: faBook,
};

/* ---------- Modal ---------- */
function FormModal({ open, onClose, title, children }) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />
            <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#151515]">
                <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 dark:border-white/10">
                    <h2 className="truncate text-base font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M6 6l12 12M6 18L18 6" />
                        </svg>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-1">{children}</div>
            </div>
        </div>
    );
}

/* ---------- The one component you drop in ---------- */
export default function FloatingMenu({
    directions = ["up", "left"],
    spacing = 75,
    showNav = true,
}) {
    const navigate = useNavigate();
    const [modalKey, setModalKey] = useState(null);

    const activeTab = useMemo(
        () => FORM_TABS.find((t) => t.key === modalKey),
        [modalKey]
    );

    const menuItems = useMemo(() => {
        const navItems = showNav
            ? [
                  { id: "home",    label: "Home",    icon: faHome,            onClick: () => navigate("/admin") },
                  { id: "search",  label: "Search",  icon: faMagnifyingGlass, onClick: () => console.log("search") },
                  { id: "history", label: "History", icon: faClockRotateLeft, onClick: () => navigate("/admin/history") },
                  { id: "profile", label: "Profile", icon: faUser,            onClick: () => navigate("/admin/profile") },
              ]
            : [];

        const formItems = FORM_TABS.map((tab) => ({
            id: `create-${tab.key}`,
            label: tab.label,
            icon: TAB_ICONS[tab.key] ?? faPlus,
            onClick: () => setModalKey(tab.key),
        }));

        return [...navItems, ...formItems];
    }, [navigate, showNav]);

    const ActiveForm = activeTab?.Component;

    return (
        <>
            <ExpandableMenuVertical
                directions={directions}
                spacing={spacing}
                items={menuItems}
            />

            <FormModal
                open={!!modalKey}
                onClose={() => setModalKey(null)}
                title={`Create ${activeTab?.label ?? ""}`}
            >
                {ActiveForm && (
                    <ActiveForm onSuccess={() => setModalKey(null)} />
                )}
            </FormModal>
        </>
    );
}