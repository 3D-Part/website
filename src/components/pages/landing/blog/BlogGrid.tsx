import React from 'react'
import BlogItem from './BlogItem'

const BlogGrid = () => {
    return (
        <div className='mt-6 lg:mt-8 px-4 lg:px-0 grid grid-cols-1 lg:grid-cols-3 gap-5 mx-'>
            <BlogItem w={300} />
            <BlogItem />
            <BlogItem />
        </div>
    )
}

export default BlogGrid