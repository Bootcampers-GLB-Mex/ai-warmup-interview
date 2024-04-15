import Link from 'next/link';

const Navigation = () => {
  const optionsStyles =
    'text-stone-600 hover:bg-white-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer';

  return (
    <nav className="bg-teal-500">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" passHref>
                  <span className={optionsStyles}>Home</span>
                </Link>
                <Link href="/admin/addQuestion" passHref>
                  <span className={optionsStyles}>Questions</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
