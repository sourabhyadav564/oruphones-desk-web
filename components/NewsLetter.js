import { addsubscription } from "api/axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function NewsLetter() {

  const [email, setEmail] = useState();

  function subscribeNewsletter(e) {
    e.preventDefault();
    addsubscription(email).then((response) => {
      toast.info(response?.reason, {
        position: toast.POSITION.TOP_CENTER,
      });
      window.location.reload();
    })
  }

  return (
    <section className="bg-m-green text-white pt-16 ">
      <div className="container flex items-center md:justify-around flex-col md:flex-row ">
        <p className="font-Roboto-Semibold text-xl3FontSize text-center uppercase">Sign up for newsletter</p>
        <form className="flex max-w-md flex-1 mt-8  md:mt-0" onSubmit={subscribeNewsletter}>
          <input
            type="email"
            required
            placeholder="Enter your email address"
            className="w-full flex-1 px-4 py-3 rounded-none rounded-l-md text-black font-Roboto-Light text-regularFontSize"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn bg-m-black hover:bg-green-600 hover:text-m-white rounded-none rounded-r-md font-Roboto-Semibold text-xlFontSize">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
