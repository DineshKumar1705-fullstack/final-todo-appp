import React from 'react'
import Link from 'next/link'

const SideBar = () => {
  return (
    <div>
        <aside className="w-full bg-gray-100 border-r p-5 shadow-md flex flex-col justify-between">
        <div className="flex flex-col justify-between">
          
          <ul className="space-x-4 flex flex-row justify-end gap:4">
            <li>
              <Link href="/todo" className="text-black hover:text-blue-600 font-medium">
                🏠 Todo List
              </Link>
            </li>
            <li>
              <Link href="/articles" className=" text-black hover:text-blue-600 font-medium">
                📰 News
              </Link>
             </li>
             <li> 
              <Link href="/feedback" className="hover:text-blue-600 font-medium text-black" >📠FeedBack</Link>
            </li>
          </ul>
        </div>
        
      </aside>
    </div>
  )
}

export default SideBar