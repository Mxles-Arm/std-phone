import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase_config";
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

    if (!name || !sect || !tel) {
      alert("Please fill all fields");
      return;
    }

    const phone = { name, sect, tel };

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

    if (!window.confirm('Delete this student?')) return;

    const targetDoc = doc(stdPhoneRef, id);

    deleteDoc(targetDoc)
      .then(() => getAllPhones())
      .catch(err => alert(err));
  };

  return (
    <div className="container my-4">

      {/* FORM CARD */}

      <div className="card shadow-lg border-0 mb-4">
        <div className="card-body">

          <h4 className="text-center text-info mb-3">
            Add Student Phone
          </h4>

          <div className="row g-2">

            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Student Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="col-md-3 d-flex align-items-center">

              <div className="form-check me-3">
                <input
                  className="form-check-input"
                  type="radio"
                  value="ced"
                  checked={sect === 'ced'}
                  onChange={e => setSect(e.target.value)}
                />
                <label className="form-check-label">CED</label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="tct"
                  checked={sect === 'tct'}
                  onChange={e => setSect(e.target.value)}
                />
                <label className="form-check-label">TCT</label>
              </div>

            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Telephone"
                value={tel}
                onChange={e => setTel(e.target.value)}
              />
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-success w-100"
                onClick={addPhone}
              >
                Add
              </button>
            </div>

          </div>

        </div>
      </div>


      {/* DATA TABLE */}

      <div className="card shadow border-0">
        <div className="card-body">

          <h4 className="text-center text-secondary mb-3">
            Student List
          </h4>

          {stdPhones.length > 0 ? (

            <table className="table table-hover align-middle">

              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Section</th>
                  <th>Telephone</th>
                  <th width="160">Action</th>
                </tr>
              </thead>

              <tbody>

                {stdPhones.map(phone => (

                  <tr key={phone.id}>

                    <td className="fw-bold text-info">
                      {phone.name}
                    </td>

                    <td>{phone.sect}</td>

                    <td>{phone.tel}</td>

                    <td>

                      <Link to="/edit" state={phone.id}>
                        <button className="btn btn-warning btn-sm me-2">
                          Edit
                        </button>
                      </Link>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => delPhone(phone.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          ) : (
            <div className="text-center text-muted">
              No student data
            </div>
          )}

        </div>
      </div>

    </div>
  );
}