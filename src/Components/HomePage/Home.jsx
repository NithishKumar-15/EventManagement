import { useDispatch, useSelector } from "react-redux";
import style from "./home.module.css";
import { useEffect, useRef, useState } from "react";
import instance from "../../AxiosInstance/axiosInstance";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Home = () => {

    const [eventImg, setEventImg] = useState();

    const [id, setId] = useState();

    const homeState = useSelector((state) => state.homeReducer);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {

        if (localStorage.getItem("token") == null) {
            navigate("/");
        }

        async function getEventData() {
            const response = await instance.get("/GetEventDetails", {
                headers: {
                    'token': localStorage.getItem("token")
                }
            });

            if (response.data.message === "Success") {
                dispatch({ type: "eventData", data: response.data.data })
            } else if (response.data.message === "Unauthorized") {
                alert("Your Unauthorized");
                navigate("/");
            }
        }

        getEventData();
        setId();
    }, [])

    const eventTitle = useRef();
    const description = useRef();
    const date = useRef();
    const time = useRef();
    const location = useRef();
    const city = useRef();

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        convertToBase64(file).then((result) => {
            setEventImg(result);
        })
    }

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    async function addEvent(e) {
        e.preventDefault();
        try {
            const data = {
                eventTitle: eventTitle.current.value,
                eventDescription: description.current.value,
                eventDate: date.current.value,
                eventTime: time.current.value,
                eventLocation: location.current.value,
                eventCity: city.current.value,
                id: Math.random(),
                eventImg
            }
            const response = await instance.post("/AddEvent", data, {
                headers: {
                    'token': localStorage.getItem("token")
                }
            });

            if (response.data.message === "image added success") {
                dispatch({ type: "insertEventData", data });
                dispatch({ type: "eventList" });
            } else if (response.data.message === "Unauthorized") {
                alert("Your Unauthorized");
                navigate("/");
            }
        } catch (e) {

        }
    }

    async function makePayment(eventName) {
        const stripe = await loadStripe(`${import.meta.env.STRIPEPUBLISHIBLEKEY}`);
        // const stripe = await loadStripe("pk_test_51PdagtCQuRS8acBjQKbuE1TD60Laeod5IiUBbyS1qukgRd3gQLQCMIchOK1jqPyjNq033imP3oQogoFIae2mjZYR00wNGZ1NjE");


        const response = await instance.post("/ticketBooking", {
            eventName:eventName
        },{
            headers:{
                "token":localStorage.getItem('token')
            }
        })

        const { id } = response.data;

        const result = await stripe.redirectToCheckout({
            sessionId: id,
        });

        if (result.error) {
            console.log(result.error);
        }

    }

    return (
        <>
            <div className={`d-flex text-white justify-content-center my-5`}>
                <div className={`${style.listEvent}`} onClick={() => { setId(), dispatch({ type: "eventList" }) }}>
                    Event List
                </div>
                <div className={`ps-2 ${style.createEvent}`} onClick={() => { setId(), dispatch({ type: "createEvent" }) }}>
                    Create Event
                </div>
            </div>

            {id == null && <>
                {homeState.eventList === "yes" && <>
                    <div className={`container`}>
                        <div className="row">
                            {homeState.eventData != undefined &&
                                <>
                                    {homeState.eventData.map((val) => (
                                        <div className={`col-12 row bg-body-tertiary ${style.event} me-5 mb-3`} key={val.id} onClick={() => setId(val.id)}>
                                            <div className="col-auto p-3">
                                                <img className="border" src={val.eventImg} alt="...img" height={200} width={350}></img>
                                            </div>
                                            <div className="col p-3 my-auto">
                                                <span className="d-block fs-4">Event Title : {val.eventTitle}</span>
                                                <span className="d-block fs-4">Event Date : {val.eventDate}</span>
                                                <span className="d-block fs-4">Event Timing : {val.eventTime}</span>
                                                <span className="d-block fs-4">Event Location : {val.eventLocation}</span>
                                                <span className="d-block fs-4">Event City : {val.eventCity}</span>
                                            </div>
                                        </div>
                                    ))}

                                </>
                            }

                        </div>
                    </div>
                </>}
            </>}


            {id != null && <>
                {
                    homeState.eventData.map((val) => {
                        if (id === val.id) {
                            return <>
                                <div className={`${style.eventContent} mx-auto mt-5 border p-4`} key={val.eventTitle}>
                                    <div>
                                        <img className="border w-100" src={val.eventImg} alt="...img" height={300}></img>
                                        <span className="d-block fs-3">Event Title : {val.eventTitle}</span>
                                        <span className="d-block fs-3">Description : </span>
                                        <p>{val.eventDescription}</p>
                                        <span className="d-block fs-3">Event Timing : {val.eventTime}</span>
                                        <span className="d-block fs-3">Event Location : {val.eventLocation}</span>
                                        <span className="d-block fs-3">Event City : {val.eventCity}</span>
                                        <span className="d-block mt-5 text-end">Ticket Price :${val.eventPrice}</span>

                                        <div className="d-flex justify-content-end mt-1">
                                            <button className="btn btn-primary d-block" onClick={() => makePayment(val.eventTitle)}>Pay</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    })
                }
            </>
            }


            {homeState.createEvent === "yes" && <>
                <div className={`container`}>
                    <div className={`w-75 mx-auto`}>
                        <h2 className="text-center mb-3">Event Form</h2>
                        <form onSubmit={addEvent}>
                            <input type="text" className="form-control mb-3" placeholder="Event Title" ref={eventTitle}></input>
                            <textarea type="text" className="form-control mb-3" placeholder="Description" rows={"5"} ref={description}></textarea>

                            <input type="date" className="form-control mb-3" ref={date}></input>

                            <input type="text" className="form-control mb-3" placeholder="Time : 02:30" ref={time}></input>

                            <input type="text" className="form-control mb-3" placeholder="Location" ref={location}></input>

                            <input type="text" className="form-control mb-3" placeholder="City" ref={city}></input>

                            <input type="file" className="form-control" placeholder="upload file" accept='.jpeg, .png, .jpg' onChange={(e) => handleFileUpload(e)} aria-describedby="photoUploadMessage"></input>
                            <span id="photoUploadMessage" class="form-text d-block mb-3">Please Upload the file less than equal to 50KB</span>

                            <button className="btn btn-primary d-block mx-auto">Submit</button>

                        </form>
                    </div>
                </div>
            </>}
        </>
    )
}

export default Home;