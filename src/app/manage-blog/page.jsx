'use client';     //for client site
import axios from 'axios'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const ManageBlog = () => {

    const [blogList, setBlogList] = useState([])   //USESTATE impoet and snippet use


    const fetchBlogData = () => {
        axios.get('http://localhost:5000/blog/getall') //read operation from backend
            .then((result) => {
                console.table(result.data);   // tabular form me data inspect console me dega
                setBlogList(result.data)  // data jo console me read ho rha tha ab use state aur isse page per ayega
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

    return (
        <div>
            <>
                {/* Table Section */}
                <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                    {/* Card */}
                    <div className="flex flex-col">
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                                    {/* Header */}
                                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                                                Blogs
                                            </h2>
                                            <p className="text-sm text-gray-600 dark:text-neutral-400">
                                                Add blogs, edit and more.
                                            </p>
                                        </div>
                                        <div>
                                            <div className="inline-flex gap-x-2">
                                                <a
                                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                                    href="#"
                                                >
                                                    View all
                                                </a>
                                                <a
                                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
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
                                                        <path d="M5 12h14" />
                                                        <path d="M12 5v14" />
                                                    </svg>
                                                    Add Blog
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End Header */}
                                    {/* Table */}
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                        <thead className="bg-gray-50 dark:bg-neutral-800">
                                            <tr>
                                                <th></th>
                                                <th
                                                    scope="col"
                                                    className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start"
                                                >
                                                    <div className="flex items-center gap-x-2">
                                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                                            Title
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-start">
                                                    <div className="flex items-center gap-x-2">
                                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                                            Description
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-start">
                                                    <div className="flex items-center gap-x-2">
                                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                                            Posted On
                                                        </span>
                                                    </div>
                                                </th>

                                                <th scope="col" className="px-6 py-3 text-start">
                                                    <div className="flex items-center gap-x-2">
                                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                                            Remove
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-end" />
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                            {
                                                blogList.map((blog) => {
                                                    return (
                                                        <tr key={blog._id}>

                                                            <td className="whitespace-nowrap">
                                                                <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                                                    <div className="flex items-center gap-x-3">
                                                                        <img
                                                                            className="inline-block w-20"
                                                                            src={'http://localhost:5000/' + blog.cover}
                                                                            alt="Image Description"
                                                                        />
                                                                        <div className="grow">
                                                                            <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                                                                {blog.title}
                                                                            </span>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="h-px whitespace-nowrap">
                                                                <div className="px-6 py-3">
                                                                    <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                                                        {blog.description}
                                                                    </span>

                                                                </div>
                                                            </td>
                                                            <td className="text-white size-px whitespace-nowrap">
                                                                <div className="px-6 py-3">
                                                                    <p>{blog.category}</p>
                                                                </div>
                                                            </td>

                                                            <td className="size-px whitespace-nowrap">
                                                                <div className="px-6 py-3">
                                                                    <span className="text-sm text-gray-500 dark:text-neutral-500">
                                                                        {new Date(blog.createdAt).toDateString()}
                                                                    </span>
                                                                </div>
                                                            </td>

                                                            <td className="size-px whitespace-nowrap">
                                                                <div className="px-6 py-1.5">
                                                                    <button
                                                                        onClick={() => { deleteBlog(blog._id) }}    //delete button work fron its upper fuction
                                                                        className="inline-flex items-center gap-x-1 text-sm text-red-600 decoration-2 hover:underline font-medium dark:text-red-500"

                                                                    >
                                                                        Remove-blog
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    {/* End Table */}
                                    {/* Footer */}
                                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-neutral-400">
                                                <span className="font-semibold text-gray-800 dark:text-neutral-200">
                                                    12
                                                </span>{" "}
                                                results
                                            </p>
                                        </div>
                                        <div>
                                            <div className="inline-flex gap-x-2">
                                                <button
                                                    type="button"
                                                    className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
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
                                                        <path d="m15 18-6-6 6-6" />
                                                    </svg>
                                                    Prev
                                                </button>
                                                <button
                                                    type="button"
                                                    className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                                >
                                                    Next
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
                                                        <path d="m9 18 6-6-6-6" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End Footer */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Card */}
                </div>
                {/* End Table Section */}
            </>

        </div>
    )
}

export default ManageBlog;