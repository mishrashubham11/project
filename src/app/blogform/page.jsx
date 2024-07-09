'use client';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const categories = [
  'Web Development',
  'Frontend',
  'Backend',
  'Artificial Intelligence',
  'Cross Platform App Development',
  'Software Development'
]

const BlogForm = () => {

  const [blogContent, setBlogContent] = useState('');

  const blogForm = useFormik({
    initialValues: {
      title: '',
      description: '',
      content: '',
      cover: '',
      category: ''
    },
    onSubmit: (values, { resetForm }) => {
      values.content = blogContent;
      console.log(values);
      axios.post('http://localhost:5000/blog/add', values)     //conecting backend with frontend  //value bhejna h isliye value
        .then((result) => {         //using thenc for reading reponse kuki uper rqst kia h
          console.log(result.status);  //200,500
          toast.success('blog added successfully')
          resetForm()
        }).catch((err) => {
          console.log(err);
          toast.error('some error occured')
        });
    }
  })

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("myfile", file);
    fetch("http://localhost:5000/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        blogForm.setFieldValue('cover', file.name);
        console.log("file uploaded");
      }
    });
  };

  return (
    <div className='mt-10'>
      <>
        {/* Comment Form */}
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <h2 className="text-xl text-gray-800 font-bold sm:text-3xl dark:text-white">
                Post a Blog
              </h2>
            </div>
            {/* Card */}
            <div className="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10 dark:bg-neutral-900 dark:border-neutral-700">
              <form onSubmit={blogForm.handleSubmit}>
                <div className="mb-4 sm:mb-8">
                  <label
                    htmlFor="hs-feedback-post-comment-name-1"
                    className="block mb-2 text-sm font-medium dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    onChange={blogForm.handleChange}
                    value={blogForm.values.title}
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="title..."
                  />
                </div>

                <div className="mb-4 sm:mb-8">
                  <label
                    htmlFor="hs-feedback-post-comment-name-1"
                    className="block mb-2 text-sm font-medium dark:text-white"
                  >
                    Cover
                  </label>
                  <input
                    type="file"
                    onChange={uploadFile}
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="cover..."
                  />
                </div>

                <div className="mb-4 sm:mb-8">
                  <label
                    htmlFor="hs-feedback-post-comment-name-1"
                    className="block mb-2 text-sm font-medium dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    type="text"
                    id="category"
                    onChange={blogForm.handleChange}
                    value={blogForm.values.category}
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="category..."
                  >
                    <option value="">Select Category</option>
                    {
                      categories.map(category => (
                        <option value={category}>{category}</option>
                      ))
                    }
                  </select>
                </div>

                <div className="mb-4 sm:mb-8">
                  <label
                    htmlFor="hs-feedback-post-comment-email-1"
                    className="block mb-2 text-sm font-medium dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    rows={4}
                    id="description"
                    onChange={blogForm.handleChange}
                    value={blogForm.values.description}
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Description..."
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="hs-feedback-post-comment-textarea-1"
                    className="block mb-2 text-sm font-medium dark:text-white"
                  >
                    Content
                  </label>
                  <div className="mt-1">
                    <MDEditor
                      value={blogContent}
                      onChange={setBlogContent}
                    />
                  </div>
                </div>
                <div className="mt-6 grid">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            {/* End Card */}
          </div>
        </div>
        {/* End Comment Form */}
      </>

    </div>
  )
}

export default BlogForm