import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import DataTable from "react-data-table-component";

export const Table = () => {
  const postsRef = collection(db, "Posts");

  const [postsList, setPostsList] = useState([]);

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    //   console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // console.log(postsList.map((post) => ({ name: post.username, description: post.description, amount: post.amount })));
  };
  useEffect(() => {
    getPosts();
    console.log(data);
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
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        // fixedHeader
        // pagination
      ></DataTable>
    </div>
  );
};
