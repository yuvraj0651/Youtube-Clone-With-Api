import Sidebar from '../../UI/Sidebar/Sidebar'
import VideoGrid from '../VideoGrid/VideoGrid'
import { useState } from 'react'

const HomePage = ({ searchTerm }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="bg-black min-h-screen text-white">

                <div className="flex pt-14">

                    {/* Sidebar */}
                    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

                    {/* Main Content */}
                    <main className="flex-1 p-4">
                        <VideoGrid searchTerm={searchTerm} />
                    </main>
                </div>
            </div>
        </>
    )
}

export default HomePage