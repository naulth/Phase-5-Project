import React from 'react'


function SearchComments({changeSearch}) {

    

    const handleSearch = e => changeSearch(e.target.value)

    return (
        <div className="">
            <input
                type="text"
                placeholder='Search Comments'
                onChange={handleSearch}
                className="block w-72  border-2 bg-lime-100 border-zinc-950 px-4 py-1.5 text-zinc-950 shadow-sm  placeholder:text-zinc-950   sm:text-sm sm:leading-6"
            />  
        </div>
    )
}

export default SearchComments