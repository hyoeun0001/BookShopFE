import styled from "styled-components";
import { useCategory } from "../../hooks/useCategory";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function BooksFilter() {
  const { category } = useCategory();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategory = (category_id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (category_id === null) {
      newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
    } else {
      newSearchParams.set(QUERYSTRING.CATEGORY_ID, category_id.toString());
    }

    setSearchParams(newSearchParams);
  };

  const handleNews = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.get(QUERYSTRING.NEWS)) {
      newSearchParams.delete(QUERYSTRING.NEWS);
    } else {
      newSearchParams.set(QUERYSTRING.NEWS, "true");
    }

    setSearchParams(newSearchParams);
  };

  const { isMobile } = useMediaQuery();

  return (
    <BooksFilterStyle>
      <div className="category">
        {category.map((item) => (
          <Button
            size={isMobile ? "small" : "medium"}
            scheme={item.isActive ? "primary" : "normal"}
            key={item.category_id}
            onClick={() => handleCategory(item.category_id)}
          >
            {item.category_name}
          </Button>
        ))}
      </div>
      <div className="new">
        <Button
          size={isMobile ? "small" : "medium"}
          scheme={searchParams.get("news") ? "primary" : "normal"}
          onClick={() => handleNews()}
        >
          신간
        </Button>
      </div>
    </BooksFilterStyle>
  );
}

const BooksFilterStyle = styled.div`
  display: flex;
  gap: 24px;

  .category {
    display: flex;
    gap: 8px;
  }

  @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
    display: flex;
    gap: 4px;
  }
`;

export default BooksFilter;
