import React, { useEffect, useState } from "react";
import { getDocs, collection, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import DataTable from "react-data-table-component";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { UpdateModal } from "./updateModal/updateModal";
import "./myEntries.css";

export const MyEntries = () => {
  const [user] = useAuthState(auth);

  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const postsRef = collection(db, "Posts");

  const sortedPostsQuery = query(postsRef, orderBy("date", "asc"));

  const [expenseList, setExpenseList] = useState([]);

  const [totalAmount, setTotalAmount] = useState(0);

  const [thisMonth, setThisMonth] = useState(true);
  // const thisMonth = true;

  const [prevMonth, setPrevMonth] = useState(false);

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getPosts = async () => {
    const data = await getDocs(sortedPostsQuery);

    setExpenseList(
      data.docs
        .filter((doc) => {
          return doc.data().username === user?.displayName;
        })
        .map((doc) => ({
          ...doc.data(),
          date: doc.data().date.toDate().toString().slice(4, 10),
          id: doc.id,
        }))
    );
    console.log(expenseList[0]);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "80px",
      cell: (row) => (
        <div
          style={{
            padding: "0px",
            margin: "0px",
            height: "15px",
            overflow: "hidden",
          }}
        >
          {row.name}
        </div>
      ),
    },
    {
      name: "Description",
      selector: (row) => row.description,
      width: "120px",
      cell: (row) => (
        <div
          style={{
            padding: "0px",
            margin: "0px",
            textAlign: "center",
            height: "15px",
            overflow: "hidden",
          }}
        >
          {row.description}
        </div>
      ),
    },
    {
      name: "Amt",
      selector: (row) => row.amount,
      width: "60px",
      cell: (row) => (
        <div
          style={{
            padding: "0px",
            margin: "0px",
            height: "15px",
            overflow: "hidden",
          }}
        >
          {row.amount}
        </div>
      ),
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      width: "80px",
      cell: (row) => (
        <div
          style={{
            padding: "0px",
            margin: "0px",
            height: "15px",
            overflow: "hidden",
          }}
        >
          {row.date}
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div
          style={{
            padding: "0px",
            margin: "0px",
            height: "25px",
            overflow: "hidden",
            display: "flex",
            gap: "20px",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <button
            onClick={() => {
              deleteEntry(row.id);
            }}
            style={{ background: "none", border: "none", fontSize: "25px" }}
          >
            <MdDelete />
          </button>
          <button
            onClick={() => {
              //   updateEntry(row.id);
              console.log("update");
              setSelectedRow(row);
              setShowModal(true);
            }}
            style={{ background: "none", border: "none", fontSize: "25px" }}
          >
            <MdModeEdit />
          </button>
        </div>
      ),
    },
  ];

  const deleteEntry = async (id) => {
    //   const docRef = collection("Posts").doc(id);
    await deleteDoc(doc(db, "Posts", id));
    // await db.collection("Posts").doc(id).delete();
    // console.log(id);
    getPosts();
  };
  const data = expenseList.map((post) => {
    return {
      name: post.username,
      description: post.description,
      amount: post.amount,
      date: post.date,
      id: post.id,
    };
  });

  const [records, setRecords] = useState([]);
  useEffect(() => {
    setRecords(
      expenseList.map((post) => ({
        name: post.username,
        description: post.description,
        amount: post.amount,
        date: post.date,
        id: post.id,
      }))
    );

    setRecords((prev) => filterMonth(prev));

    let temp = 0;
    for (let i = 0; i < records.length; i++) {
      temp += Number(records[i].amount);
    }
    setTotalAmount(temp);
    // console.log(temp);
  }, [expenseList, thisMonth, prevMonth]);

  useEffect(() => {
    let temp = 0;
    for (let i = 0; i < records.length; i++) {
      temp += Number(records[i].amount);
    }
    setTotalAmount(temp);
  }, [records]);

  const filterMonth = (data) => {
    if (thisMonth) {
      const newData = data.filter((row) => {
        return row.date.includes(new Date().toString().slice(4, 7));
      });
      return newData;
    } else if (prevMonth) {
      const newData = data.filter((row) => {
        return row.date.includes(month[new Date().getMonth() - 1]);
      });
      return newData;
    } else {
      return data;
    }
  };

  function monthFilterToggler() {
    if (thisMonth) {
      setPrevMonth((prev) => !prev);
      setThisMonth((prev) => !prev);
      return;
    }
    if (prevMonth) {
      setPrevMonth((prev) => !prev);
      return;
    } else {
      setThisMonth((prev) => !prev);
    }
  }

  return (
    <div className="table">
      {!showModal ? (
        <>
          <div className="filter">
            <button onClick={monthFilterToggler}>
              {thisMonth || prevMonth
                ? thisMonth
                  ? "This Month"
                  : "Prev Month"
                : "All"}
            </button>
          </div>
          <div className="displayAmount">
            <h2>Amount : {totalAmount}</h2>
            {/* <input value={totalAmount} /> */}
          </div>
          <div
            style={{
              height: "auto",
              maxHeight: "calc(100vh - 124.6px)",
              overflowY: "auto",
            }}
            className="dataTable"
          >
            <DataTable
              columns={columns}
              data={records}
              // fixedHeader
              // pagination
              // selectableRows
            ></DataTable>
          </div>
        </>
      ) : (
        <UpdateModal
          show={showModal}
          selectedRow={selectedRow}
          onClose={() => setShowModal(false)}
          onUpdate={getPosts}
        />
      )}
    </div>
  );
};
