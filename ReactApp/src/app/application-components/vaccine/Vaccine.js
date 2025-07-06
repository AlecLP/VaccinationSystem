import React from "react"
import { useSelector } from "react-redux"
import VaccineForm from "./VaccineForm"
import VaccineList from "./VaccineList"


const Vaccine = () => {

  const { user } = useSelector((state) => state.user);

  return (
    <div className="h-auto w-full py-10 bg-neutral-100 justify-center flex items-center rounded-4xl gap-40">
      {user && user.role === "ADMIN" ? 
        <>
          <VaccineList />
          <VaccineForm />
        </>
      : <p>ACCESS DENIED: NOT AN ADMIN</p>}
    </div>
  )
}

export default Vaccine