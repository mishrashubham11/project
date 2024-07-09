'use client';
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

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



  const displayBlogs = () => {
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


              </div>
            </div>
            <div className="col-span-10">
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
