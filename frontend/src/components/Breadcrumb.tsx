import { Link, useLocation } from 'react-router';

export default function Breadcrumb() {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter(Boolean);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    ...pathnames.map((name, index) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      path: `/${pathnames.slice(0, index + 1).join('/')}`,
    })),
  ];

  return (
    <div className="md:mx-24">
      <nav className="my-4 ml-8 text-sm text-gray-600 md:my-6 md:ml-0">
        <ol className="flex items-center space-x-1">
          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={breadcrumb.path} className="flex items-center">
                {!isLast ? (
                  <Link
                    to={breadcrumb.path}
                    className="text-purple-dark text-lg hover:underline"
                  >
                    {breadcrumb.name}
                  </Link>
                ) : (
                  <span className="text-purple-dark text-lg font-bold">
                    {breadcrumb.name}
                  </span>
                )}

                {!isLast && <span className="mx-0.5 text-gray-400">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <hr className="hidden md:block" />
    </div>
  );
}
