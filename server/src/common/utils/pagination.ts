export const pagination = (page: any, limit: any) => {
  page = page ? page : 1;
  const take = limit ? limit : 10;
  const skip = page ? (page - 1) * take : 0;
  return { page, take, skip };
};
