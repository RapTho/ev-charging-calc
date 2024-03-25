"use server";

import { fetchData } from "./getTotalkWh";

const getTableData = async (start, end) => {
  const data = fetchData(start, end);
  return data;
};

export default getTableData;
