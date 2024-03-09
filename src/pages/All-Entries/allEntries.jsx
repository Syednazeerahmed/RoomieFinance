import React, { useEffect, useState} from 'react'
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from '../../config/firebase';
import DataTable from 'react-data-table-component';
import './allEntries.css';

export const AllEntries = () => {

  const postsRef = collection(db, "Posts");

  const sortedPostsQuery = query(postsRef, orderBy("date", "asc"));

  const [expenseList, setExpenseList] = useState([]);

  const [totalAmount, setTotalAmount] = useState(0);

  const [ thisMonth, setThisMonth ] = useState(true);
  // const thisMonth = true;

  const [ prevMonth, setPrevMonth ] = useState(false);

  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getPosts = async () => {
    const data = await getDocs(sortedPostsQuery);
    setExpenseList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
  
  

  const data = expenseList.map((post) => {
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
      expenseList.map((post) => ({
        name: post.username,
        description: post.description,
        amount: post.amount,
        date: post.date,
      }))
    );
    
    setRecords((prev) => filterMonth(prev));

    let temp = 0;
    for(let i=0;i<records.length;i++) {
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
    
    if(thisMonth) {
      const newData = data.filter(row => {
        return row.date.includes(new Date().toString().slice(4,7));
      });
      return newData;
    }   
    else if(prevMonth) {
      const newData = data.filter(row => {
        return row.date.includes(month[new Date().getMonth() - 1]);
      });
      return newData;
    }
    else {
      return data;
    }
    
  }

  function range() {
    if (thisMonth) {
      setPrevMonth((prev) => !prev);
      setThisMonth((prev) => !prev);
      return;
    }
    if (prevMonth) {
      setPrevMonth((prev) => !prev);
      return;
    } 
    else {
      setThisMonth((prev) => !prev);
    }
  }

  function handleFilter(event) {
      const newData = data.filter(row => {
        return row.name.toLowerCase().includes(event.target.value.toLowerCase());
      })  
      setRecords(() => filterMonth(newData));
      
  }
  return (
    <div className="table">
      <div className="filter">
        <input type="text" placeholder="name filter" onChange={handleFilter} />
        <button onClick={range}>
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
    </div>
  );
}


