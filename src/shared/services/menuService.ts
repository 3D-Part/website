import API from "../helper/api";
import { MenuItem } from "../types";

type MenuResponseType = {
    createdAt: string,
    id: string,
    menu: { items: MenuItem[] }
    updatedAt: string
}

const fetchMenuItems = async (
) => {
    try {
        const response = await API.get<MenuResponseType>(
            "shop/menu",
        );

        return response;
    } catch (error) {
        throw new Error("Failed to fetch coupons");
    }
};

export const menuService = { fetchMenuItems };
