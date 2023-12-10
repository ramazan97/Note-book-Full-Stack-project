import React, { useEffect } from "react";
import NotForm from "../components/NotForm";
import NotDetay from "../components/NotDetay";
import { useNotContext } from "../hooks/useNotContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  //const [notlar, setNotlar] = useState(null);
  const { notlar, dispatch } = useNotContext();
  const { kullanici } = useAuthContext();
  useEffect(() => {
    const fetchNotlar = async () => {
      const response = await fetch("/api/notlar", {
        headers: {
          Authorization: `Bearer ${kullanici.token}`,
        },
      });

      const json = await response.json();
      console.log(json, "json");
      if (response.ok) {
        //setNotlar(json);

        dispatch({ type: "NOT_DOLDUR", payload: json });
      }
    };
    if (kullanici) {
      fetchNotlar();
    }
  }, [dispatch, kullanici]);
  console.log(notlar, "notlar");

  return (
    <div>
      <div className="">
        <div className="mb-7">{<NotForm />}</div>
        <hr />

        {/* <div className="grid grid-cols-3 gap-10">
          {notlar && notlar.map((not) => <NotDetay key={not._id} not={not} />)}
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-10">
          {notlar && notlar.map((not) => <NotDetay key={not._id} not={not} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
