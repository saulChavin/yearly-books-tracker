import { defineEventHandler, getQuery, createError } from 'h3';
import { GoogleBooksAdapter } from '../../adapters/GoogleBooksAdapter';
import { BookService } from '../../application/BookService';

export default defineEventHandler(async (event) => {
  const queryParams = getQuery(event);
  const q = queryParams.q;
  const maxResults = queryParams.maxResults || 10;
  const startIndex = queryParams.startIndex || 0;

  if (!q || typeof q !== 'string' || q.trim() === '') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Query parameter "q" is required and must be a non-empty string.',
    });
  }

  // Parse the query back to subjects (comma-separated list expected)
  const subjects = decodeURIComponent(q).split(',').map(s => s.trim()).filter(Boolean);

  try {
    const bookRepo = new GoogleBooksAdapter();
    const bookService = new BookService(bookRepo);
    const books = await bookService.getRecommendedBooks(subjects);
    return books;
  } catch (err: any) {
    console.error('Error fetching from Google Books:', err);
    throw createError({
      statusCode: 500,
      statusMessage: err.message || 'An internal server error occurred while searching for books.',
    });
  }
});