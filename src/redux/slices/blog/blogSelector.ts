export const isLoadingBlogSelector = (state: { blogSlice: { isLoadingBlog: any; }; }) => state.blogSlice.isLoadingBlog;

export const blogDataSelector = (state: { blogSlice: { blogData: any[] }; }) => state.blogSlice.blogData;