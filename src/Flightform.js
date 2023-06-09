import React, { useEffect, useState } from 'react'

const Flightform = (props) => {
    const [form, setform] = useState({ from: '', to: "", date: '', passanger: "" })
    const [data, setdata] = useState([])
    const onchange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const disable = () => {
        let dd, mm, yyyy;
        let today = new Date();
        dd = today.getDate();
        mm = today.getMonth() + 1;
        yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        return yyyy + '-' + mm + '-' + dd;

    }
    const onclick = async () => {
        props.progress(30)
        const response = await fetch('https://flightprices-vt58.onrender.com/api/auth/prices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('price')
            },
            body: JSON.stringify({
                source: form.from,
                destination: form.to,
                date: form.date
            })
        })
        props.progress(60)
        try {
            const data = await response.json();
            if (data.error) {
                alert(data.error);
                return
            }
            props.progress(80)
            console.log(data)
            setdata(data)

        } catch (error) {
            props.progress(100);
            alert('Some Internal Error Occurs')
            console.log(error)

        }
        props.progress(100);



    }

    return (
        <>
            {/* //form to enter the to from and date to show the flights */}
            {localStorage.getItem('price') && <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className='position-sticky sticky-top' style={{
                            top: '20px'
                        }}>
                            <h1 style={{
                                textAlign: "center",
                                marginTop: "20px",
                                fontFamily: " 'Kanit', sans-serif"
                            }} >ENTER DETAILS</h1>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control border border-dark bg-light" id="floatingfrom" name='from' value={form.from} onChange={onchange} placeholder="source" required minLength={3} />
                                <label for="floatingInput">From</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" name='to' value={form.to} onChange={onchange} className="form-control border border-dark" id="floatingto" placeholder="destination" />
                                <label htmlFor="floatingPassword">To</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input type="date" min={disable()} className="form-control border border-dark" id="floatingdate" placeholder="date" name='date' value={form.date} onChange={onchange} />
                                <label for="floatingInput">Date</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input type="number" min={1} className="form-control border border-dark" id="floatingpassanger" placeholder="passengers" name='passanger' value={form.passanger} onChange={onchange} />
                                <label for="floatingInput">Passengers</label>
                            </div>
                            <div className="btn">
                                <button disabled={
                                    form.from.length < 3 || form.to.length < 3 || form.date === '' || form.passanger.length < 1
                                } className="btn btn-lg   btn-primary mt-3" style={{
                                    width: '230px',
                                    fontFamily: " 'Kanit', sans-serif"
                                }} onClick={onclick}>Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h1 style={{
                            textAlign: "center",
                            marginTop: "20px",
                            fontFamily: " 'Kanit', sans-serif"
                        }}>FLIGHTS PRESENT</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Flight Code</th>
                                    <th scope="col">Flight Name</th>
                                    <th scope="col">Flight Price(
                                        <i className="fa fa-inr" aria-hidden="true"></i>
                                        )</th>
                                    <th scope="col">Departure</th>
                                    <th scope="col">Arrival</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.flight_code}</td>
                                                <td>{item.flight_name}</td>
                                                <td>{item.totals.total}</td>
                                                <td>{`${item.departureAirport.time}`.substring(11, 18)}</td>
                                                <td>{`${item.arrivalAirport.time}`.substring(11, 18)}</td>
                                            </tr>
                                        )
                                    }
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>}
        </>
    )
}

export default Flightform