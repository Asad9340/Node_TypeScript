type paginationSortingHelperType = {
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

const paginationSortingHelper = (options: paginationSortingHelperType) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = options;
  const skip = (Number(page) - 1) * Number(limit);
  const orderBy: any = {};
  if (sortBy && sortOrder) {
    orderBy[sortBy] = sortOrder;
  }
  return { skip, take: Number(limit), orderBy };
};
export default paginationSortingHelper;
