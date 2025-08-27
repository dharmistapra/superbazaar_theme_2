import React from 'react'

const Accordian = () => {
    return (
        <div>
            <div className="text-uppercase mb-4 bg-rose-100 p-3 text-xs">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center text-sm font-medium uppercase">
                        <a href="/" title="Back to the home page" className="text-gray-600 hover:text-gray-800 transition-colors">
                            Home
                        </a>
                        <span className="mx-2 text-gray-400">|</span>
                        <span className="text-gray-800">New Arrivals</span>
                    </nav>
                </div>
            </div>

        </div>
    )
}

export default Accordian
