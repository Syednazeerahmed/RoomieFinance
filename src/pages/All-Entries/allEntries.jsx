import React, { useEffect, useState} from 'react'
import { getDocs, collection } from "firebase/firestore";
import { db } from '../../config/firebase';
import DataTable from 'react-data-table-component';
import './allEntries.css';

export const AllEntries = () => {

  const postsRef = collection(db, "Posts");

  const [postsList, setPostsList] = useState([]);

  const [totalAmount, setTotalAmount] = useState(0);

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    // setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    const sortedPostsList = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .sort((a, b) => {
        const dateA = new Date(`${a.date} ${new Date().getFullYear()}`);
        const dateB = new Date(`${b.date} ${new Date().getFullYear()}`);
        return dateA - dateB;
      });
    setPostsList(sortedPostsList);

    // let temp = 0;
    // for (let i = 0; i < postsList.length; i++) {
    //   temp += Number(postsList[i].amount);
    // }
    // setTotalAmount(temp);

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
  ];
  
  

  const data = postsList.map((post) => {
    return {
      name: post.username,
      description: post.description,
      amount: post.amount,
      date: post.date,
    };
  });

  const [records, setRecords] = useState(data);
  useEffect(() => {
    setRecords(
      postsList.map((post) => ({
        name: post.username,
        description: post.description,
        amount: post.amount,
        date: post.date,
      }))
    );
    let temp = 0;
    for(let i=0;i<records.length;i++) {
      temp += Number(records[i].amount);
    }
    setTotalAmount(temp);
    // console.log(temp);
  }, [postsList]);

  useEffect(() => {
    let temp = 0;
    for (let i = 0; i < records.length; i++) {
      temp += Number(records[i].amount);
    }
    setTotalAmount(temp);
  }, [records]);

  function handleFilter(event) {
      const newData = data.filter(row => {
        return row.name.toLowerCase().includes(event.target.value.toLowerCase());
      })  
      setRecords(newData);
      
  }
  return (
    <div className="table">
      <input type="text" placeholder="name filter" onChange={handleFilter} />
      <div style={{ height: "505px", overflowY: "auto" }} className="dataTable">
        <DataTable
          columns={columns}
          data={records}
          // fixedHeader
          // pagination
          // selectableRows
        ></DataTable>
        <div className="displayAmount">
          <h2>Amount : {totalAmount}</h2>
          {/* <input value={totalAmount} /> */}
        </div>
      </div>
    </div>
  );
}


