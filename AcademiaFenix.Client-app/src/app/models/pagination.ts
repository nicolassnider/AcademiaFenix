export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResults<T> {
    data: T;
    pagination: Pagination;

    constructor(data: T, pagination: Pagination) {
        this.data = data;
        this.pagination = pagination;
    }
}

export class PagingParams {
    pageNumber: number=1;
    pageSize: number=2;

    constructor(pageNumber: number = 1, pageSize: number = 2) {
        console.log('PagingParams constructor')
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        console.log(this)

    }
}