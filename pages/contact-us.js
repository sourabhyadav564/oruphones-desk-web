import Input from "@/components/Form/Input";
import TextArea from "@/components/Form/TextArea";

function contactUS() {
  return (
    <main className="container my-4">
      <section className="bg-m-green-dark h-52 p-8 flex items-center rounded-md">
        <h1 className="text-6xl font-light text-m-grey-5"> Contact Us </h1>
      </section>
      <section className="my-6 grid grid-cols-3 gap-4 ">
        <div className="bg-white rounded p-4 border">
          <h2 className="text-black-20 font-bold my-2">Connect with us</h2>
          <span className="text-black-60">Give us a call</span>
          <p className="text-xl text-black-20 mb-4"> +91 999 123 1234 </p>
          <span className="text-black-60">Send us an email</span>
          <p className="text-xl text-black-20 mb-4">contact@oruphones.com</p>
        </div>
        <div className="col-span-2 bg-white rounded border grid grid-cols-2 gap-6 px-8 pt-12 pb-6">
          <Input> Name </Input>
          <Input> Email ID </Input>
          <Input> Mobile No </Input>
          <span />
          <div className="col-span-2">
            <TextArea type="text" name="message">
              Message
            </TextArea>
          </div>
          <div className="col-span-2 flex justify-end">
            <button className="bg-m-green w-52 px-4 py-2 rounded text-white">
              {" "}
              Submit{" "}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default contactUS;
