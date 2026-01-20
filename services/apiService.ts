
import { Notice, Article, PDFDocument, ApiResponse } from '../types';

// In a real scenario, this would point to your Cloudflare Worker URL
const API_BASE_URL = 'https://your-worker.your-subdomain.workers.dev/api';

/**
 * Mocking the API logic for the demonstration since actual Worker deployment 
 * is external. In a live app, these fetch the Cloudflare Worker endpoints.
 */
class ApiService {
  private isMock = true;

  private mockNotices: Notice[] = [
    {
      id: '1',
      title: 'Loksewa Aayog Kharidar Vacancy 2081',
      category: 'Government',
      tags: ['Loksewa', 'Job'],
      content: 'Public Service Commission (PSC) announces vacancy for various technical and non-technical positions...',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      createdAt: new Date().toISOString(),
      viewCount: 1250
    },
    {
      id: '2',
      title: 'Myadi Police Result - Kathmandu District',
      category: 'Government',
      tags: ['Myadi', 'Exam'],
      content: 'The final result for Myadi Police selection for the upcoming elections has been published...',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      createdAt: new Date().toISOString(),
      viewCount: 3400
    },
    {
      id: '3',
      title: 'TU Exam Result - BBS 4th Year',
      category: 'Result',
      tags: ['University', 'Exam'],
      content: 'Tribhuvan University (TU) has published the results of BBS 4th Year examinations...',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      createdAt: new Date().toISOString(),
      viewCount: 890
    }
  ];

  async getNotices(category?: string): Promise<Notice[]> {
    if (this.isMock) {
      return category ? this.mockNotices.filter(n => n.category === category) : this.mockNotices;
    }
    const res = await fetch(`${API_BASE_URL}/notices${category ? `?category=${category}` : ''}`);
    const json = await res.json();
    return json.data;
  }

  async getArticles(): Promise<Article[]> {
    return [
      {
        id: '1',
        title: 'How to Prepare for Loksewa Exams 2081',
        excerpt: 'Preparation tips, syllabus breakdown, and key strategies for success in PSC exams.',
        content: 'Long content about Loksewa prep...',
        author: 'Nabin Sharma',
        imageUrl: 'https://picsum.photos/seed/loksewa/800/400',
        createdAt: new Date().toISOString()
      }
    ];
  }

  async uploadFile(file: File): Promise<string> {
    // Logic to upload to Cloudflare R2 via Worker
    if (this.isMock) {
      return URL.createObjectURL(file);
    }
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData
    });
    const json = await res.json();
    return json.url;
  }

  async createNotice(notice: Omit<Notice, 'id' | 'createdAt' | 'viewCount'>): Promise<ApiResponse<Notice>> {
    if (this.isMock) {
      const newNotice: Notice = {
        ...notice,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        viewCount: 0
      };
      this.mockNotices.push(newNotice);
      return { success: true, data: newNotice };
    }
    const res = await fetch(`${API_BASE_URL}/notices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notice)
    });
    return await res.json();
  }
}

export const api = new ApiService();
