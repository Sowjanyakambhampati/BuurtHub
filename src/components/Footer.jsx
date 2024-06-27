import React from 'react';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';

export default function Footer() {
    return (
        <footer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-fourthcolor p-6 md:p-8 lg:p-10 text-white font-body">
            
            <div className="mt-5 p-3 md:p-0">
                <div className="text-mini">
                    <p className="font-bold mb-3">
                        <img
                            className=" mr-2 w-5 h-5"
                            alt=""
                            src="/image-1@2x.png"
                        />
                        Address
                    </p>
                    <p className="mb-1">AB Crescent 4,</p>
                    <p className="mb-1">9852 AB,</p>
                    <p className="mb-1">Amsterdam</p>
                </div>
            </div>

            <div className="p-3">
                <h3 className="font-bold mb-3">Contact Us</h3>
                <div className="flex mb-3 items-center">
                    <img
                        className="inline-block mr-2 w-5 h-5"
                        alt=""
                        src="/image-2@2x.png"
                    />
                    <span>+31 2564 8550 62</span>
                </div>
                <div className="flex mb-3 items-center">
                    <img
                        className="inline-block mr-2 w-5 h-4"
                        alt=""
                        src="/image-3@2x.png"
                    />
                    <span>info@buurthub.nl</span>
                </div>
                <div className="space-x-5">
                    <SocialIcon url="https://twitter.com" target="_blank" rel="noopener noreferrer" />
                    <SocialIcon url="https://facebook.com" target="_blank" rel="noopener noreferrer" />
                    <SocialIcon url="https://instagram.com" target="_blank" rel="noopener noreferrer" />
                    <SocialIcon url="https://youtube.com" target="_blank" rel="noopener noreferrer" />
                    <SocialIcon url="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" />
                </div>
            </div>

            <div className="md:col-span-2 lg:col-span-3 flex justify-end items-center">
                <div className="flex space-x-6">
                    <Link to="/about" className="text-white hover:text-indigo-400">About Us</Link>
                    <Link to="/signup" className="text-white hover:text-indigo-400">Sign Up</Link>
                    <Link to="/login" className="text-white hover:text-indigo-400">Log In</Link>
                    <Link to="/terms-of-service" className="text-white hover:text-indigo-400">Terms of Service</Link>
                    <Link to="/help" className="text-white hover:text-indigo-400">Help</Link>
                    <Link to="/privacy-policy" className="text-white hover:text-indigo-400">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
}
