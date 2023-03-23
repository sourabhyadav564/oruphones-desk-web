import Input from '@/components/Form/Input';
import MySelect from '@/components/Form/Select';
import Select from '@/components/Form/Select';
import React, { Fragment, useEffect, useState } from 'react';
import * as Axios from "../api/axios";
import Cookies from "js-cookie"
import ProductCard from '@/components/Cards/ProductCard';
import { toast } from "react-toastify";
import { useRouter } from 'next/router';


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
    const [callTime,setCallTime] = useState("");
    const [reportData, setReportData] = useState(null);
    const [check, setCheck] = useState(false);
    const [description, setDescription] = useState('');
    const [ScheduleCall, setScheduleCall] = useState(false);
    const [required, setRequired] = useState(false);
    useEffect(async () => {
        const data = await Axios.fetchModelList(
            Cookies.get("userUniqueId") || "Guest",
            Cookies.get("sessionId") != undefined
                ? Cookies.get("sessionId")
                : localStorage.getItem("sessionId") || "",
            "",
            ""
        );
        let makeModelLists = data?.dataObject;
        if (makeModelLists) {
            makeModelLists.sort((a, b) => {
                return a.make.localeCompare(b.make);
            });
            setMakeOptions(makeModelLists);
        }
    }, []);

    const setSearchModelList = async (e) => {
        const models = await Axios.fetchModelList(
            Cookies.get("userUniqueId"),
            Cookies.get("sessionId"),
            make,
            e
        );
        if (models?.dataObject[0]?.models) {
            const sortedModels = models.dataObject[0].models.sort((a, b) => {
                return a.marketingname.localeCompare(b.marketingname);
            });
            setModelOptions(sortedModels);
        }
    };


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

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: Name,
            email: Email,
            phone: Phone,
            issueType: issue,
            modelName: make,
            description: description ,
            storage: storage,
            callTime:callTime,
            ScheduleCall:ScheduleCall
        }   

        setErrormsg(true)
        Axios.ReportIssue(Name, Email, Phone, issue, make, description, storage,ScheduleCall,callTime).then((res) => {
            setReportData(res);
            toast.warning("You reported successfully!!");
            router.back()
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

        }).catch((err)=>{
            toast.error("Please fill all the fields in the report.");
        })
    }

    const requiredFields = ()=>{
        if(!required){
            toast.warning("Please fill Issue Type. ");
        }
    }


    return (
        <Fragment>
            <form className='container my-8' onSubmit={handleSubmit}>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4 my-4'>
                    <MySelect
                        // star="*"
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
                        // star="*"
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
                        onInputChange={(e) => {
                            setSearchModelList(e);
                        }}
                    ></MySelect>
                </div>

                <div className='grid md:grid-cols-2 grid-cols-1 gap-4 my-4' >
                    <MySelect
                        value={
                            storage === null
                                ? "Select.."
                                : { label: storage, value: storage }
                        }
                        // star="*"
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
                        onfocus={requiredFields}
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
                        borderclass={"border-[#00000020] opacity-90"}
                        inputClass={"py-3"}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    >
                        Issue Description
                    </Input>

                    <Input
                        type="email"
                        placeholder="Enter an Email"
                        name="Email"
                        lableclass={"bg-white"}
                        inputClass={"py-3"}
                        borderclass={"border-[#00000020] opacity-90"}
                       
                         onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required
                    >
                        Email<span className='text-red'>*</span>
                    </Input>
                </div>

                <div className='grid md:grid-cols-2 grid-cols-1 my-4 gap-4'>
                    <Input
                        type="number"
                        placeholder="Enter Your Phone Number"
                        name="Phone"
                        lableclass={"bg-white"}
                        borderclass={"border-[#00000020] opacity-90"}
                        inputClass={"py-3"}
                        required
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    >
                        Phone<span className='text-red'>*</span>
                    </Input>

                    <Input
                        type="text"
                        placeholder="Enter Your Name"
                        name="Name"
                        lableclass={"bg-white "}
                        borderclass={"border-[#00000020] opacity-90"}
                        inputClass={"py-3"}
                        required
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    >
                        Name<span className='text-red'>*</span>
                    </Input>

                </div>

                <div className='my-4'>
                    <div className='my-4'>
                    </div>
                    <div className='my-4'>
                    </div>
                    <label>
                        <div className='py-4 flex items-center gap-2' >
                            <input type="checkbox" className="appearance-none checked:bg-m-green  focus:ring-0 "  value={ScheduleCall}  onChange={(e)=>{
                                if(e.target.checked){
                                    console.log("checked"); 
                                    setCheck(!check);
                                    setScheduleCall(!ScheduleCall);
                                } else{
                                    console.log("uncheckedchecked");
                                }
                                
                                console.log("data::",ScheduleCall);
                            }}/>
                            {/* {console.log("Schedule time : ", !ScheduleCall)} */}
                            <p>Schedule a call back</p>
                        </div>
                    </label>
                    {!check ? "" : 
                        <form className='gap-2'><div className='items-center'> <label> <input type="radio" className='checked:bg-m-green border  focus:ring-0 ' value={" 09:00AM-12:00PM"}
                        name="time" onChange={(e) => {
                            if(e.target.checked){
                                setCallTime(e.target.value);
                                 console.log("calltime",callTime);
                            }

                    }}/> 09:00AM-12:00PM </label></div>
                            <br />
                            <div className='items-center'><label> <input type="radio" name="time" className='checked:bg-m-green  focus:ring-0 ' value={"12:00PM-03:00PM"} onChange={(e) => {
                                if(e.target.checked){
                                    setCallTime(e.target.value);
                                     console.log("calltime",callTime);
                                }

                        }}/> 12:00PM-03:00PM </label></div>
                            <br />
                            <div className='items-center'><label> <input type="radio" name="time" className='checked:bg-m-green  focus:ring-0 ' value={" 03:00PM-06:00PM "} onChange={(e) => {
                                if(e.target.checked){
                                    setCallTime(e.target.value);
                                     console.log("calltime",callTime);
                                }

                        }}/> 03:00PM-06:00PM </label></div>
                            <br />
                            <div className='items-center'><label> <input type="radio" name="time" className='checked:bg-m-green  focus:ring-0 ' value={"06:00PM-09:00PM"} onChange={(e) => {
                                if(e.target.checked){
                                    setCallTime(e.target.value);
                                    console.log("calltime",callTime);
                                }

                        }}/> 06:00PM-09:00PM </label> </div></form>}
                </div>
                <button className='border w-full py-1 rounded-full font-Roboto-Semibold text-white bg-m-green' onClick={requiredFields}>Submit</button>

            </form>
        </Fragment>
    )
}

export default Report_a_problem;