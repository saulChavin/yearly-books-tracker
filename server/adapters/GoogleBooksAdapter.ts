import { BookRepository, Book } from '../domain/BookRepository';
import { fetchFromGoogleBooks, GoogleBookItem, GoogleBooksApiResponse } from '../services/googleBooks';

export class GoogleBooksAdapter implements BookRepository {
  async searchBooksBySubjects(subjects: string[]): Promise<Book[]> {
    const query = subjects.map(s => `subject:"${s.replace(/"/g, '\"')}"`).join(' OR ');
    // const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;
    const response = await fetchFromGoogleBooks<GoogleBooksApiResponse>(query);
    return (response.items || []).map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      cover: item.volumeInfo.imageLinks?.thumbnail || '',
    }));
  }

  async getBookById(id: string){
    const book = await fetchFromGoogleBooks<GoogleBookItem>('', id)
    console.log('book',book)
    if (!book) return null;

    return {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || [],
      cover: book.volumeInfo.imageLinks?.thumbnail || '',
      description: book.volumeInfo?.description || '',
    };
  }
}
