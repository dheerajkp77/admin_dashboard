import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = (props) => {
  return (
    <div className="d-flex align-item-center justify-content-between m-2">
      <div>
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"page-item"}
          forcePage={props?.page - 1}
          pageCount={Math.ceil(props?.totalPages ?? 1)}
          marginPagesDisplayed={3}
          onPageChange={(e) => props?.setPage(e.selected + 1)}
          renderOnZeroPageCount={null}
          containerClassName={"pagination position-relative mt-2 pt-3"}
          pageClassName={"page-item"}
          previousClassName={`page-item`}
          previousLinkClassName={"pagination__link"}
          nextClassName={"page-item"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
          breakLinkClassName={"page-link"}
        />
      </div>
    </div>
  );
};

export default Pagination;
