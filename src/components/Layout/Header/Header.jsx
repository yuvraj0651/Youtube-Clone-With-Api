import { Menu, Search, Bell, Mic, User } from "lucide-react";
import { Link } from "react-router";

const Header = ({ searchTerm, setSearchTerm }) => {
    return (
        <header className="w-full bg-black text-white fixed top-0 left-0 z-50">
            <div className="flex items-center justify-between px-4 py-2">

                {/* LEFT */}
                <Link to="/home">
                    <div className="flex items-center gap-3 relative z-50">
                        <Menu className="cursor-pointer" />
                        <h1 className="text-xl font-bold text-red-600">YouTube</h1>
                    </div>
                </Link>

                {/* CENTER */}
                <div className="hidden md:flex items-center w-[60%]">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        className="w-full px-3 py-1 bg-gray-900 border border-gray-700 rounded-l-md focus:outline-none"
                    />
                    <button className="px-4 py-[0.43rem] bg-gray-800 border border-gray-700 rounded-r-md">
                        <Search size={18} />
                    </button>
                    <Mic className="ml-3 cursor-pointer" />
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">
                    <Search className="md:hidden cursor-pointer" />
                    <Bell className="cursor-pointer" />
                    <User className="cursor-pointer" />
                </div>
            </div>
        </header>
    );
};

export default Header;