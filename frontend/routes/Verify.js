import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Verify = () => {
  const { verifyToken } = useParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const body = () => {
      if (verifyToken) {
        console.log("request sent");
        axios.get(`/api/verify/${verifyToken}`).then((response) => {
            setLoading(false);
            setSuccess(true);
            console.log(resp);
        }, (error) => {
            setLoading(false);
            setSuccess(false);
            console.log(error);
        });
      }
    };
    body();
  }, [verifyToken]);
  return !loading ? (
    success ? (
      <div className="bg-lime-400">
        Verification successful! You can close this page.
      </div>
    ) : (
      <div className="bg-red-400">
        Something went wrong! Please request a new verification email.
      </div>
    )
  ) : (
    <div className="bg-yellow-400">Loading...</div>
  );
};

export default Verify;
