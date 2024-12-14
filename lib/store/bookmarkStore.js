import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useBookmarkStore = create(
  persist(
    (set) => ({
      bookmarks: [],
      addBookmark: (exam) =>
        set((state) => ({
          bookmarks: [...state.bookmarks, exam],
        })),
      removeBookmark: (examId) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== examId),
        })),
      isBookmarked: (examId) =>
        set((state) => state.bookmarks.some((bookmark) => bookmark.id === examId)),
    }),
    {
      name: 'bookmarks-storage',
    }
  )
);

export default useBookmarkStore;