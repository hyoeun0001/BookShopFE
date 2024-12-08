import React from "react";
import { getByAltText, render } from "@testing-library/react";
import BookItem from "./BookItem";
import { BookStoreThemeProvider } from "../../context/themeContext";

const dummyBook = {
  id: 1,
  title: "책 제목1",
  img: 5,
  form: "종이책",
  isbn: "0",
  summary: "내용요약1...",
  detail: "책 설명1...",
  author: "최땡땡",
  pages: 100,
  contents: "목차",
  price: 20000,
  likes: 3,
  pubDate: "2019-01-01",
  categoryId: 1,
};

describe("BookItem", () => {
  it("랜더 여부", () => {
    const { getByText, getByAltText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );

    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText("20,000원")).toBeInTheDocument();
    expect(getByText(dummyBook.likes)).toBeInTheDocument();
    expect(getByAltText(dummyBook.title)).toHaveAttribute(
      "src",
      `https://picsum.photos/id/${dummyBook.img}/600/600`
    );
  });
});
