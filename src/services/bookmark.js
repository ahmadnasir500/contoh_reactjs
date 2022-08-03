import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../apis/firestore";

export const reqBookmark = createApi({
  reducerPath: "reqBookmark",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["bookmark"],
  endpoints: (buidler) => ({
    getBookmark: buidler.query({
      async queryFn() {
        try {
          const bookmarkRef = collection(db, "bookmark");
          const querySnapshot = await getDocs(bookmarkRef);
          let bookmark = [];
          querySnapshot?.forEach((doc) => [
            bookmark.push({
              id: doc.id,
              ...doc.data(),
            }),
          ]);
          return { data: bookmark };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["bookmark"],
    }),
    getSingleBookmark: buidler.query({
      async queryFn(id) {
        try {
          const docRef = doc(db, "bookmark", id);
          const snapshot = await getDoc(docRef);
          return { data: snapshot.data() };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["bookmark"],
    }),
    addBookmark: buidler.mutation({
      async queryFn(form) {
        try {
          await addDoc(collection(db, "bookmark"), {
            ...form,
            timestamp: serverTimestamp(),
          });
        } catch (err) {
          return { error: err };
        }
        return { data: "ok" };
      },
      invalidatesTags: ["bookmark"],
    }),
    deleteBookmark: buidler.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, "bookmark", id));
          return { data: "deleted" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["bookmark"],
    }),
    updateBookmark: buidler.mutation({
      async queryFn({ id, form }) {
        try {
          await updateDoc(doc(db, "bookmark", id), {
            ...form,
            timestamp: serverTimestamp(),
          });
          return { form: "updated" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["bookmark"],
    }),
  }),
});

export const {
  useGetBookmarkQuery,
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetSingleBookmarkQuery,
  useUpdateBookmarkMutation,
} = reqBookmark;