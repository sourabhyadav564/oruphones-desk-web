import Input from '@/components/Form/Input';
import MySelect from '@/components/Form/Select';
import Select from '@/components/Form/Select';
import React, { Fragment, useEffect, useState } from 'react';
import * as Axios from "../api/axios";
import Cookies from "js-cookie"
import { toast } from "react-toastify";
import { useRouter } from 'next/router';
import ReportIssuePopup from "@/components/Popup/ReportIssuePopup";
import 'react-toastify/dist/ReactToastify.css';

function Report_a_problem() {
    const router = useRouter();
    const [make, setMake] = useState(null);
    const [makeOptions, setMakeOptions] = useState([]);
    const [marketingName, setmarketingName] = useState(null);
    const [modelOptions, setModelOptions] = useState([]);
    const [storage, setStorage] = useState(null);
    const [colorAndStorageOption, setColorAndStorageOption] = useState([]);
    const [issue, setIssue] = useState(null);
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [callTime, setCallTime] = useState("");
    const [reportData, setReportData] = useState(null);
    const [check, setCheck] = useState(false);
    const [description, setDescription] = useState('');
    const [ScheduleCall, setScheduleCall] = useState(false);
    const [required, setRequired] = useState(false);
    const [openReportIssuePopup, setOpenReportIssuePopup] = useState(false);


    useEffect(() => {
        const interval = setInterval(() => {
            Axios.getUserProfile(
                "91",
                Cookies.get("mobileNumber")
            ).then((response) => {
                console.log("response : ", response?.dataObject?.userdetails);
                setName(response?.dataObject?.userdetails?.userName);
                setEmail(response?.dataObject?.userdetails?.email);
                setPhone(response?.dataObject?.userdetails?.mobileNumber)
            });
            clearInterval(interval);
        }, 0);
    }, [])

    useEffect(async () => {
        if(make){
        const models = await Axios.fetchModelList(
            Cookies.get("userUniqueId"),
            Cookies.get("sessionId"),
            make,
            ""
        );
        if (models?.dataObject[0]?.models) {
            const sortedModels = models.dataObject[0].models.sort((a, b) => {
                return a.marketingname.localeCompare(b.marketingname);
            });
            setModelOptions(sortedModels);
        }
    }
    }, [make])


    // useEffect(async () => {
    //     const data = await Axios.fetchModelList(
    //         Cookies.get("userUniqueId") || "Guest",
    //         Cookies.get("sessionId") != undefined
    //             ? Cookies.get("sessionId")
    //             : localStorage.getItem("sessionId") || "",
    //         "",
    //         ""
    //     );
    //     let makeModelLists = data?.dataObject;
    //     if (makeModelLists) {
    //         makeModelLists.sort((a, b) => {
    //             return a.make.localeCompare(b.make);
    //         });
    //         setMakeOptions(makeModelLists);
    //     }
    // }, []);


    useEffect(() => {
        modelOptions?.map((item) => {
            if (item["marketingname"] == marketingName) {
                setColorAndStorageOption(item);
            }
        });
    }, [marketingName]);

    const issueTypeOption = [
        "Verification Issue",
        "Listing Issue",
        "Service Issue",
        "Funcationality Issue",
        "Other",
    ]

    const validateEmail = (email) => {
        if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
            setEmail(email);
            return true;
        } else {
            toast.warning(`Please enter valid email address`,  { toastId: "021", 
                position: toast.POSITION.TOP_CENTER,
              });
            return false;
        }
    };

    const handleSubmit = () => {
        if (
            Name  &&
            Email  &&
            Phone  &&
            issue  &&
            marketingName  &&
            description  &&
            storage 
        ) {
            if (validateEmail(Email)) {
                Axios.ReportIssue(Name, Email, Phone, issue, marketingName, description, storage, ScheduleCall, callTime, Cookies.get("sessionId")).then((res) => {
                    setReportData(res);
                    // toast.warning("You reported successfully!!");
                    // router.back()
                    setMake(null)
                    setmarketingName(null)
                    setStorage(null)
                    setName("")
                    setEmail("")
                    setPhone("")
                    setCallTime("")
                    setCheck(false);
                    setDescription('')
                    setScheduleCall(false);
                    setOpenReportIssuePopup(true);
                }).catch((err) => {
                    toast.error("Please fill all the fields in the report.",{ toastId: "020" , 
                        position: toast.POSITION.TOP_CENTER,
                      });
                })
            }
        }
        else {
            toast.warning(`Please enter valid details`, { toastId: "017" , 
                position: toast.POSITION.TOP_CENTER,
              });
        }
    }

    const requiredFields = () => {
        if (!required) {
            toast.warning("Please fill Issue Type.",{toastId:"019", 
                position: toast.POSITION.TOP_CENTER,
              });
        }
    }

    return (
        <Fragment>
            <div className='container my-8' >
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4 my-4'>
                    <MySelect
                        star="*"
                        labelName="Brand"
                        required
                        value={
                            make === null
                                ? "Select..."
                                : { label: make, value: make }
                        }
                        onChange={(e) => {
                            setMake(e.value);
                        }}
                        options={makeOptions?.map((item) => {
                            return { label: item.make, value: item.make };
                        })}
                    ></MySelect>
                    <MySelect
                        value={
                            marketingName === null
                                ? "Select.."
                                : { label: marketingName, value: marketingName }
                        }
                        star="*"
                        labelName="Model"

                        onChange={(e) => {
                            setmarketingName(e.value);
                        }}
                        options={modelOptions?.map((item) => {
                            return {
                                label: item.marketingname,
                                value: item.marketingname,
                            };
                        })}
                    ></MySelect>
                </div>

                <div className='grid md:grid-cols-2 grid-cols-1 gap-4 my-4' >
                    <MySelect
                        value={
                            storage === null
                                ? "Select.."
                                : { label: storage, value: storage }
                        }
                        star="*"
                        labelName="Storage"
                        onChange={(e) => {
                            setStorage(e.value);
                        }}
                        options={colorAndStorageOption?.storage?.map((item) => {
                            return { label: item, value: item };
                        })}
                    ></MySelect>
                    <MySelect
                        value={
                            issue === null
                                ? "Select.."
                                : { label: issue, value: issue }
                        }
                        star="*"
                        // onfocus={requiredFields}
                        labelName="Issue Type"
                        onChange={(e) => {
                            setIssue(e.value);
                            setRequired(true)
                        }}
                        options={issueTypeOption?.map((item) => {
                            return { label: item, value: item };
                        })}
                    ></MySelect>

                </div>

                <div className='grid md:grid-cols-2 grid-cols-1 gap-4 my-4'>
                    <Input
                        type="text"
                        placeholder="Issue Description"
                        name="username"
                        minLength="30"
                        maxLength="500"
                        lableclass={"bg-white"}
                        borderclass={"border-[#00000130] opacity-90"}
                        inputClass={"py-3"}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        required
                    >
                        Issue Description<span className='text-red opacity-60'>*</span>
                    </Input>

                    <Input
                        type="email"
                        placeholder="Enter an Email"
                        name="Email"
                        lableclass={"bg-white"}
                        defaultValue={Email}
                        inputClass={"py-3"}
                        borderclass={"border-[#00000130] opacity-90"}

                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required
                    >
                        Email<span className='text-red opacity-60'>*</span>
                    </Input>
                </div>

                <div className='grid md:grid-cols-2 grid-cols-1 my-4 gap-4'>
                    <Input
                        type="text"
                        maxLength={10}
                        pattern="[0-9]*"
                        prefix="+91-"
                        placeholder="Enter Your Phone Number"
                        name="Phone"
                        lableclass={"bg-white"}
                        defaultValue={Phone}
                        borderclass={"border-[#00000130] opacity-90"}
                        inputClass={"py-3"}
                        required
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    >
                        Phone<span className='text-red opacity-60'>*</span>
                    </Input>

                    <Input
                        type="text"
                        placeholder="Enter Your Name"
                        name="Name"
                        minLength="3"
                        lableclass={"bg-white "}
                        defaultValue={Name}
                        borderclass={"border-[#00000130] opacity-90"}
                        inputClass={"py-3"}
                        required
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    >
                        Name<span className='text-red opacity-60'>*</span>
                    </Input>

                </div>

                <div className='my-4'>
                    <div className='my-4'>
                    </div>
                    <div className='my-4'>
                    </div>
                    <label>
                        <div className='py-4 flex items-center gap-2'>
                            <input type="checkbox" className="appearance-none checked:bg-m-green  focus:ring-0 " value={ScheduleCall} onChange={(e) => {
                                if (e.target.checked) {

                                    setCheck(true);
                                    setScheduleCall(!ScheduleCall);
                                } else {
                                    setCheck(false);
                                }

                            }} />

                            <p>Schedule a call back</p>
                        </div>
                    </label>
                    {!check ? "" :
                        <form className='gap-2'><div className='items-center'> <label> <input type="radio" className='checked:bg-m-green border  focus:ring-0 ' value={" 09:00AM-12:00PM"}
                            name="time" onChange={(e) => {
                                if (e.target.checked) {
                                    setCallTime(e.target.value);
                                }

                            }} /> 09:00AM-12:00PM </label></div>
                            <br />
                            <div className='items-center'><label> <input type="radio" name="time" className='checked:bg-m-green  focus:ring-0 ' value={"12:00PM-03:00PM"} onChange={(e) => {
                                if (e.target.checked) {
                                    setCallTime(e.target.value);
                                }

                            }} /> 12:00PM-03:00PM </label></div>
                            <br />
                            <div className='items-center'><label> <input type="radio" name="time" className='checked:bg-m-green  focus:ring-0 ' value={" 03:00PM-06:00PM "} onChange={(e) => {
                                if (e.target.checked) {
                                    setCallTime(e.target.value);
                                }

                            }} /> 03:00PM-06:00PM </label></div>
                            <br />
                            <div className='items-center'><label> <input type="radio" name="time" className='checked:bg-m-green  focus:ring-0 ' value={"06:00PM-09:00PM"} onChange={(e) => {
                                if (e.target.checked) {
                                    setCallTime(e.target.value);
                                }

                            }} /> 06:00PM-09:00PM </label> </div></form>}
                </div>
                <div className='flex justify-center'>
                    <button className='border w-4/12  py-1 rounded-full font-Roboto-Semibold text-white bg-m-green' onClick={() => { handleSubmit() }}>Submit</button>
                </div>
            </div>
            <ReportIssuePopup open={openReportIssuePopup} setOpen={setOpenReportIssuePopup} />
        </Fragment>
    )
}

export default Report_a_problem;