export interface Book {
  id: string;
  title: string;
  authors: string[];
  cover: string;
}

export interface BookRepository {
  searchBooksBySubjects(subjects: string[]): Promise<Book[]>;
}
