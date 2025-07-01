import { axiosBaseQuery } from "@/helper/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:3000/api/v1" }),
  endpoints: () => ({}),
  tagTypes: ["User"],
});
