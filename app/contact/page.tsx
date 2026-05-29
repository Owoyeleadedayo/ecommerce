import Form from '@/components/ContactPAge/Form';
import Map from '@/components/ContactPAge/Map';
import PageHeader from '@/components/PageHeader';

const Contact = () => {
  return (
    <>
      <div className="flex flex-col w-full">
        <PageHeader pageName='Contact Us' />
        <Map />
        <Form />
      </div>
    </>
  );
}

export default Contact;
