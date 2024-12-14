import { Bookmark } from 'lucide-react';
import useBookmarkStore from '@/lib/store/bookmarkStore';

export default function BookmarkButton({ exam, category }) {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkStore();
  const isBookmarked = bookmarks.some(b => b.id === exam.id);

  const toggleBookmark = (e) => {
    e.preventDefault(); // Prevent link click
    e.stopPropagation(); // Prevent event bubbling
    if (isBookmarked) {
      removeBookmark(exam.id);
    } else {
      addBookmark(exam);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`
        p-3 rounded-lg transition-all duration-200
        ${isBookmarked 
          ? `${category.bgColor} ${category.color}`
          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
        }
      `}
    >
      <Bookmark 
        className="w-6 h-6"
        fill={isBookmarked ? 'currentColor' : 'none'}
      />
    </button>
  );
}