import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import DataTable from "react-data-table-component";

export const Table = () => {
  
  const postsRef = collection(db, "Posts");
  


  const [postsList, setPostsList] = useState([]);

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
  };
  useEffect(() => {
    getPosts();
    // console.log(data);
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "80px",
      cell: (row) => (
        <div style={{ padding: "0px", margin: "0px" }}>{row.name}</div>
      ),
    },
    {
      name: "Description",
      selector: (row) => row.description,
      width: "120px",
      cell: (row) => (
        <div style={{ padding: "0px", margin: "0px", textAlign: "center" }}>
          {row.description}
        </div>
      ),
    },
    {
      name: "Amt",
      selector: (row) => row.amount,
      width: "60px",
      cell: (row) => (
        <div style={{ padding: "0px", margin: "0px" }}>{row.amount}</div>
      ),
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      width: "80px",
      cell: (row) => (
        <div style={{ padding: "0px", margin: "0px" }}>{row.date}</div>
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

  const [ records, setRecords ] = useState(data);
  useEffect(() => {
    setRecords(
      postsList.map((post) => ({
        name: post.username,
        description: post.description,
        amount: post.amount,
        date: post.date,
      }))
    );
  }, [postsList]);
  
  return (
    <div>
      <DataTable
        columns={columns}
        data={records}
        // fixedHeader
        // pagination
      ></DataTable>
    </div>
  );
};
