import { BookRepository, Book } from '../domain/BookRepository';

export class GoogleBooksAdapter implements BookRepository {
  async searchBooksBySubjects(subjects: string[]): Promise<Book[]> {
    const query = subjects.map(s => `subject:"${s.replace(/"/g, '\"')}"`).join(' OR ');
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;
    const response = await $fetch(url) as { items?: any[] };
    return (response.items || []).map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      cover: item.volumeInfo.imageLinks?.thumbnail || '',
    }));
  }
}
