import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">About BuurtHub</h1>
      
      <p className="text-lg text-gray-800 mb-6">
        Welcome to BuurtHub, your go-to community forum designed to bring neighborhoods together across various cities in the Netherlands. At BuurtHub, we aim to foster stronger, more connected communities by providing a platform where residents can engage, share, and support one another. Whether you are looking to stay updated on local events, engage in meaningful discussions, or trade goods and services, BuurtHub is here to make your neighborhood a better place.
      </p>
      
      <h2 className="text-3xl font-semibold mb-4 text-indigo-500">What We Offer</h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-semibold text-indigo-400">Community Events and News Updates</h3>
          <p className="text-gray-700">
            BuurtHub allows community administrators to post upcoming events and news updates. From local festivals and neighborhood meetings to important community announcements, stay informed and never miss out on what's happening around you. Sign up for events and participate in making your community vibrant and lively.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-indigo-400">Topical Community Discussions</h3>
          <p className="text-gray-700">
            Join discussions on a wide range of topics that matter to you and your neighbors. Whether it's about local issues, hobbies, or shared interests, BuurtHub provides a space for meaningful conversations. Engage with fellow community members, share your thoughts, and build lasting connections.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-indigo-400">Buy, Sell, and Give Away Products</h3>
          <p className="text-gray-700">
            Have items you no longer need? Post products you want to sell or give away on BuurtHub. Your neighbors can browse and reserve items, making it easy to declutter and find new homes for your belongings. It's a simple and effective way to recycle within the community.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-indigo-400">Offer and Request Services</h3>
          <p className="text-gray-700">
            If you have a skill or service to offer, BuurtHub is the perfect place to let your neighbors know. From tutoring and handyman services to pet sitting and beyond, post your services and connect with those in need. Likewise, if you're looking for help, browse through available services and make requests easily.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-semibold mt-8 mb-4 text-indigo-500">Our Reach</h2>
      <p className="text-gray-700 mb-6">
        BuurtHub is currently available in the following cities:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>Amsterdam</li>
        <li>Groningen</li>
        <li>Nijmegen</li>
        <li>Hoofddorp</li>
        <li>Utrecht</li>
        <li>Haarlem</li>
        <li>Leiden</li>
        <li>Eindhoven</li>
        <li>Den Haag</li>
        <li>Zwolle</li>
        <li>Rotterdam</li>
      </ul>

      <h2 className="text-3xl font-semibold mb-4 text-indigo-500">How It Works</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-semibold text-indigo-400">Sign Up and Get Started</h3>
          <p className="text-gray-700">
            Create your BuurtHub account with a few simple steps. Once registered, you can access your city's community page and start exploring.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-indigo-400">Browse and Participate</h3>
          <p className="text-gray-700">
            Navigate through various sections of the forum, including events, discussions, products, and services. Participate by commenting on posts, reserving items, or requesting services.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-indigo-400">Stay Updated</h3>
          <p className="text-gray-700">
            Keep an eye on the latest updates and notifications to stay informed about new events, discussions, and posts in your community.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-indigo-400">Connect and Grow</h3>
          <p className="text-gray-700">
            Engage with your neighbors, make new friends, and strengthen your community bonds through active participation on BuurtHub.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-lg text-gray-800 mb-4">
          Join BuurtHub today and be a part of a thriving community that works together to make your neighborhood a better place to live. Together, we can create a more connected and supportive environment for everyone.
        </p>
        <p className="text-lg text-gray-800">
          If you need any more information or have any questions, feel free to contact us. Welcome to BuurtHub -where your community comes together!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
