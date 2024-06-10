import React from 'react'
import CitySelection from '../components/CitySelection'

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Netherlands Community Forum</h1>
      <div>
        <CitySelection />
      </div>
      <div>
        <h1> Why register on Community Forum ?</h1>
      </div>
      <div classname = 'all-benefits'>
        <section className='benefits'>
        <img className="tile" src = '/events.jpg' alt = 'events' />
        <h3>Stay Informed and Engaged with Community Events and News</h3>
        <p>The Community Forum app keeps you up-to-date with the latest events and news in your community. Easily sign up for upcoming community events such as block parties, clean-up days, or local fairs. Also stay informed about important news and announcements from community </p>
        </section>

        <section className='benefits'>
        <img className="tile" src = '/discussion.jpg' alt = 'discussion' />
          <h3> Participate in Meaningful Discussions and Build Connections</h3>
          <p>The app provides a platform for topical discussions, allowing you to engage in Conversations: Discuss a wide range of topics that matter to your community. From neighborhood safety to local businesses, share your thoughts and hear from others.</p>
        </section>

        <section className='benefits'>
        <img className="tile" src = '/discussion.jpg' alt = 'discussion' />
      <h3>Utilize the Marketplace for Goods and Services</h3>
      <p>The Community Forum app provides a convenient marketplace to buy, sell, give away items, and offer or request services, fostering recycling, savings, and local economic support.</p>
        </section>
      </div>
    </div>
  )
}

export default HomePage
