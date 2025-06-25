import { useEffect } from 'react';
import Banner from './Banner';
import ContactSection from './ContactSection';
import CountupSection from './CountupSection';
import FeaturedSection from './FeaturedSection';
import WhyChooseUs from './WhyChooseUs';
import MeetOurPartners from './MeetOurPartners';

const Home = () => {
  useEffect(() => {
    document.title = 'Service || Home';
  }, []);

  return (
    <div>
      <div>
        <Banner></Banner>
      </div>
      <div>
        <FeaturedSection></FeaturedSection>
      </div>
      <div className='mt-10'><WhyChooseUs></WhyChooseUs></div>
      <div></div>
      <div>
        <CountupSection></CountupSection>
      </div>
      <div>
        <ContactSection></ContactSection>
      </div>
      <div>
        <MeetOurPartners></MeetOurPartners>
      </div>
    </div>
  );
};

export default Home;
