import React, { useState } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Login from "./components/Login"
import ProtectedRoute from './components/ProtectedRoute'
import BubblePage from './components/BubblePage'

import "./styles.scss"

function App() {
  const [colorList, setColorList] = useState([])
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <ProtectedRoute path="/bubbles" component={BubblePage} />
      </div>
    </Router>
  )
}

export default App
