import React from 'react'


function SearchGames({changeSearch}) {

    

    const handleSearch = e => changeSearch(e.target.value)

    return (
        <div className="pb-14">
            <input
                type="text"
                placeholder='Search Games'
                onChange={handleSearch}
                className="block w-72 rounded-md border-2 bg-lime-100 border-zinc-950 px-4 py-1.5 text-zinc-950 shadow-sm  placeholder:text-zinc-950   sm:text-sm sm:leading-6"
            />  
        </div>
    )
}

export default SearchGames