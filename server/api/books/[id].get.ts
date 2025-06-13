import { defineEventHandler, getQuery, createError } from 'h3';
import { GoogleBooksAdapter } from '../../adapters/GoogleBooksAdapter';
import { BookService } from '../../application/BookService';

export default defineEventHandler(async (event) => {
	//path param
	const id = getRouterParam(event, 'id')
	if (!id || typeof id !== 'string' || id.trim() === '') {
		throw createError({
			statusCode: 400,
			statusMessage: 'Path parameter "id" is required and must be a non-empty string.',
		});
	}

	try {
		const bookRepo = new GoogleBooksAdapter();
		const bookService = new BookService(bookRepo);
		const books = await bookService.getBookById(id);
		return books;
	} catch (err: any) {
		console.error('Error fetching from Google Books:', err);
		throw createError({
			statusCode: 500,
			statusMessage: err.message || 'An internal server error occurred while searching for books.',
		});
	}
});