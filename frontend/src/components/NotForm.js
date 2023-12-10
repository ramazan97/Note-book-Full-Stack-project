import React, { useState } from "react";
import { useNotContext } from "../hooks/useNotContext";
import { useAuthContext } from "../hooks/useAuthContext";
// import { SlNotebook } from "react-icons/sl";

const NotForm = () => {
  const [baslik, setBaslik] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [hata, setHata] = useState(null);
  const [bosAlanlar, setBosalanlar] = useState([]);
  const { dispatch } = useNotContext();
  const { kullanici } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!kullanici) {
      setHata("Giriş yapmalısınız");
      return;
    }

    const not = { baslik, aciklama };

    const response = await fetch("/api/notlar", {
      method: "POST",
      body: JSON.stringify(not),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${kullanici.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setHata(json.hata);
      setBosalanlar(json.bosAlanlar);
      // console.log("hata oluştu", json);
    }
    if (response.ok) {
      setHata(null);
      setBaslik("");
      setAciklama("");
      setBosalanlar([]);
      // buradaki dispatch methodu sayfayı yenilemeden bu işlemleri yapmamıza yarıyor
      dispatch({ type: "NOT_OLUSTUR", payload: json });
      console.log("yeni bir not eklendi", json);
    }
  };

  return (
    <div>
      <section className="" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Yeni Bir Not Ekle
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Not Başlık
                  </label>
                  <input
                    onChange={(e) => setBaslik(e.target.value)}
                    value={baslik}
                    type="text"
                    name="Başlık"
                    id="Başlık"
                    className={`${
                      bosAlanlar.includes("baslik")
                        ? "border border-red-500 border-"
                        : ""
                    } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    // className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Başlık"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Not Açıklama
                  </label>
                  <textarea 
                    onChange={(e) => setAciklama(e.target.value)}
                    value={aciklama}
                    type="text"
                    name="Açıklama"
                    id="Açıklama"
                    placeholder="Açıklama"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Ekle
                </button>
                {hata && (
                  <div className="text-red-500 text-2xl mt-16 font-bold">
                    {hata}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotForm;
