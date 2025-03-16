import { AxiosError } from "axios";
import { Book, BookDetail } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient } from "./http";

interface FetchBooksParams {
  categoryId?: number;
  news?: boolean;
  currentPage?: number;
  limit: number;
}

interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const response = await httpClient.get<FetchBooksResponse>("/api/books", {
      params: params,
    });

    return response.data;
  } catch (error) {
    return {
      books: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
      },
    };
  }
};

export const fetchBook = async (bookId: string) => {
  try{
    const response = await httpClient.get<BookDetail>(`/api/books/${bookId}`);
    return response.data;
  }catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 403) {
      alert("로그인이 필요합니다.");
      window.location.href = "/login"; // 로그인 페이지로 리다이렉트
    } else {
      console.error("요청 오류:", axiosError.message);
    }
  }
};

export const likeBook = async (bookId: number) => {
  const response = await httpClient.post(`/api/like/${bookId}`);
  return response.data;
};

export const unlikeBook = async (bookId: number) => {
  const response = await httpClient.delete(`/api/like/${bookId}`);
  return response.data;
};

export const fetchBestBooks = async () => {
  const response = await httpClient.get<Book[]>(`/api/books/best`);
  return response.data;
};
