import PageHeader from '@/components/PageHeader';
import Market from '@/components/ServicesPage/Market';
import Solutions from '@/components/ServicesPage/Solutions';
import Sponsors from '@/components/Sponsors';
import React from 'react';

const Services = () => {
  return (
    <>
      <div className="flex flex-col w-full ">
        <PageHeader pageName='Services' />
        <Market />
        <Solutions />
        <Sponsors />
      </div>
    </>
  );
}

export default Services;
