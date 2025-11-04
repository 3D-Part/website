import { useAppDispatch, useAppSelector } from '../hooks'
import { blogDataSelector, isLoadingBlogSelector } from '../slices/blog/blogSelector';
import { blogThunk } from '../thunks/blogThunk';

const useBlogApi = () => {
    const dispatch = useAppDispatch();

    const blogData = useAppSelector(blogDataSelector);
    const isLoadingBlog = useAppSelector(isLoadingBlogSelector);


    const fetchBlog = () => {
        dispatch(blogThunk());
    }

    return { blogData, isLoadingBlog, fetchBlog }
}

export default useBlogApi