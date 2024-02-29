import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";

const ProtectedRoutes = (props) => {
  const { name } = props;
  const [show, setShow] = useState(false);
  const [deny, setDeny] = useState(false);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const role = user?.role;

  const arrMember = ["my-account", "sell"];
  const arrStaff = [];
  const arrAdmin = ["accommondation-admin" ];

  const checkAccess = () => {
    console.log("FKK", role);
    if (!role) {
      toast.error("Unauthenticated user.");
      navigate("/");
      return;
    }

    if (role === "admin" && arrAdmin.includes(name)) {
        console.log("you rightt meen", name);
      setShow(true);
    } else if (role === "staff" && arrStaff.includes(name)) {
      setShow(true);
    } else if (role === "member" && arrMember.includes(name)) {
      setShow(true);
    } else {
      toast.error("Unauthenticated user.");
      navigate("/");
    }
  };
  console.log("My name is", props);

  useEffect(() => {
    checkAccess();
  },[]);

  return (
    <div>
      {show && props.children}
    </div>
  );
  
};

export default ProtectedRoutes;


