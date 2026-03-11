import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import db from "../firebase_config";
import { Link } from "react-router-dom";

export default function Home() {

  const [stdPhones, setStdPhones] = useState([]);
  const [name, setName] = useState('');
  const [sect, setSect] = useState('');
  const [tel, setTel] = useState('');

  const stdPhoneRef = collection(db, "stdphones");

  useEffect(() => {
    getAllPhones();
  }, []);

  const getAllPhones = () => {
    getDocs(stdPhoneRef)
      .then((phones) => {
        let allPhones = [];
        phones.docs.forEach((doc) => {
          allPhones.push({ id: doc.id, ...doc.data() });
        });
        setStdPhones(allPhones);
      })
      .catch(err => window.alert(err));
  };

  const addPhone = () => {
    const phone = { name: name, sect: sect, tel: tel };

    addDoc(stdPhoneRef, phone)
      .then(() => {
        setName('');
        setSect('');
        setTel('');
        getAllPhones();
      })
      .catch(err => alert(err));
  };

  const delPhone = (id) => {
    if (!window.confirm('Do you really want to delete?')) return;

    const targetDoc = doc(stdPhoneRef, id);

    deleteDoc(targetDoc)
      .then(() => {
        getAllPhones();
      })
      .catch(err => alert(err));
  };

  return (
    <div className="my-3">

      <div>
        Name: 
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        Sect:

        <input
          type="radio"
          name="rdSect"
          value="ced"
          checked={sect === 'ced'}
          onChange={e => setSect(e.target.value)}
        /> CED

        <input
          type="radio"
          name="rdSect"
          value="tct"
          checked={sect === 'tct'}
          onChange={e => setSect(e.target.value)}
        /> TCT

        Tel:
        <input
          type="tel"
          value={tel}
          onChange={e => setTel(e.target.value)}
        />

        <button
          className="btn btn-sm btn-outline-success"
          onClick={addPhone}
        >
          Add Data
        </button>
      </div>

      {stdPhones.length > 0 ? (
        stdPhones.map(phone => {
          return (
            <div
              className="d-flex justify-content-between my-2 text-secondary"
              key={phone.id}
              style={{ border: '1px solid grey' }}
            >

              <div className="p-2">
                <h4 className="text-info">{phone.name}</h4>
                <div><b>Section:</b> {phone.sect}</div>
                <div><b>Tel. No:</b> {phone.tel}</div>
              </div>

              <div className="p-2">

                <Link to="/edit" state={phone.id}>
                  <button className="btn btn-sm btn-outline-warning">
                    Edit
                  </button>
                </Link>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => delPhone(phone.id)}
                >
                  Delete
                </button>

              </div>

            </div>
          );
        })
      ) : (
        <h3>No data</h3>
      )}

    </div>
  );
}