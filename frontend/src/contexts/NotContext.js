// ilk bu dosyayı olulturduk
// app komponentine de bu dosyayı ilave ettik

import { createContext, useReducer } from "react";

export const NotContext = createContext();

export const notReducer = (state, action) => {
  // action ile verilerimizi state aktaracaz hangi veriile ne tür işlem yapılacağını da action parametresi ile sağlayacaz
  switch (action.type) {
    case "NOT_OLUSTUR":
      return {
        notlar: [action.payload, ...state.notlar],
      };
    case "NOT_DOLDUR":
      return {
        notlar: action.payload,
      };
    case "NOT_SIL":
      return {
        notlar: state.notlar.filter((n) => n._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export const NotContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notReducer, {
    notlar: null,
  });

  return (
    // ...state ile şu anki notlar
    // dispatch ile güncelleme yapabilmek için kullanıyoruz
    <NotContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotContext.Provider>
  );
};
