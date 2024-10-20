import { useEffect } from "react";
import axios from "axios";
import { Navigation } from "../../components/Navigation";

import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      navigate("/parent/login");
    } else {
      (async () => {
        try {
          const { data } = await axios.get("/parent");
          console.log(data);
        } catch (e) {
          console.log("not auth");
        }
      })();
    }
  }, [navigate]);
  return (
    <div>
      <Navigation />
      <div className="form-signin mt-5 text-center">
        <h3>Witaj Rodzicu </h3>
        <p>Twoje dzieci:</p>
        <ul></ul>
      </div>
    </div>
  );
};
