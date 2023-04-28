import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import '../index.css';

function Nav({user, handleLogout}){
    return(
        <header className="bg-zinc-900 border border-lime-200 sticky top-0">
            <nav className="mx-auto flex mx-w-7xl items-center justify-between h-24 gap-x-6 p-6 lg:px-8" aria-label="Global">
				<div className="flex lg:flex-1">
                    {user ? <Link className="text-3xl font-bold leading-6 tracking-tight text-lime-300" to="/profile">LoggedOn</Link> :<Link className="text-3xl font-bold leading-6 tracking-tight text-lime-300" to="/">LoggedOn</Link> }
					{/* <Link>
						<span className="sr-only">Project Name</span>
						<img src=logo />
					</Link> */}
				</div>
				<div className="hidden lg:flex lg:gap-x-12">
                    {user ? <NavLink className="text-lg font-semibold leading-6 text-lime-100" to="/users" end>Users</NavLink> : null}
                    {user ? <NavLink className="text-lg font-semibold leading-6 text-lime-100" to="/profile">Profile</NavLink> : null}
					<NavLink className="text-lg font-semibold leading-6 text-lime-100" to="/games" >Games</NavLink>
					{/*<NavLink></NavLink>
					<NavLink></NavLink> */}
				</div>
				<div className="flex flex-1 items-center justify-end gap-x-6">
                {user ? <p className="hidden lg:block lg:text-md lg:font-semibold lg:leading-6 lg:text-lime-200">Welcome, {user && user.username}</p> : null}
				{user ? (
                    <div className="flex justify-between gap-x-6">
                        <Link className="hidden lg:block lg:text-md lg:font-semibold lg:leading-6 lg:text-white" to="/" onClick={handleLogout}>Logout</Link>
                    </div>
                ) : null }
                    {/* <Link className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-white" to="/login">Login</Link>
                )} */}
                {user ? null : <Link to="/signup" className="rounded-md bg-lime-300 px-3 py-2 text-md font-semibold text-zinc-950 shadow-sm hover:bg-lime-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200">Sign up</Link> }
					

				</div>


				





				{/* <div className="flex lg:hidden">
      <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
        <span className="sr-only">Open main menu</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div> */}

{/* <div className="lg:hidden" role="dialog" aria-modal="true">
    <!-- Background backdrop, show/hide based on slide-over state. -->
    <div className="fixed inset-0 z-10"></div>
    <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
      <div className="flex items-center gap-x-6">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
        </a>
        <a href="#" className="ml-auto rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</a>
        <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
          <span className="sr-only">Close menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="mt-6 flow-root">
        <div className="-my-6 divide-y divide-gray-500/10">
          <div className="space-y-2 py-6">
            <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Product</a>
            <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</a>
            <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</a>
            <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</a>
          </div>
          <div className="py-6">
            <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
          </div>
        </div>
      </div>
    </div>
  </div> */}

			</nav>
        </header>
    )
}

export default Nav