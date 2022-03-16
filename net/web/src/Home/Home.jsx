import React, { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AppContext } from '../AppContext/AppContext';
                                           
export function Home() {

  const navigate = useNavigate();
  const app = useContext(AppContext);

  useEffect(() => {
    if (app) {
      if (app.state == null) {
        navigate('/login')
      }
      else if (app.state.access === 'user') {
        navigate('/user')
      }
      else if (app.state.access === 'admin') {
        navigate('/admin')
      }
    }
  }, [])

  return <></>
}

