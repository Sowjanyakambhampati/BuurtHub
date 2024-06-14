import { NavLink } from "react-router-dom";

function MainNav() {
    return (
        <nav>
            <ul className="flex flex-col gap-2">
                <li>
                    <NavLink
                        to="/"
                        className="flex items-center gap-3 text-gray-600 text-lg font-medium p-3 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 hover:rounded-md active:text-gray-800 active:bg-gray-50 active:rounded-md"
                        activeclassname="text-gray-800 bg-gray-50 rounded-md"
                    >
                        <span className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:text-brand-600 group-active:text-brand-600">
                            Home
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/all-products"
                        className="flex items-center gap-3 text-gray-600 text-lg font-medium p-3 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 hover:rounded-md active:text-gray-800 active:bg-gray-50 active:rounded-md"
                        activeclassname="text-gray-800 bg-gray-50 rounded-md"
                    >
                        <span className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:text-brand-600 group-active:text-brand-600">
                            Products
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/all-events"
                        className="flex items-center gap-3 text-gray-600 text-lg font-medium p-3 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 hover:rounded-md active:text-gray-800 active:bg-gray-50 active:rounded-md"
                        activeclassname="text-gray-800 bg-gray-50 rounded-md"
                    >
                        <span className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:text-brand-600 group-active:text-brand-600">
                            Events
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/topic"
                        className="flex items-center gap-3 text-gray-600 text-lg font-medium p-3 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 hover:rounded-md active:text-gray-800 active:bg-gray-50 active:rounded-md"
                        activeclassname="text-gray-800 bg-gray-50 rounded-md"
                    >
                        <span className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:text-brand-600 group-active:text-brand-600">
                            Topics
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/posts"
                        className="flex items-center gap-3 text-gray-600 text-lg font-medium p-3 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 hover:rounded-md active:text-gray-800 active:bg-gray-50 active:rounded-md"
                        activeclassname="text-gray-800 bg-gray-50 rounded-md"
                    >
                        <span className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:text-brand-600 group-active:text-brand-600">
                            Posts
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/posts"
                        className="flex items-center gap-3 text-gray-600 text-lg font-medium p-3 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 hover:rounded-md active:text-gray-800 active:bg-gray-50 active:rounded-md"
                        activeclassname="text-gray-800 bg-gray-50 rounded-md"
                    >
                        <span className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:text-brand-600 group-active:text-brand-600">
                            User
                        </span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default MainNav;
