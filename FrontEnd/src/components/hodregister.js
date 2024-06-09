import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import MainPage from './mainPage';

function HODregister() {
    const [hoddata, setHoddata] = useState({
        name: '',
        email: '',
        phnum: '',
        branch: '',
        clg: '',
        pwd: ''
    });
    const [errorMsg, setErrorMsg] = useState('');
    const nav = useNavigate();

    function handleHODreg(e) {
        e.preventDefault();
        axios.post("https://e-leave-hub-back.vercel.app/handle_hod_reg", hoddata)
            .then((res) => {
                alert(res.data.msg);
                if (res.data.msg === 'submitted') nav('/hodlogin');
            })
            .catch((err) => {
                setErrorMsg(err.message);
            });
    }

    return (
        <>
            <MainPage />
            <div className='container-fluid regForm'>
                <div className='container login pt-5'>
                    <div className="card text-bg-success mb-3">
                        <div className="card-header" style={{ color: 'white' }}>Hod Registration</div>
                        <div className="card-body">
                            {/* <h5 className="card-title">Hod Registration Form</h5> */}
                            <div className="card-text">
                                <form onSubmit={handleHODreg}>
                                    <div className="row mb-3">
                                        <label htmlFor="Name3" className="col-sm-4 col-form-label">Name</label>
                                        <div className="col-sm-8">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="Name3"
                                                placeholder="Enter full name"
                                                value={hoddata.name}
                                                onChange={(e) => setHoddata({ ...hoddata, name: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">Email</label>
                                        <div className="col-sm-8">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="inputEmail3"
                                                placeholder="Enter your email"
                                                value={hoddata.email}
                                                onChange={(e) => setHoddata({ ...hoddata, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="phone3" className="col-sm-4 col-form-label">Phone No.</label>
                                        <div className="col-sm-8">
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="phone3"
                                                placeholder="Enter your phone number"
                                                value={hoddata.phnum}
                                                onChange={(e) => setHoddata({ ...hoddata, phnum: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="branch3" className="col-sm-4 col-form-label">Branch</label>
                                        <div className="col-sm-8">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="branch3"
                                                placeholder="Enter your branch"
                                                value={hoddata.branch}
                                                onChange={(e) => setHoddata({ ...hoddata, branch: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="college3" className="col-sm-4 col-form-label">College</label>
                                        <div className="col-sm-8">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="college3"
                                                placeholder="Enter your college"
                                                value={hoddata.clg}
                                                onChange={(e) => setHoddata({ ...hoddata, clg: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">Password</label>
                                        <div className="col-sm-8">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="inputPassword3"
                                                placeholder="Enter your password"
                                                value={hoddata.pwd}
                                                onChange={(e) => setHoddata({ ...hoddata, pwd: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-success">Register</button>
                                    </div>
                                </form>
                                {errorMsg && <div className="text-danger">{errorMsg}</div>}
                                <div className="text-center">Already have an account? <Link to='/hodlogin'>Login</Link></div>
                            </div>
                        </div>
                        <div className="card-footer"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HODregister;
