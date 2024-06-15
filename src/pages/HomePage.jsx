import React from 'react';
import CitySelection from '../components/CitySelection';

function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Netherlands Community Forum</h1>
      </div>
      <div className="bg-cover bg-center py-16" style={{ backgroundImage: "url('/hero-image.jpg')" }}>
        <div className="bg-white bg-opacity-75 py-8 px-4 max-w-md mx-auto rounded-lg shadow-lg">
          <CitySelection />
        </div>
      </div>
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">Why register on Community Forum?</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <section className="benefits bg-white p-6 rounded-lg shadow-md">
          <img className="w-full h-48 object-cover rounded-t-lg" src='/events.jpg' alt='events' />
          <h3 className="text-xl font-semibold mt-4">Stay Informed and Engaged with Community Events and News</h3>
          <p className="mt-2">The Community Forum app keeps you up-to-date with the latest events and news in your community. Easily sign up for upcoming community events such as block parties, clean-up days, or local fairs. Also stay informed about important news and announcements from community.</p>
        </section>

        <section className="benefits bg-white p-6 rounded-lg shadow-md">
          <img className="w-full h-48 object-cover rounded-t-lg" src='/discussion.jpg' alt='discussion' />
          <h3 className="text-xl font-semibold mt-4">Participate in Meaningful Discussions and Build Connections</h3>
          <p className="mt-2">The app provides a platform for topical discussions, allowing you to engage in conversations: Discuss a wide range of topics that matter to your community. From neighborhood safety to local businesses, share your thoughts and hear from others.</p>
        </section>

        <section className="benefits bg-white p-6 rounded-lg shadow-md">
          <img className="w-full h-48 object-cover rounded-t-lg" src='/marketplace.jpg' alt='marketplace' />
          <h3 className="text-xl font-semibold mt-4">Utilize the Marketplace for Goods and Services</h3>
          <p className="mt-2">The Community Forum app provides a convenient marketplace to buy, sell, give away items, and offer or request services, fostering recycling, savings, and local economic support.</p>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
