import React from 'react'
import BlogItem from './BlogItem'
import useBlogApi from '@/redux/api/useBlogApi'

const BlogGrid = () => {
    const { blogData } = useBlogApi();

    return (
        <div className='mt-6 lg:mt-8 px-4 lg:px-0 grid grid-cols-1 lg:grid-cols-3 gap-5 mx-'>
            {
                blogData && blogData.map((blog: any) => {
                    return (
                        <BlogItem key={blog.id} data={blog} />

                    );
                })
            }
            {/* <BlogItem w={300} />
            <BlogItem /> */}
        </div>
    )
}

export default BlogGrid