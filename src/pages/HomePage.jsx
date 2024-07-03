import React from 'react';
import CitySelection from '../components/CitySelection';

function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to BuurtHub!</h1>
      </div>
      <div className="bg-cover bg-center py-16" style={{ backgroundImage: "url('/hero-image.jpg')" }}>
        <div className="bg-white bg-opacity-75 py-8 px-4 max-w-md mx-auto rounded-lg shadow-lg">
          <CitySelection />
        </div>
      </div>
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">Why register on BuurtHub?</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <section className="benefits bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <img className="w-full h-48 object-cover rounded-t-lg" src='/events.jpg' alt='events' />
          <h3 className="text-xl font-semibold mt-4">Stay Informed and Engaged with Community Events and News</h3>
          <p className="mt-2"><b>BuurtHub</b> keeps you up-to-date with the latest events and news in your community. Easily sign up for upcoming community events such as block parties, clean-up days, or local fairs. Also stay informed about important news and announcements from community.</p>
        </section>
        <section className="benefits bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <img className="w-full h-48 object-cover rounded-t-lg" src='/discussion.jpg' alt='discussion' />
          <h3 className="text-xl font-semibold mt-4">Participate in Meaningful Discussions and Build Connections</h3>
          <p className="mt-2"><b>BuurtHub</b> provides a platform for topical discussions, allowing you to engage in conversations: Discuss a wide range of topics that matter to your community. From neighborhood safety to local businesses, share your thoughts and hear from others.</p>
        </section>
        <section className="benefits bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <img className="w-full h-48 object-cover rounded-t-lg" src='/marketplace.jpg' alt='marketplace' />
          <h3 className="text-xl font-semibold mt-4">Utilize the Marketplace for Goods and Services</h3>
          <p className="mt-2"><b>BuurtHub</b> provides a convenient marketplace to buy, sell, give away items, and offer or request services, fostering recycling, savings, and local economic support.</p>
        </section>
      </div>
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">How BuurtHub Works</h1>
      </div>
      <div className="flex flex-col md:flex-row items-center px-4">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img src="/How_it_works.gif" alt="How it works" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2 flex flex-col space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-left">1. Create an Account</h3>
            <p className="mb-4">To get started, simply sign up for an account using your email address. Once registered, you can create a profile, add your location, and start interacting with your neighbors.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-left">2. Browse and Post Products</h3>
            <p className="mb-4">Explore a wide range of products listed by your neighbors. You can browse different categories, search for specific items, and contact sellers directly. If you have items you no longer need, you can easily list them for sale or give them away to others in your community.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-left">3. Reserve and Pick Up Items</h3>
            <p className="mb-4">See something you like? Reserve the item and arrange a pick-up time with the seller. BuurtHub makes it easy to coordinate with your neighbors and ensure a smooth exchange process.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-left">4. Join and Create Events</h3>
            <p className="mb-4">Stay updated with local events and activities. Whether it's a neighborhood cleanup, a community garage sale, or a social gathering, you can find events that interest you. Feel free to create your own events and invite your neighbors to join.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-left">5. Share Posts and Announcements</h3>
            <p>Use the platform to share important announcements, news, or requests with your community. Whether you’re looking for a recommendation or offering help, BuurtHub’s posting feature keeps everyone connected and informed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
