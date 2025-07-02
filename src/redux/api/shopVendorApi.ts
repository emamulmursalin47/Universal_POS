import { baseApi } from "@/redux/api/baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all vendors
    getAllVendors: builder.query({
      query: (queryParams) => ({
        url: "/vendor/all-vendor",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["Shop"],
    }),

    // Accept vendor
    acceptVendor: builder.mutation({
      query: (data) => ({
        url: "/vendor/accept-vendor",
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["Shop"],
    }),

    // Get shops report
    getShopsReport: builder.query({
      query: () => ({
        url: "/vendor/shops-report",
        method: "GET",
      }),
      providesTags: ["Shop"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllVendorsQuery,
  useAcceptVendorMutation,
  useGetShopsReportQuery,
} = shopApi;
