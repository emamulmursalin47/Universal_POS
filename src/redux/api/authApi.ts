import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (userInfo) => {
        // console.log("Register userInfo:", userInfo);
        return {
          url: "/user/register",
          method: "POST",
          data: userInfo,
        };
      },
      invalidatesTags: ["User"],
    }),

    changePassword: builder.mutation({
      query: (passInfo) => ({
        url: "/auth/change-password",
        method: "POST",
        data: passInfo,
      }),
      invalidatesTags: ["User"],
    }),
    forgetPass: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/forget-password",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/auth/reset-password-into/${id}`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useForgetPassMutation,
  useResetPasswordMutation,
} = authApi;
