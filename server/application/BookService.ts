import { BookRepository, Book } from '../domain/BookRepository';

export class BookService {
  constructor(private bookRepo: BookRepository) {}

  async getRecommendedBooks(subjects: string[]): Promise<Book[]> {
    if (!subjects.length) throw new Error('No subjects provided');
    return this.bookRepo.searchBooksBySubjects(subjects);
  }
}
