import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './entryForm.css';
export const EntryForm = () => {

  const [ user ] = useAuthState(auth);

  const schema = yup.object().shape({
    description: yup.string().max(20).required('description is required'),
    amount: yup.number().min(1,"amount should be positive").max(99999).required('amount is required')
  });

  const { register, handleSubmit, formState: { errors }, reset  } = useForm({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, 'Posts');

  const onCreatePost = async (data) => {
    if( data.amount < 1 || data.amount === "" || data.description === "") {
        window.alert("enter proper amount and description");
        reset();
        return
    }
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      date: new Date(),
      userId: user?.uid,
    });
    reset();
  }
  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <label>
        Description&#160;<small>Enter description</small>
      </label>
      <input placeholder="description" {...register("description")} />
      {/* <p> {errors.description?.message}</p> */}
      <label>
        Amount&#160; <small>Enter the amount</small>
      </label>
      <input type="number" placeholder="amount" {...register("amount")} />
      {/* <p> {errors.amount?.message}</p> */}
      <input type="submit" value="Add Expense" className="addExpense" />
    </form>
  );
}
