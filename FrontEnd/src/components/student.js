import React, { useState, useEffect } from "react";
import "./student.css";
import StudentDashboard from "./studentDashboard";
import Rqleave from "./rqleave";
import Sidebar from "./sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Student() {
  const usr = JSON.parse(sessionStorage.getItem("user"));
  const id = usr ? usr._id : null;
  const [acceptedCount, setAcceptCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [user, setUser] = useState({});
  const [form, setForm] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/dashboard/student/requestCount/${id}`
        );

        setAcceptCount(res.data.accept);
        setRejectedCount(res.data.reject);
        setPendingCount(res.data.pending);
        setUser(res.data.user);

        setForm(res.data.forms);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
  const [sidebar, setSidebar] = useState("dash");
  const renderReq = () => {
    setSidebar("req");
  };
  const renderDash = () => {
    setSidebar("dash");
  };

  return (
    <>
      {usr ? (
        <div className="container-fluid dashboard">
          <div className="row dash">
            <Sidebar
              renderReq={renderReq}
              renderDash={renderDash}
              id={id}
              to="/sendemail/"
              usr={"student"}
            />
            <div className="col-md-11 col-lg-11 col-xl-11 col-sm-10 col-xs-10 box">
              {sidebar === "dash" ? (
                <StudentDashboard
                  renderReq={renderReq}
                  form={form}
                  user={user}
                  accept={acceptedCount}
                  reject={rejectedCount}
                  pending={pendingCount}
                />
              ) : (
                <Rqleave />
              )}
            </div>
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
}
