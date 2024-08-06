import axios from "axios"
import config  from "../config"
import {Outlet, Navigate} from "react-router-dom"
import { useEffect, useState } from "react";


const ProtectedRoutes = () => {
    const [isValid, setIsValid] = useState<boolean | null>(null);
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await axios.get(`${config.SERVER_API_URL}/auth/validatetoken`, {
            headers: {
              Authorization: localStorage.getItem("Authorization")
            }
          });
          setIsValid(response.data.isValid);
        } catch (error) {
          setIsValid(false);
        }
      };
  
      checkAuth();
    }, []);
  
    if (isValid === null) {
      return <p>Loading...</p>; // Render a loading state while checking authentication
    }
  
    return isValid ? <Outlet /> : <Navigate to="/login" />;
  };
  
  export default ProtectedRoutes;