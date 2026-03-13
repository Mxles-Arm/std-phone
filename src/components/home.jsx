import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../firebase_config";
import { Link } from "react-router-dom";

export default function Home() {
  const [stdPhones, setStdPhones] = useState([]);
  const [name, setName] = useState("");
  const [sect, setSect] = useState("");
  const [tel, setTel] = useState("");

  const stdPhoneRef = collection(db, "stdphones");

  const loadPhones = useCallback(async () => {
    try {
      const snapshot = await getDocs(stdPhoneRef);
      const allPhones = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setStdPhones(allPhones);
    } catch (err) {
      alert(err.message);
    }
  }, [stdPhoneRef]);

  useEffect(() => {
    loadPhones();
  }, [loadPhones]);

  const addPhone = async () => {
    if (!name || !sect || !tel) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(stdPhoneRef, { name, sect, tel });
      setName("");
      setSect("");
      setTel("");
      await loadPhones();
    } catch (err) {
      alert(err.message);
    }
  };

  const delPhone = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await deleteDoc(doc(db, "stdphones", id));
      await loadPhones();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container my-4">
      <div className="modern-card mb-4">
        <div className="section-title text-center">Add Student Phone</div>
        <div className="section-desc text-center">
          Save student contact details in a clean and simple way.
        </div>

        <div className="row g-3">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <div className="radio-wrap d-flex align-items-center h-100">
              <div className="form-check me-3">
                <input
                  className="form-check-input"
                  type="radio"
                  value="ced"
                  checked={sect === "ced"}
                  onChange={(e) => setSect(e.target.value)}
                  id="ced"
                />
                <label className="form-check-label" htmlFor="ced">
                  CED
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="tct"
                  checked={sect === "tct"}
                  onChange={(e) => setSect(e.target.value)}
                  id="tct"
                />
                <label className="form-check-label" htmlFor="tct">
                  TCT
                </label>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Telephone"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-success w-100 h-100" onClick={addPhone}>
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="modern-card">
        <div className="section-title text-center">Student List</div>
        <div className="soft-count text-center">
          Total Students: {stdPhones.length}
        </div>

        {stdPhones.length > 0 ? (
          <div className="table-wrap">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Section</th>
                  <th>Telephone</th>
                  <th width="170">Action</th>
                </tr>
              </thead>

              <tbody>
                {stdPhones.map((phone) => (
                  <tr key={phone.id}>
                    <td className="student-name">{phone.name}</td>
                    <td>
                      <span
                        className={`sect-badge ${
                          phone.sect === "ced" ? "sect-ced" : "sect-tct"
                        }`}
                      >
                        {phone.sect.toUpperCase()}
                      </span>
                    </td>
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
          </div>
        ) : (
          <div className="empty-box">No student data</div>
        )}
      </div>
    </div>
  );
}