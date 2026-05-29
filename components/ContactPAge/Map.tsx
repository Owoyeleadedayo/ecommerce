import React from 'react';
import { Card } from '../ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';

const Map = () => {
  return (
    <section className="flex flex-col gap-10 w-full px-6 py-16 md:px-12 lg:px-24">
      <div className="w-full px-20 mt-5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15853.469412297753!2d3.3254885554199256!3d6.601187599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93a9d31d7803%3A0xb8abce960c50fe64!2sOritshe%20Street!5e0!3m2!1sen!2sng!4v1715768951955!5m2!1sen!2sng"
          width="100%"
          height="500"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-md border-0"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-14 place-content-center mx-auto">
        <Card className="flex flex-col gap-3 max-w-75 px-4 border hover:border-[#B2A088] transition-all ease-in-out cursor-pointer duration-300">
          <Phone />
          <p className="text-lg font-medium">Phone</p>
          <p className="text-gray-500">+234 803 123 4567</p>
        </Card>

        <Card className="flex flex-col gap-3 max-w-75 px-4 border hover:border-[#B2A088] transition-all ease-in-out cursor-pointer">
          <Mail />
          <p className="text-lg font-medium">Email</p>
          <p className="text-gray-500">mail@example.com</p>
        </Card>

        <Card className="flex flex-col gap-3 max-w-75 px-4 border hover:border-[#B2A088] transition-all ease-in-out cursor-pointer duration-300">
          <MapPin />
          <p className="text-lg font-medium">Address</p>
          <p className="text-gray-500">123 Main Street, City, Country</p>
        </Card>
      </div>
    </section>
  );
}

export default Map;
