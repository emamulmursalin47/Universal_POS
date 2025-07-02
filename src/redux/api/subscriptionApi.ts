import { baseApi } from "@/redux/api/baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all subscriptions
    getAllSubscriptions: builder.query({
      query: () => ({
        url: "/subscription",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),

    // Create new subscription
    createSubscription: builder.mutation({
      query: (subscriptionData) => ({
        url: "/subscription/create-subcription",
        method: "POST",
        data: subscriptionData,
      }),
      invalidatesTags: ["Subscription"],
    }),

    // Update subscription
    updateSubscription: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subscription/update/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["Subscription"],
    }),

    // Delete subscription
    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `/subscription/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllSubscriptionsQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionApi;
