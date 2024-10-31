import { ContactsForm } from "./ContactsForm";

export const Contacts = ({ content }: { content: any }) => {
  return (
    <section
      id="contacts"
      className="bg-radial-gradient relative flex h-[680px]"
    >
      <div className="flex w-full flex-col items-center text-center">
        <h2 className="header_h3 mt-12">Got a question?</h2>
        <p className="pt-1 text-sm font-light leading-none text-dark_grey">
          Drop us a line and we&apos;ll get back to you as soon as possible
        </p>
        <p className="mb-3 pt-1 text-sm font-light text-dark_grey sm:mb-5">
          We&apos;re here to help!
        </p>
        <div className="h-96 w-[440px] rounded-3xl border-[3px] border-dashed border-medium_grey bg-white pb-4 pt-2 sm:w-[380px]">
          <ContactsForm />
        </div>
      </div>
    </section>
  );
};
