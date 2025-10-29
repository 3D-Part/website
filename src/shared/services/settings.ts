import { ISettings } from "@/redux/slices/settings/settingsSlice";
import API from "../helper/api";

const fetchSettings = async () => {
    try {
        const response = await API.get(
            "shop/settings"
        );
        return response as ISettings['data'];
    } catch (error) {
        throw new Error("Failed to fetch coupons");
    }
}

export const settingsService = {
    fetchSettings
}