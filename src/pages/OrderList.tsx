import styled from "styled-components";
import Title from "../components/common/Title";
import { useOrders } from "../hooks/useOrders";
import { formatDate, formatNumber } from "../utils/format";
import Button from "../components/common/Button";
import { order } from "../api/order.api";
import React from "react";

function OrderList() {
  const { orders, selectedItemId, selectOrderItem } = useOrders();

  console.log(orders);

  return (
    <>
      <Title size="large">주문 내역</Title>
      <OrderListStyle>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>주문일자</th>
              <th>주소</th>
              <th>수령인</th>
              <th>전화번호</th>
              <th>대표상품명</th>
              <th>수량</th>
              <th>금액</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.orderId}>
                <tr>
                  <td>{order.orderId}</td>
                  <td>{formatDate(order.createdAt, "YYYY.MM.DD    ")}</td>
                  <td>{order.address}</td>
                  <td>{order.receiver}</td>
                  <td>{order.contact}</td>
                  <td>{order.bookTitle}</td>
                  <td>{order.totalQuantity} 권</td>
                  <td>{formatNumber(order.totalPrice)} 원</td>
                  <td>
                    <Button
                      size="small"
                      scheme="normal"
                      onClick={() => selectOrderItem(order.orderId)}
                    >
                      자세히
                    </Button>
                  </td>
                </tr>
                {selectedItemId === order.orderId && (
                  <tr>
                    <td></td>
                    <td colSpan={8}>
                      <ul className="detail">
                        {order?.detail &&
                          order.detail.map((item) => (
                            <li key={item.bookId}>
                              <div>
                                <span>{item.bookId}</span>
                                <span>{item.author}</span>
                                <span>{formatNumber(item.price)} 원</span>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </OrderListStyle>
    </>
  );
}

const OrderListStyle = styled.div`
  padding: 24px 0 0 0;

  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    border-bottom: 1px solid ${({ theme }) => theme.color.border};

    th,
    td {
      padding: 16px;
      border-bottom: 1px solid ${({ theme }) => theme.color.border};
      text-align: center;
    }

    .detail {
      margin: 0;
      li {
        list-style: square;
        text-align: left;
        div {
          display: flex;
          padding: 8px 12px;
          gap: 8px;
        }
      }
    }
  }

  @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 24px 0 0 0;

    table {
      width: 100%;
      border-collapse: collapse;
      border-top: 1px solid ${({ theme }) => theme.color.border};
      border-bottom: 1px solid ${({ theme }) => theme.color.border};

      /* 테이블이 화면을 넘을 경우 스크롤을 추가 */
      display: block;
      overflow-x: auto;
      white-space: nowrap;

      th,
      td {
        padding: 12px; /* 모바일에서 패딩을 줄여서 공간을 확보 */
        border-bottom: 1px solid ${({ theme }) => theme.color.border};
        text-align: center;
      }

      .detail {
        margin: 0;
        li {
          list-style: square;
          text-align: left;
          div {
            display: flex;
            padding: 6px 8px; /* 모바일에서 패딩을 줄여서 공간을 확보 */
            gap: 6px;
          }
        }
      }
    }
  }
`;

export default OrderList;
