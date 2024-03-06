import React, { useEffect, useState } from 'react'
import { getDocs, collection } from "firebase/firestore";
import { db } from '../../config/firebase';
import DataTable from 'react-data-table-component';
import { Table } from './table';

export const AllEntries = () => {

  return <div><Table /></div>;
}


