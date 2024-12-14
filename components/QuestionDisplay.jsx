import React, { useState } from 'react';
import { Flag, XCircle, BookmarkPlus, BookmarkCheck, MessageSquare, AlertTriangle, Check, X } from 'lucide-react';

// MCQChoice handles individual answer choices in the question
const MCQChoice = ({ index, choice, selected, correct, revealed, onClick }) => {
  // Determine styling based on whether the answer is revealed or selected
  const getChoiceStyle = () => {
    if (!revealed) return selected ? 'bg-blue-100 border-blue-300' : 'border-[#99B0C0] hover:bg-gray-50';
    if (index === correct) return 'bg-green-100 border-green-300';
    if (revealed && index !== correct) return 'bg-red-100 border-red-300';
    return selected ? 'opacity-100' : 'opacity-50';
  };

  // Render the choice button with appropriate styling and interactivity
  return (
    <button
      onClick={() => onClick(index)}
      disabled={revealed || selected}
      className={`w-full p-4 border-2 border-[#99B0C0] rounded-lg mb-2 text-left transition-all ${getChoiceStyle()} flex justify-between items-center`}
    >
      <div className="flex-1">
        <span className="font-medium mr-2 text-xl">{String.fromCharCode(65 + index)}.</span>
        <span className="text-lg">{choice}</span>
      </div>
      <div className="flex items-center">
        {revealed && index === correct && (
          <Check className="text-green-700" size={24} />
        )}
        {revealed && selected && index !== correct && (
          <X className="text-red-700 " size={24} />
        )}
      </div>
    </button>
  );
};

// FeedbackDropdown manages a dropdown for reporting feedback on the question
const FeedbackDropdown = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { label: 'Incorrect Answer', icon: AlertTriangle },
    { label: 'Typo', icon: XCircle },
    { label: 'Unclear Question', icon: AlertTriangle },
    { label: 'Other', icon: MessageSquare },
  ];

  // Render feedback dropdown options
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100"
      >
        <AlertTriangle size={24} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                onSubmit(option.label);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-lg"
            >
              <option.icon size={20} />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// QuestionCard handles the display and interaction of a single question card
const QuestionCard = ({ item, showAnswers, type }) => {
  const [selectedChoice, setSelectedChoice] = useState(null); // Tracks selected answer
  const [revealed, setRevealed] = useState(false); // Tracks if correct answer is revealed
  const [isBookmarked, setIsBookmarked] = useState(false); // Tracks if question is bookmarked
  const [comments, setComments] = useState([]); // Stores user comments
  const [showCommentInput, setShowCommentInput] = useState(false); // Toggles comment input field
  const [newComment, setNewComment] = useState(''); // Holds new comment text

  const handleChoiceSelect = (index) => {
    if (selectedChoice === null) {
      setSelectedChoice(index);
      setRevealed(true);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
      setShowCommentInput(false);
    }
  };

  const handleFeedback = (type) => {
    console.log(`Feedback submitted: ${type}`);
    // Handle feedback submission
  };

  // Render the question card UI
  return (
    <div className="bg-white border  p-6 rounded-lg mb-4 shadow-sm border-2 border-gray-400">
      <div className="flex  items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{item.emoji}</span>
          <span className="text-xl font-medium text-blue-800">{item.topic}</span>
        </div>
        <div className="flex items-center gap-2 ">
          <span className="text-lg text-gray-500">QID: {item.id}</span>
          {type === 'flagged' && (
            <div className="flex items-center gap-2">
              <Flag className="text-yellow-500" size={24} />
              <span className="text-lg text-gray-500">{item.flagReason}</span>
            </div>
          )}
        </div>
      </div>

      <p className="text-2xl text-gray-800 mb-6 ">{item.question}</p>

      <div className="space-y-3 bg-[#F7F7F7]">
        {item.choices?.map((choice, index) => (
          <MCQChoice
            key={index}
            index={index}
            choice={choice}
            selected={selectedChoice === index}
            correct={item.correctAnswer}
            revealed={revealed}
            onClick={handleChoiceSelect}
          />
        ))}
      </div>

      {showAnswers && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-lg text-gray-700">{item.answer}</p>
          {item.commonMistake && (
            <p className="text-red-600 text-lg mt-2">
              Common mistake: {item.commonMistake}
            </p>
          )}
        </div>
      )}

      <div className="mt-6 flex justify-end items-center gap-4">
        <button
          onClick={() => setShowCommentInput(!showCommentInput)}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
        >
          <MessageSquare size={24} />
        </button>
        <FeedbackDropdown onSubmit={handleFeedback} />
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`p-2 rounded-lg hover:bg-gray-100 ${
            isBookmarked ? 'text-blue-500' : 'text-gray-400'
          }`}
        >
          {isBookmarked ? <BookmarkCheck size={24} /> : <BookmarkPlus size={24} />}
        </button>
      </div>

      {showCommentInput && (
        <div className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded-lg text-lg"
            placeholder="Add a comment..."
            rows="2"
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              onClick={() => setShowCommentInput(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleAddComment}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-lg"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}

      {comments.length > 0 && (
        <div className="mt-4 space-y-2">
          {comments.map((comment, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg text-lg text-gray-700">
              {comment}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// QuestionDisplay renders a list of questions based on the type and data provided
const QuestionDisplay = ({ type, data, showAnswers }) => {
  const questions = type === 'all'
    ? Object.values(data).flat()
    : data[type] || [];

  // Render all question cards in a list
  return (
    <div className="space-y-6 ">
      
      {questions.map((item) => (
        <QuestionCard
          key={item.id}
          item={item}
          showAnswers={showAnswers}
          type={type}
        />
      ))}
    </div>
  );
};

export default QuestionDisplay;
