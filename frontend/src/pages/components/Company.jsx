import React, { useEffect, useState } from 'react'
import api from '../../service/api.js'
import CompanyCard from '../CompanyCard'

export default function Company() {
   const [allCompanies, setAllCompanies] = useState([])
   const [filteredList, setFilteredList] = useState([])
   const [search, setSearch] = useState("");

   useEffect(() => {
      fetchCompanies()
   }, [])

   useEffect(() => {
      const result = allCompanies.filter((company) =>
         company.companyName?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
      setFilteredList(result);
   }, [search, allCompanies])

   async function fetchCompanies() {
      try {
         const response = await api.get('/company');
         setAllCompanies(response.data.companies || []);
      } catch (error) {
         console.error("Failed to fetch companies:", error.message);
      }
   }

   return (
      <section className='bg-gray-100 py-12 md:py-16'>
         <div className='max-w-7xl mx-auto px-4 sm:px-6'>
            <h2 className='text-2xl sm:text-3xl font-bold text-center mb-6 md:mb-10'>Top Hiring Companies</h2>
            <input
               type="text"
               placeholder='Search Company...'
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className='w-full border rounded-lg p-3 mb-6 focus:ring-2 focus:ring-blue-300 outline-none bg-white'
            />
            {filteredList.length === 0 ? (
               <p className='text-center text-gray-500 py-10'>No companies found.</p>
            ) : (
               <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                  {filteredList.map((cur) => (
                     <CompanyCard
                        key={cur._id}
                        id={cur._id}
                        name={cur.companyName}
                        role={cur.role}
                        salaryPackage={cur.salaryPackage}
                        location={cur.location}
                     />
                  ))}
               </div>
            )}
         </div>
      </section>
   )
}
