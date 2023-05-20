import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Verify = () => {
  const { verifyToken } = useParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const body = async () => {
      if (verifyToken) {
        console.log("request sent");
        const resp = await axios.get(`/api/verify/${verifyToken}`);
        console.log("verify resp", resp);
        setLoading(false);
        if (resp.status === 200) {
          setSuccess(true);
        } else {
          setSuccess(false);
          console.log(resp);
        }
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
