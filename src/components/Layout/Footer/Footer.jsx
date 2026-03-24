const Footer = () => {
    return (
        <footer className="bg-black text-gray-400">
            <div className="max-w-6xl mx-auto px-4 py-8">

                {/* LINKS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">

                    <div>
                        <h2 className="text-white font-semibold mb-2">About</h2>
                        <p className="cursor-pointer hover:text-white">About Us</p>
                        <p className="cursor-pointer hover:text-white">Careers</p>
                        <p className="cursor-pointer hover:text-white">Press</p>
                    </div>

                    <div>
                        <h2 className="text-white font-semibold mb-2">Support</h2>
                        <p className="cursor-pointer hover:text-white">Help Center</p>
                        <p className="cursor-pointer hover:text-white">Safety</p>
                        <p className="cursor-pointer hover:text-white">Contact</p>
                    </div>

                    <div>
                        <h2 className="text-white font-semibold mb-2">Legal</h2>
                        <p className="cursor-pointer hover:text-white">Privacy</p>
                        <p className="cursor-pointer hover:text-white">Terms</p>
                    </div>

                    <div>
                        <h2 className="text-white font-semibold mb-2">Social</h2>
                        <p className="cursor-pointer hover:text-white">Instagram</p>
                        <p className="cursor-pointer hover:text-white">Twitter</p>
                    </div>

                </div>

                {/* BOTTOM */}
                <div className="mt-6 text-center text-xs text-gray-500">
                    © 2026 YouTube Clone. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;