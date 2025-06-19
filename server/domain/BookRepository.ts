

export interface Book {
  id: string;
  title: string;
  authors: string[];
  cover?: string;
  description?: string; // Optional, as not all books may have a description
}

export interface BookRepository {
  searchBooksBySubjects(subjects: string[]): Promise<Book[]>;
  getBookById(id: string): Promise<Book | null>;
}
