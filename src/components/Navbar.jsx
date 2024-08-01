//component of top navigation
import React from 'react'

const Navbar = () => {

  const user = localStorage.getItem("user");


  return (
    <header className="w-[100vw] h-20 mt-[-5px] flex justify-center items-center ">
        {user ? (
          <nav className="w-[90%] h-full flex justify-end items-center gap-8">
            <a href="/" className="text-2xl font-semibold text-slate-600" onClick={()=>{
              alert("logout succesfull...")
              localStorage.clear()
            }}>
              Log out
            </a>
          </nav>
        ) : (
          <nav className="w-[85%] h-full flex justify-end items-center gap-8">
            <a href="/login" className="text-2xl font-semibold text-slate-600">
              Login
            </a>
            <a href="/signup" className="text-2xl font-semibold text-slate-600">
              Signup
            </a>
          </nav>
        )}
      </header>
  )
}

export default Navbar
