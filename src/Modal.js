import React, { useState, useRef, useEffect } from 'react'
import SignUp from './SignUp'
import LogIn from './LogIn'

const Modal = () => {
    const [click, setclick] = useState(true)
    const ref = useRef(null)
    const ref1 = useRef(null)
    const handleClick = (e) => {
        if (e.target.innerText === 'Sign Up') {
            setclick(true)
        } else {
            setclick(false)
        }

    }
    const closemodal = () => {
        ref1.current.click();
    }
    useEffect(() => {
        const user = localStorage.getItem('price')
        if (!user) {
            ref.current.click()

        }

    }, [])
    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
                Launch static backdrop modal
            </button>
            <div className="modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="btn-group w-100" role="group" aria-label="Basic outlined example">
                                <button type="button" onClick={handleClick} className="btn btn-outline-primary w-50" style={{

                                }}>Sign Up</button>
                                <button type="button" onClick={handleClick} className="btn btn-outline-primary w-50">Login</button>

                            </div>

                        </div>
                        <div className="modal-body">
                            {
                                click ? <SignUp closemodal={closemodal} /> : <LogIn closemodal={closemodal} />}
                        </div>
                        <div className="modal-footer d-none ">
                            <button type="button" ref={ref1} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default Modal