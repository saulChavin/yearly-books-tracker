// No need to import $fetch, it's auto-available in Nuxt server context.
// If you were using this outside a Nuxt server handler (e.g. in a Nitro plugin directly),
// you might import `ofetch` from 'ofetch'.

interface Book {
  id: string;
  title: string;
  authors: string[];
  cover?: string;
  publishedDate?: string;
}

// Define a type for the expected Google Books API item structure for better type safety
interface GoogleBookItem {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    publishedDate?: string;
    // Add other fields you might need from volumeInfo
  };
  // Add other fields you might need from the item itself
}

interface GoogleBooksApiResponse {
  items?: GoogleBookItem[];
  // Add other fields from the API response if needed (e.g., totalItems)
}

export const fetchFromGoogleBooks = async (query: string): Promise<Book[]> => {
  try {
    // Use $fetch for making the HTTP request
    // $fetch automatically parses JSON and throws errors for non-2xx responses
    const responseData = await $fetch<GoogleBooksApiResponse>(`https://www.googleapis.com/books/v1/volumes`, {
      params: {
        q: query,
        maxResults: 40, // Limit the number of results
        // You can add other parameters like API keys, maxResults, etc. here
        // key: 'YOUR_GOOGLE_BOOKS_API_KEY' // If you have an API key
      }
    });

    return responseData.items?.map((item: GoogleBookItem) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [], // Ensure authors is always an array
      cover: item.volumeInfo.imageLinks?.thumbnail || item.volumeInfo.imageLinks?.smallThumbnail,
      publishedDate: item.volumeInfo.publishedDate,
    })) || [];
  } catch (error: any) {
    console.error(`Error fetching books from Google API for query "${query}":`, error.data || error.message || error);
    // You might want to throw a custom error or return an empty array
    // depending on how you want the calling API route to handle this.
    // For example, re-throwing allows the API route to catch and send a 500.
    throw new Error('Failed to fetch books from Google Books API.');
    // Or return [];
  }
};