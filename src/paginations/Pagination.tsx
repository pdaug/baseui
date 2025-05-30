import { CaretLeft, CaretRight } from "@phosphor-icons/react";

// styles
import "./Pagination.css";

export type PaginationProps = {
  data?: boolean;
  pageCurrent: number;
  pageSize: number;
  itemsTotal: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = function ({
  data,
  pageCurrent,
  pageSize = 10,
  itemsTotal,
  setPage,
}: PaginationProps) {
  const pageTotal = Math.ceil(itemsTotal / pageSize);

  const GoPageStart = function () {
    setPage(1);
    return;
  };

  const GoPageEnd = function () {
    setPage(pageTotal);
    return;
  };

  const GoPageBack = function () {
    setPage(pageCurrent - 1);
    return;
  };

  const GoPageNext = function () {
    setPage(pageCurrent + 1);
    return;
  };

  const GoPage = function (value: number, operation: "add" | "sub") {
    if (operation === "add") {
      setPage(pageCurrent + value);
    }
    if (operation === "sub") {
      setPage(pageCurrent - value);
    }
    return;
  };

  return (
    <div className="fz-pagination">
      {data && (
        <div className="fz-pagination-data">
          <span>Mostrando</span>
          <b>{pageCurrent}</b>
          <span>de</span>
          <b>{pageTotal}</b>
          <span>páginas -</span>
          <b>{itemsTotal}</b>
          <span>items</span>
        </div>
      )}
      <div className="fz-pagination-buttons">
        <button
          onClick={GoPageStart}
          disabled={pageCurrent === 1}
          className="fz-pagination-button-left"
        >
          <CaretLeft />
        </button>
        {pageCurrent === pageTotal && (
          <button
            onClick={() => GoPage(2, "sub")}
            className={`fz-pagination-button-center`}
          >
            {pageCurrent - 2}
          </button>
        )}
        {pageCurrent - 1 > 0 && (
          <button
            onClick={GoPageBack}
            disabled={pageCurrent - 1 <= 0}
            className={`fz-pagination-button-center`}
          >
            {pageCurrent - 1}
          </button>
        )}
        <button
          className={`fz-pagination-button-center fz-pagination-button-selected`}
        >
          {pageCurrent}
        </button>
        {pageCurrent + 1 <= pageTotal && (
          <button
            onClick={GoPageNext}
            disabled={pageCurrent + 1 > pageTotal}
            className={`fz-pagination-button-center`}
          >
            {pageCurrent + 1}
          </button>
        )}
        {pageCurrent - 1 === 0 && (
          <button
            onClick={() => GoPage(2, "add")}
            className={`fz-pagination-button-center`}
          >
            {pageCurrent + 2}
          </button>
        )}
        <button
          onClick={GoPageEnd}
          disabled={pageCurrent === pageTotal}
          className="fz-pagination-button-right"
        >
          <CaretRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
