import {FindAndCountOptions, ModelStatic} from "sequelize";
function getOffset(page: number, limit: number) {
  console.log((page * limit) - limit);
  return (page * limit) - limit;
}

function getNextPage(page: number, limit: number, total: number) {
  if ((total / limit) > page) {
    return page + 1;
  }

  return null
}

function getPreviousPage(page: number) {
  if (page <= 1) {
    return null
  }
  return page - 1;
}

export async function paginate(model:ModelStatic<any>, pageSize:any, pageLimit:any, search = {}, order = [], transform:any) {
  try {
    const limit = parseInt(pageLimit) || 10;
    const page = parseInt(pageSize) || 1;

    let limitOffset = {
      offset: getOffset(page, limit),
      limit
    }
    // create an options object
    let options: FindAndCountOptions = {
      
      ...limitOffset
    };

    // check if the search object is empty
    if (Object.keys(search).length) {
      options = { ...limitOffset, ...search };
    }

    // check if the order array is empty
    if (order && order.length) {
      options.order = order;
    }

    // take in the model, take in the options
    let { count, rows } = await model.findAndCountAll(options);

    // check if the transform is a function and is not null
    if (transform && typeof transform === 'function') {
      rows = transform(rows);
    }

    return {
      previousPage: getPreviousPage(page),
      currentPage: page,
      nextPage: getNextPage(page, limit, count),
      total: count,
      limit,
      data: rows
    }
  } catch (error) {
    console.log(error);
  }
}