import React from "react"

let Footer = (props) => {
    return(
        <footer className="bg-red-800 text-white py-10 mt-8">
        <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            
            {/* About */}
            <div className="max-w-xs text-left mx-auto w-max">
                <h3 className="font-semibold text-lg mb-2">About</h3>
                <p>
                    This system is designed to help manage and track vaccinations efficiently and securely.
                </p>
            </div>

            {/* Contact */}
            <div className="text-left mx-auto w-max">
                <h3 className="font-semibold text-lg mb-2">Contact</h3>
                <p>Email: support@vaccinesystem.com</p>
                <p>Phone: +1 (972) 555-0100</p>
            </div>
        </div>

        <div className="text-center text-red-200 text-xs mt-10">
            &copy; {new Date().getFullYear()} Vaccination System. All rights reserved.
        </div>
        </footer>
    )
}

export default Footer