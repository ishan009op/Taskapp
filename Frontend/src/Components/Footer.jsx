import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white mt-10 py-5 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm sm:text-base font-medium">
          © {new Date().getFullYear()} TaskMaster. Built with 💙 by Developer_ishan09
        </p>
      </div>
    </footer>
  )
}

export default Footer
