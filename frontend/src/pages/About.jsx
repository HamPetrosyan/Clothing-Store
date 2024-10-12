import { Title } from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import { NewsletterBox } from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"About"} text2={"Us"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt="about"
          className="w-full md:max-w-[450px] md:max-h-[500px]"
        />
        <div className="flex flex-col justify-center gap-6 md:2/4 text-customeNormPurple">
          <p>
            <span className="text-customeDarkPurple underline">HAMPET</span> was
            born out of a passion for innovation and a commitment to
            revolutionizing online shopping. Our journey began with a simple
            idea: to create a platform where customers can effortlessly
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality clothing that caters to every taste and
            preference. From the latest fashion trends to timeless classics, we
            offer an extensive collection sourced from trusted brands and
            suppliers.
          </p>
          <b className="text-customeDarkPurple">Our Mission</b>
          <p>
            Our mission at HAMPET is to empower individuals to express their
            unique style through a curated collection of high-quality clothing.
            We strive to deliver an exceptional shopping experience by providing
            a diverse range of fashion-forward pieces, ensuring that every
            customer feels confident and inspired. Our commitment to quality,
            innovation, and customer satisfaction drives us to continuously
            enhance our offerings and exceed expectations.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"Why"} text2={"Choose us"} />
      </div>
      <div className="flex flex-col sm:flex-row text-sm mb-20">
        <div className="border border-borderPurple px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-customeDarkPurple">Quality Assurance: </b>
          <p className="text-customeNormPurple">
            Quality is at the heart of everything we do. We meticulously select
            and vet each product to ensure it meets our stringent quality
            standards.
          </p>
        </div>
        <div className="border border-borderPurple border-t-0 sm:border-t sm:border-l-0 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-customeDarkPurple">Convenience: </b>
          <p className="text-customeNormPurple">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="border border-borderPurple border-t-0 sm:border-t sm:border-l-0 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-customeDarkPurple">
            Exceptional Customer Service:{" "}
          </b>
          <p className="text-customeNormPurple">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
