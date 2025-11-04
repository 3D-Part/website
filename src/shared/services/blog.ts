import axios from "axios";

const fetchBlog = async () => {
    try {
        const response = await axios.get(
            'https://blog.3dpartshop.com/wp-json/wp/v2/posts?per_page=3&_embed'
        );

        return response as any;
    } catch (error) {
        throw new Error("Failed to fetch coupons");
    }
}

export const blogService = {
    fetchBlog
}