import { Home, Flame, PlaySquare, History, Menu } from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
    return (
        <>
            {/* Overlay (Mobile) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full bg-black text-white z-50 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:w-60 w-60 transition-all duration-300`}
            >
                <div className="p-4 flex items-center justify-between md:hidden">
                    <h1 className="text-red-600 font-bold">YouTube</h1>
                    <Menu onClick={() => setIsOpen(false)} />
                </div>

                <nav className="flex flex-col gap-2 p-4 text-sm">
                    <SidebarItem icon={<Home size={20} />} label="Home" />
                    <SidebarItem icon={<Flame size={20} />} label="Trending" />
                    <SidebarItem icon={<PlaySquare size={20} />} label="Subscriptions" />
                    <SidebarItem icon={<History size={20} />} label="History" />
                </nav>
            </aside>
        </>
    );
};

const SidebarItem = ({ icon, label }) => {
    return (
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
            {icon}
            <span>{label}</span>
        </div>
    );
};

export default Sidebar;