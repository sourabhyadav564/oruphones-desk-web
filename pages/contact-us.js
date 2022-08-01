import Input from "@/components/Form/Input";
import TextArea from "@/components/Form/TextArea";
import { useState } from "react";
import { contactUs } from "api/axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { metaTags } from "@/utils/constant";

function contactUS() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [message, setMessage] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    let payload = {
      name,
      email,
      mobile,
      message,
    };
    if (
      name != "" &&
      name != undefined &&
      email != "" &&
      email != undefined &&
      message != "" &&
      message != undefined &&
      mobile != "" &&
      mobile != undefined
    ) {
      contactUs(payload).then((response) => {
        toast.info(response?.reason, {
          position: toast.POSITION.TOP_CENTER,
        });
        window.location.reload();
      });
    } else {
      if (name == undefined) {
        setName("");
      }
      if (email == undefined) {
        setEmail("");
      }
      if (message == undefined) {
        setMessage("");
      }
      if (mobile == undefined) {
        setMobile("");
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>{metaTags.CONTACT_US.title}</title>
        <meta name="description" content={metaTags.CONTACT_US.description} />
        {/* <meta property="og:url" content={window.location.href} /> */}
        <meta property="og:title" content={metaTags.CONTACT_US.title} />
        <meta
          property="og:description"
          content={metaTags.CONTACT_US.description}
        />
      </Helmet>
      <main className="container my-4">
        <section className="bg-m-green h-52 p-8 flex items-center rounded-md">
          <h1 className="text-6xl font-light text-m-grey-5"> Contact Us </h1>
        </section>
        <section className="my-6 grid grid-cols-3 gap-4 ">
          <div className="bg-white rounded p-4 border">
            <h2 className="text-black-20 font-bold my-2">Connect with us</h2>
            {/* <span className="text-black-60">Give us a call</span>
          <p className="text-xl text-black-20 mb-4"> +91 999 123 1234 </p> */}
            <span className="text-black-60">Send us an email</span>
            <p className="text-xl text-black-20 mb-4">contact@oruphones.com</p>
          </div>
          <div className="col-span-2 bg-white rounded border grid grid-cols-2 gap-6 px-8 pt-12 pb-6">
            <div className="flex flex-col">
              <Input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              >
                {" "}
                Name{" "}
              </Input>
              {name == "" && (
                <p className="text-sm whitespace-nowrap cursor-pointer text-red">
                  Please select this field
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <Input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              >
                {" "}
                Email ID{" "}
              </Input>
              {email == "" && (
                <p className="text-sm whitespace-nowrap cursor-pointer text-red">
                  Please select this field
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <Input
                type="number"
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
              >
                {" "}
                Mobile No{" "}
              </Input>
              {mobile == "" && (
                <p className="text-sm whitespace-nowrap cursor-pointer text-red">
                  Please select this field
                </p>
              )}
            </div>
            <span />
            <div className="col-span-2 flex flex-col">
              <TextArea
                type="text"
                name="message"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              >
                Message
              </TextArea>
              {message == "" && (
                <p className="text-sm whitespace-nowrap cursor-pointer text-red">
                  Please select this field
                </p>
              )}
            </div>
            <div className="col-span-2 flex justify-end" onClick={handleSubmit}>
              <button className="bg-m-green w-52 px-4 py-2 rounded text-white">
                {" "}
                Submit{" "}
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default contactUS;

{
  /* <Input
                id="inputName"
                inputClass={"w-full"}
                defaultValue={userInfo?.userdetails?.userName || ""}
                placeholder="Enter seller name ex: Ram, Mega Traders etc"
                onChange={(e) => {
                  setName(e.target.value);
                  setNameValueRequired("");
                }}
                type="text"
                maxLength="30"
                errorClass={`border ${nameValueRequired}`}
              >
                Name
              </Input> */
}
