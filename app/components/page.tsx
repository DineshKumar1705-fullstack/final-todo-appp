import React from 'react'
import Link from 'next/link'

const SideBar = () => {
  return (
    <div>
        <aside className="w-full bg-black border-r p-5 shadow-md flex flex-col justify-between">
        <div className="flex flex-col justify-between">
          
          <ul className="space-x-4 flex flex-row justify-end gap:4">
            <li>
              <Link href="/todo" className=" hover:text-blue-600 font-medium text-white bg-gray-700 p-2 border-none rounded-lg">
                🏠 Todo List
              </Link>
            </li>
            <li>
              <Link href="/articles" className=" text-black hover:text-blue-600 font-medium text-white bg-gray-700 p-2 border-none rounded-lg">
                📰 News
              </Link>
             </li>
             <li> 
              <Link href="/feedback" className="hover:text-blue-600 font-medium text-black text-white bg-gray-700 p-2 border-none rounded-lg" >📠FeedBack</Link>
            </li>
          </ul>
        </div>
        
      </aside>
    </div>
  )
}

export default SideBar