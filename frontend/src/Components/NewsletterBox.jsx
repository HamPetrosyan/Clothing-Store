import { toast } from "react-toastify";

export const NewsletterBox = () => {
  const notify = () => toast.success("Subscribed successfully!");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    notify();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-customeDarkPurple">
        Subscribe now &amp; get 20&#37; off
      </p>
      <p className="text-customeNormPurple mt-3">
        Join us for exclusive deals, updates and more.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="lg:w-1/2 md:w-full flex items-center gap-3 mx-auto my-6 border border-borderPurple pl-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 placeholder:text-bgPurple"
          required
        />
        <button
          type="submit"
          className="uppercase text-white bg-customeDarkPurple text-xs px-10 py-4"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};
