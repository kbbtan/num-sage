const Navbar = () => {
  return (
    <nav className="bg-transparent mt-3">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
                <a href="#" className="text-white px-3 py-2 text-3xl font-medium">NumSage</a>

                <div className="flex flex-1 items-stretch justify-end">
                    <div className="flex space-x-4">
                        <a href="#" className="text-[#FFC435] rounded-md px-3 py-2 text-2xl font-medium" aria-current="page">Test</a>
                        <a href="#" className="text-[#393E46] hover:bg-[#393E46] hover:text-[#FFC435] rounded-md px-3 py-2 text-2xl font-medium">Learn</a>
                        <a href="#" className="text-[#393E46] hover:bg-[#393E46] hover:text-[#FFC435] rounded-md px-3 py-2 text-2xl font-medium">About</a>
                        <a href="#" className="text-[#393E46] hover:bg-[#393E46] hover:text-[#FFC435] rounded-md px-3 py-2 text-2xl font-medium">Settings</a>
                    </div>
                </div>  
            </div>
        </div>
    </nav>
  )
}

export default Navbar