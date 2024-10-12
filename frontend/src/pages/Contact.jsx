import { assets } from "../assets/frontend_assets/assets";
import { Title } from "../components/Title";
import { NewsletterBox } from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t border-borderPurple">
        <Title text1={"Contact"} text2={"Us"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-20">
        <img
          src={assets.contact_img}
          alt="contact"
          className="w-full md:max-w-[480px]"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-customeDarkPurple">
            Our Store
          </p>
          <p className="text-customeNormPurple">
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>
          <p className="text-customeNormPurple">
            <span className="text-customeDarkPurple font-semibold">Tel:</span>{" "}
            +1-212-456-7890 <br />
            <span className="text-customeDarkPurple font-semibold">
              Email:
            </span>{" "}
            contact@hampet.com
          </p>
          <p className="text-customeNormPurple">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-borderPurple text-customeDarkPurple px-8 py-4 text-sm hover:bg-customeNormPurple hover:text-white transition-all duration-300">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Contact;
