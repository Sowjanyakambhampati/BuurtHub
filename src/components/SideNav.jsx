import { NavLink } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import { AiOutlineProduct } from "react-icons/ai";
import { MdEvent } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";
import { IoChatbubbles } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

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
                        <BiHome className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:text-brand-600 group-active:text-brand-600" />
                        <span>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/all-products"
                        className="flex items-center gap-3 text-gray-600 text-lg font-medium p-3 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 hover:rounded-md active:text-gray-800 active:bg-gray-50 active:rounded-md"
                        activeclassname="text-gray-800 bg-gray-50 rounded-md"
                    >
                        <AiOutlineProduct className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:text-brand-600 group-active:text-brand-600" />
                        <span>Products</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/all-events"
                        className="flex items-center gap-3 text-gray-600 text-lg font-medium p-3 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 hover:rounded-md active:text-gray-800 active:bg-gray-50 active:rounded-md"
                        activeclassname="text-gray-800 bg-gray-50 rounded-md"
                    >
                        <MdEvent className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:text-brand-600 group-active:text-brand-600" />
                        <span>Events</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/topic"
                        className="flex items-center gap-3 text-gray-600 text-lg font-medium p-3 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 hover:rounded-md active:text-gray-800 active:bg-gray-50 active:rounded-md"
                        activeclassname="text-gray-800 bg-gray-50 rounded-md"
                    >
                        <IoChatbubbles className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:text-brand-600 group-active:text-brand-600" />
                        <span>Topics</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/posts"
                        className="flex items-center gap-3 text-gray-600 text-lg font-medium p-3 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 hover:rounded-md active:text-gray-800 active:bg-gray-50 active:rounded-md"
                        activeclassname="text-gray-800 bg-gray-50 rounded-md"
                    >
                        <IoChatboxEllipses className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:text-brand-600 group-active:text-brand-600" />
                        <span>Posts</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/manage-user"
                        className="flex items-center gap-3 text-gray-600 text-lg font-medium p-3 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 hover:rounded-md active:text-gray-800 active:bg-gray-50 active:rounded-md"
                        activeclassname="text-gray-800 bg-gray-50 rounded-md"
                    >
                        <FaUserCircle className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:text-brand-600 group-active:text-brand-600" />
                        <span>User</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default MainNav;
