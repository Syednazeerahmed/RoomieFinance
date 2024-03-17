import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import "./updateModal.css";

export const UpdateModal = ({ show, selectedRow, onClose, onUpdate }) => {
  const [description, setDescription] = useState(
    selectedRow?.description || ""
  );
  const [amount, setAmount] = useState(selectedRow?.amount || 0);

  const handleUpdate = async () => {
    if (amount < 1 || amount === "" || description === "") {
      window.alert("enter proper amount and description");
      return;
    }
    try {
      await updateDoc(doc(db, "Posts", selectedRow.id), {
        description,
        amount,
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="modal">
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input value={amount} onChange={(e) => setAmount(e.target.value)} />

      <div className="buttons">
        <button onClick={handleUpdate} className="button">
          Update
        </button>
        <button onClick={onClose} className="button">
          Cancel
        </button>
      </div>
    </div>
  );
};
