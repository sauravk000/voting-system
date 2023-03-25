import React, { useContext, createContext, useState } from 'react';

const AddressDataContext = createContext();

const UpdateAddressDataContext = createContext();

export function getAddressData() {
  return useContext(AddressDataContext);
}

export function setAddressData() {
  console.log(useContext(UpdateAddressDataContext));
  return useContext(UpdateAddressDataContext);
}

export default function AddressDataProvider({ children }) {
  const [addressData, setad] = useState(null);
  function setAddData(address) {
    setad(address);
  }
  return (
    <AddressDataContext.Provider value={addressData}>
      <UpdateAddressDataContext.Provider value={setAddData}>
        {children}
      </UpdateAddressDataContext.Provider>
    </AddressDataContext.Provider>
  );
}
