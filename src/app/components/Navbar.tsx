const Navbar = () => {
  return (
    <nav className="h-[13vh] bg-transparent pt-3">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <a
            href="#"
            className="px-3 py-2 text-3xl font-medium text-text-accent"
          >
            NumSage
          </a>

          <div className="flex flex-1 items-stretch justify-end">
            <div className="flex space-x-4">
              <a
                href="#"
                className="rounded-md px-3 py-2 text-2xl font-medium text-sub-color hover:bg-sub-color hover:text-accent"
              >
                Learn
              </a>
              <a
                href="#"
                className="rounded-md px-3 py-2 text-2xl font-medium text-sub-color hover:bg-sub-color hover:text-accent"
              >
                About
              </a>
              <a
                href="#"
                className="rounded-md px-3 py-2 text-2xl font-medium text-sub-color hover:bg-sub-color hover:text-accent"
              >
                Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
