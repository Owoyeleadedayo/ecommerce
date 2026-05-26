import Banner from '@/components/AboutPage/Banner';
import Quality from '@/components/AboutPage/Quality';
import SecBanner from '@/components/AboutPage/SecBanner';
import Unbreakable from '@/components/AboutPage/Unbreakable';
import PageHeader from '@/components/PageHeader';
import React from 'react';

const About = () => {
  return (
    <>
      <div className="flex flex-col w-full ">
        <PageHeader pageName="About" />
        <Quality />
        <Banner />
        <SecBanner />
        <Unbreakable />
      </div>
    </>
  );
}

export default About;
