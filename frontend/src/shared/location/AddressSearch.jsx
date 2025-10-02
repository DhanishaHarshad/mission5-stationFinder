import React, { useState } from "react";

function AddressSearch({ onSubmit }) {
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address.trim()) return;
    onSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default AddressSearch;
