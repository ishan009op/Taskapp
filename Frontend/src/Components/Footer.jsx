import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#9929EA] text-white mt-10 py-5 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm sm:text-base font-medium">
          © {new Date().getFullYear()} <span className="text-[#FAEB92]">TaskMaster</span>. Built with by <span className="text-[#ffffff]">Developer_ishan09</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
