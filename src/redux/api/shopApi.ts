import { baseApi } from "@/redux/api/baseApi";

const shopUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all shops
    getAllShops: builder.query({
      query: () => ({
        url: "/shop-user/get-all-shops",
        method: "GET",
      }),
      providesTags: ["ShopUser"],
    }),

    // Get single shop
    getSingleShop: builder.query({
      query: (id) => ({
        url: `/shop-user/single-shop/${id}`,
        method: "GET",
      }),
      providesTags: ["ShopUser"],
    }),

    // Create new shop
    createShop: builder.mutation({
      query: (shopData) => ({
        url: "/shop-user/create-shop",
        method: "POST",
        data: shopData,
      }),
      invalidatesTags: ["ShopUser"],
    }),

    // Activate shop
    activateShop: builder.mutation({
      query: (id) => ({
        url: `/shop-user/active-shop/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["ShopUser"],
    }),

    editShop: builder.mutation({
      query: ({ id, data }) => ({
        url: `/shop-user/edit-shop/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["ShopUser"],
    }),

    // Delete shop
    deleteShop: builder.mutation({
      query: (id) => ({
        url: `/shop-user/delete-shop/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ShopUser"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllShopsQuery,
  useGetSingleShopQuery,
  useCreateShopMutation,
  useActivateShopMutation,
  useDeleteShopMutation,
  useEditShopMutation,
} = shopUserApi;
