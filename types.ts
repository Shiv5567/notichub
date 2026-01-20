
export type Category = 'Government' | 'Non-Government' | 'Result' | 'Vaccine' | 'Scholarship';
export type Tag = 'Myadi' | 'Loksewa' | 'University' | 'College' | 'Exam' | 'Job';

export interface Notice {
  id: string;
  title: string;
  category: Category;
  tags: Tag[];
  content: string;
  fileUrl?: string;
  createdAt: string;
  viewCount: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  imageUrl: string;
  createdAt: string;
}

export interface PDFDocument {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  category: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
