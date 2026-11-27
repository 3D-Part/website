// The site keeps its pages and the shop data for a day and makes them again
// only when the API says something changed (POST /api/revalidate drops
// everything tagged SITE_TAG). Short times here made every visited page be
// written again every minute, which a free Vercel plan cannot carry.
export const revalidateTime = 86400;
export const SITE_TAG = "shop";
/** What every cached call to the shop API passes to fetch. */
export const cached = { revalidate: revalidateTime, tags: [SITE_TAG] };
