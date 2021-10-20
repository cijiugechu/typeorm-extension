import {PaginationParseOutput, PaginationParseOptions, parseQueryPagination} from "@trapi/query";
import {SelectQueryBuilder} from "typeorm";

/**
 * Apply parsed page/pagination parameter data on the db query.
 *
 * @param query
 * @param data
 */
export function applyParsedQueryPagination<T>(
    query: SelectQueryBuilder<T>,
    data: PaginationParseOutput
) {
    /* istanbul ignore next */
    if (typeof data.limit !== 'undefined') {
        query.take(data.limit);

        if (typeof data.offset === 'undefined') {
            query.skip(0);
        }
    }

    /* istanbul ignore next */
    if (typeof data.offset !== 'undefined') {
        query.skip(data.offset);
    }

    return data;
}

/**
 * Apply raw page/pagination parameter data on the db query.
 *
 * @param query
 * @param data
 * @param options
 */
export function applyQueryPagination<T>(
    query: SelectQueryBuilder<T>,
    data: unknown,
    options?: PaginationParseOptions
) : PaginationParseOutput {
    return applyParsedQueryPagination(query, parseQueryPagination(data, options));
}