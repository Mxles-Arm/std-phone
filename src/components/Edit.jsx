import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase_config";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.css";

const Edit = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const id = location.state;

   const [name, setName] = useState("");
   const [sect, setSect] = useState("");
   const [tel, setTel] = useState("");

   const ref = collection(db, "stdphones");
   const targetDoc = doc(ref, id);

   useEffect(() => {

      if (!id) {
         alert("No document id");
         navigate("/");
         return;
      }

      const loadData = async () => {
         try {
            const docSnap = await getDoc(targetDoc);

            if (docSnap.exists()) {
               const phone = docSnap.data();

               setName(phone?.name || "");
               setSect(phone?.sect || "");
               setTel(phone?.tel || "");

            } else {
               alert("Document not found");
               navigate("/");
            }

         } catch (err) {
            alert(err);
         }
      };

      loadData();

   }, [id, navigate]);


   const editHandler = async () => {
      try {

         const phone = {
            name: name,
            sect: sect,
            tel: tel
         };

         await updateDoc(targetDoc, phone);

         alert("Update success");
         navigate("/");

      } catch (err) {
         alert(err);
      }
   };


   return (
   <div>

      <h2 className="text-center text-info">Edit Student Phone</h2>

      <div
         style={{ border: "1px solid grey" }}
         className="w-50 mx-auto my-3 p-3"
      >

      <div className="p-2">
         Name:
         <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
         />
      </div>

      <div className="p-2">
         Sect:

         <input
            type="radio"
            name="rdSect"
            value="ced"
            checked={sect === "ced"}
            onChange={(e) => setSect(e.target.value)}
         /> CED

         <input
            type="radio"
            name="rdSect"
            value="tct"
            checked={sect === "tct"}
            onChange={(e) => setSect(e.target.value)}
         /> TCT
      </div>

      <div className="p-2">
         Tel:
         <input
            type="tel"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
         />
      </div>

      <button
         className="btn btn-sm btn-outline-warning m-2"
         onClick={() => navigate(-1)}
      >
         Cancel
      </button>

      <button
         className="btn btn-sm btn-outline-info"
         onClick={editHandler}
      >
         Edit
      </button>

      </div>

   </div>
   );
};

export default Edit;