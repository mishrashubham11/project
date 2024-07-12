'use client';
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const blogCategories = [
  'Web Development',
  'Frontend',
  'Backend',
  'Artificial Intelligence',
  'Cross Platform App Development',
  'Software Development'
]

export default function Home() {

  const [blogList, setBlogList] = useState([])   //USESTATE impoet and snippet use
  const [masterList, setMasterList] = useState([]);

  const fetchBlogData = () => {
    axios.get('http://localhost:5000/blog/getall') //read operation from backend
      .then((result) => {
        console.table(result.data);   // tabular form me data inspect console me dega
        setBlogList(result.data)  // data jo console me read ho rha tha ab use state aur isse page per ayega
        setMasterList(result.data);
      }).catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {       //USEEFFECT IMPORT ISKA USE KOI BHI DATA OPEN KERTE HI SHOW HOTA H
    fetchBlogData();          //data dekhne ke liye inspect me
  }, [])

  const deleteBlog = (id) => {
    axios.delete('http://localhost:5000/blog/delete/' + id)        //for delete operation  by id any data in backend with delete button
      .then((result) => {
        if (result.status === 200) {
          fetchBlogData();     //ye data lata h frontend me
        }
      }).catch((err) => {

      });
  }

  const filterCategory = (selCategory) => {
    setBlogList(masterList.filter(blog => blog.category === selCategory));
  }

  const displayBlogs = () => {
    if (blogList.length === 0) return <h2 className="text-center text-3xl text-gray-300">No Blogs Found</h2>
    return blogList.map(blog => (
      <Link className="group relative block rounded-xl mb-8" href={'/viewblog/' + blog._id}>
        <div className="flex-shrink-0 relative rounded-xl overflow-hidden w-full h-[350px] before:absolute before:inset-x-0 before:z-[1] before:size-full before:bg-gradient-to-t before:from-gray-900/70">
          <img
            className="size-full absolute top-0 start-0 object-cover"
            src={'http://localhost:5000/' + blog.cover}
            alt="Image Description"
          />
        </div>
        <div className="absolute top-0 inset-x-0 z-10">
          <div className="p-4 flex flex-col h-full sm:p-6">
            {/* Avatar */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {/* <img
                  className="size-[46px] border-2 border-white rounded-full"
                  src="https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                  alt="Image Description"
                /> */}
              </div>
              <p className="text-md font-medium text-white/80">{new Date(blog.createdAt).toDateString()}</p>
              {/* <div className="ms-2.5 sm:ms-4">
                <h4 className="font-semibold text-white">Gloria</h4>
              </div> */}
            </div>
            {/* End Avatar */}
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 z-10">
          <div className="flex flex-col h-full p-4 sm:p-6">
            <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/80">
              {blog.title}
            </h3>
            <p className="mt-2 text-white/80">
              {blog.description.slice(0, 250)}
            </p>
          </div>
        </div>
      </Link>
    ))
  }


  return (
    <div>
      <>
        {/* Card Blog */}
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {/* Grid */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-2">
              <div className="dark:bg-slate-800 p-5 rounded-lg">
                <h3 className="font-bold mb-4">Categories</h3>
                {
                  blogCategories.map(category => (
                    <button onClick={() => { filterCategory(category) }} className="p-2 bg-green-500 text-white rounded-md block mb-3">
                      {category}
                    </button>
                  ))
                }
              </div>
            </div>
            <div className="col-span-10">

            <>
  {/* Hero */}
  <div className="relative overflow-hidden">
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-neutral-200">
          Insights
        </h1>
        <p className="mt-3 text-gray-600 dark:text-neutral-400">
          Stay in the know with insights from industry experts.
        </p>
        <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
          {/* Form */}
          <form>
            <div className="relative z-10 flex space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-gray-900/20">
              <div className="flex-[1_0_0%] ">
                <label
                  htmlFor="hs-search-article-1"
                  className="block text-sm text-gray-700 font-medium dark:text-white"
                >
                  <span className="sr-only">Search article</span>
                </label>
                <input
                  type="email"
                  name="hs-search-article-1"
                  id="hs-search-article-1"
                  className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Search article"
                />
              </div>
              <div className="flex-[0_0_auto] ">
                <a
                  className="size-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  href="#"
                >
                  <svg
                    className="flex-shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx={11} cy={11} r={8} />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </a>
              </div>
            </div>
          </form>
          {/* End Form */}
          {/* SVG Element */}
          <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
            <svg
              className="w-16 h-auto text-orange-500"
              width={121}
              height={135}
              viewBox="0 0 121 135"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                stroke="currentColor"
                strokeWidth={10}
                strokeLinecap="round"
              />
              <path
                d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                stroke="currentColor"
                strokeWidth={10}
                strokeLinecap="round"
              />
              <path
                d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                stroke="currentColor"
                strokeWidth={10}
                strokeLinecap="round"
              />
            </svg>
          </div>
          {/* End SVG Element */}
          {/* SVG Element */}
          <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
            <svg
              className="w-40 h-auto text-cyan-500"
              width={347}
              height={188}
              viewBox="0 0 347 188"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                stroke="currentColor"
                strokeWidth={7}
                strokeLinecap="round"
              />
            </svg>
          </div>
          {/* End SVG Element */}
        </div>
        <div className="mt-10 sm:mt-20">
          <a
            className="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            href="#"
          >
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width={20} height={14} x={2} y={7} rx={2} ry={2} />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            Business
          </a>
          <a
            className="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            href="#"
          >
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx={12} cy={12} r={3} />
            </svg>
            Strategy
          </a>
          <a
            className="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            href="#"
          >
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            Health
          </a>
          <a
            className="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            href="#"
          >
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
              <path d="M9 18h6" />
              <path d="M10 22h4" />
            </svg>
            Creative
          </a>
          <a
            className="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            href="#"
          >
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
              <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
              <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
              <path d="M10 6h4" />
              <path d="M10 10h4" />
              <path d="M10 14h4" />
              <path d="M10 18h4" />
            </svg>
            Environment
          </a>
          <a
            className="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            href="#"
          >
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
            </svg>
            Adventure
          </a>
        </div>
      </div>
    </div>
  </div>
  {/* End Hero */}
</>


              {displayBlogs()}
            </div>
          </div>
          {/* End Grid */}
        </div>
        {/* End Card Blog */}
      </>

    </div>
  );
}
