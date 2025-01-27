import { parseQueryPagination } from 'rapiq';
import { SelectQueryBuilder } from 'typeorm';
import { QueryPaginationApplyOptions, QueryPaginationApplyOutput } from './type';

/**
 * Apply parsed page/pagination parameter data on the db query.
 *
 * @param query
 * @param data
 */
export function applyQueryPaginationParseOutput<T>(
    query: SelectQueryBuilder<T>,
    data: QueryPaginationApplyOutput,
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
    options?: QueryPaginationApplyOptions,
) : QueryPaginationApplyOutput {
    return applyQueryPaginationParseOutput(query, parseQueryPagination(data, options));
}

/**
 * Apply raw page/pagination parameter data on the db query.
 *
 * @param query
 * @param data
 * @param options
 */
export function applyPagination<T>(
    query: SelectQueryBuilder<T>,
    data: unknown,
    options?: QueryPaginationApplyOptions,
) : QueryPaginationApplyOutput {
    return applyQueryPagination(query, data, options);
}
