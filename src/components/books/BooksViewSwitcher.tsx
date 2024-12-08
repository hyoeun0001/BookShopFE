import styled from "styled-components";
import Button from "../common/Button";
import { FaList, FaTh } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";
import { useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const viewOptions = [
  {
    value: "list",
    icon: <FaList />,
  },
  {
    value: "grid",
    icon: <FaTh />,
  },
];

export type ViewMode = "grid" | "list";

function BooksViewSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSwitch = (value: ViewMode) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERYSTRING.VIEW, value);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if (!searchParams.get(QUERYSTRING.VIEW)) {
      handleSwitch("grid");
    }
  }, []);

  const { isMobile } = useMediaQuery();

  return (
    <BooksViewSwitcherStyle>
      {viewOptions.map((option) => (
        <Button
          key={option.value}
          size={isMobile ? "small" : "medium"}
          scheme={
            searchParams.get(QUERYSTRING.VIEW) === option.value
              ? "primary"
              : "normal"
          }
          onClick={() => handleSwitch(option.value as ViewMode)}
        >
          {option.icon}
        </Button>
      ))}
    </BooksViewSwitcherStyle>
  );
}

const BooksViewSwitcherStyle = styled.div`
  display: flex;
  gap: 8px;
  svg {
    fill: #fff;
  }

  @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
    display: flex;
    gap: 4px;
    svg {
      fill: #fff;
    }
  }
`;

export default BooksViewSwitcher;
