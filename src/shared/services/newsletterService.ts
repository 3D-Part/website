import API from "../helper/api";

interface NewsletterPayload {
  email: string;
}

const subscribeToNewsletter = async (
  email: string
): Promise<NewsletterPayload> => {
  try {
    const response = await API.post<NewsletterPayload, NewsletterPayload>(
      "shop/subscriber",
      { email }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const newsletterService = { subscribeToNewsletter };
