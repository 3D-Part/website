import { notify } from "@/components/common/toast/Toastify";
import {

    IContactFormBody,
} from "@/shared/types";


const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const contactUs = async (body: IContactFormBody) => {
    const LOGIN_ENDPOINT = "shop/contact";

    const url = `${API_BASE_URL}${LOGIN_ENDPOINT}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        let data = null;


        if (response.status === 204) {
            notify("Poruka poslana", { type: "success" });
            data = { data: {}, status: "success" };

            return data;
        } else if (response.status === 400) {
            const json = await response.json();
            // expected shape: { key, message, errors: [...] }
            const errMsg =
                (json && (json.message || json.key)) ||
                (json.errors && json.errors.map((it: any) => it.message).join(", ")) ||
                "Validation failed";
            notify(errMsg, { type: "error" });

            data = { result: json, message: json.message || errMsg, status: "error" };
            return data;

        } else {
            const text = await response.text();
            throw new Error(`Server error: ${response.status} ${text}`);
        }

    } catch (error: any) {
        console.error("Error during contactUs:", error);
        notify("Network error", { type: "error" });
        return { status: "error", message: error?.message || "Network error" };
    }
};





const contactService = {
    contactUs

};

export default contactService;
