"use client";

// src/StateContext.js
import React, { createContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create the context
const StateContext = createContext();

// Create a provider component
const StateProvider = ({ children }) => {

  const [globalCurrency, setGlobalCurrency] = useState(
    {
      name: "USD",
      isoCode: "US",
      flag: "🇺🇸",
    }
  )

  const [showAlert, setShowAlert] = useState(null);

  const [postType, setPostType] = useState("");

  const [openPost, setOpenPost] = useState(null);
  const [updateComment, setUpdateComment] = useState(null);
  const [updateReply, setUpdateReply] = useState(null);
  const [openComment, setOpenComment] = useState(null);
  const [openReply, setOpenReply] = useState(null);


  const [scrollToCommentForm, setScrollToCommentForm] = useState(false);
  const [scrollToComment, setScrollToComment] = useState(null);



  const [allCommentIds, setAllCommentIds] = useState([]);
  const [commentArr, setCommentArr] = useState([]);

  const [allReplyIds, setAllReplyIds] = useState([]);
  const [replyArr, setReplyArr] = useState([]);

  const handlingAlert = (showAlert) => {

    if (showAlert !== null) {

      const configToast = {
        position: showAlert.position ? showAlert.position : "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }

      if (showAlert.type === "success") {
        toast.success(showAlert.message, configToast);
      }

      if (showAlert.type === "warning") {
        toast.warning(showAlert.message, configToast);
      }

      if (showAlert.type === "error") {
        toast.error(showAlert.message, configToast);
      }

    }
  }


  useEffect(() => {
    handlingAlert(showAlert)
  }, [showAlert]);

  return (
    <StateContext.Provider
      value={{

        globalCurrency, 
        setGlobalCurrency,

        setShowAlert,

        postType,
        setPostType,

        openPost,
        setOpenPost,

        openComment,
        setOpenComment,

        scrollToComment, 
        setScrollToComment,

        scrollToCommentForm, 
        setScrollToCommentForm,

        updateComment, 
        setUpdateComment,

        updateReply,
        setUpdateReply,

        openReply,
        setOpenReply,

        allCommentIds,
        setAllCommentIds,
        commentArr,
        setCommentArr,

        allReplyIds,
        setAllReplyIds,
        replyArr,
        setReplyArr

      }}>
      {children}
      <ToastContainer />
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
