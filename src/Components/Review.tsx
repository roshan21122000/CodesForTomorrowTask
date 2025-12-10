import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./Review.css";

interface ReviewType {
  id: number;
  text: string;
  replies: ReviewType[];
}

const Review: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [newReview, setNewReview] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const addReview = () => {
    if (!newReview.trim()) return;
    setReviews([
      ...reviews,
      { id: Date.now(), text: newReview, replies: [] },
    ]);
    setNewReview("");
  };

  const addReply = (parentId: number, replyText: string) => {
    if (!replyText.trim()) return;

    const updateReplies = (list: ReviewType[]): ReviewType[] =>
      list.map((item) =>
        item.id === parentId
          ? {
              ...item,
              replies: [
                ...item.replies,
                { id: Date.now(), text: replyText, replies: [] },
              ],
            }
          : { ...item, replies: updateReplies(item.replies) }
      );

    setReviews(updateReplies(reviews));
  };

  const deleteReview = (id: number) => {
    const remove = (list: ReviewType[]): ReviewType[] =>
      list.filter((item) => item.id !== id).map((r) => ({
        ...r,
        replies: remove(r.replies),
      }));

    setReviews(remove(reviews));
  };

  const updateReview = () => {
    if (!editText.trim()) return;

    const update = (list: ReviewType[]): ReviewType[] =>
      list.map((item) =>
        item.id === editId
          ? { ...item, text: editText }
          : { ...item, replies: update(item.replies) }
      );

    setReviews(update(reviews));
    setEditId(null);
    setEditText("");
  };

  const ReviewItem = ({ review }: { review: ReviewType }) => {
    const [replyText, setReplyText] = useState("");

    return (
      <div className="review-item">
        <div className="review-header">
          {editId === review.id ? (
            <>
              <input
                className="edit-input"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button className="btn save" onClick={updateReview}>
                Save
              </button>
              <button className="btn cancel" onClick={() => setEditId(null)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <p>{review.text}</p>
              <div className="actions">
                <button
                  className="btn edit"
                  onClick={() => {
                    setEditId(review.id);
                    setEditText(review.text);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn delete"
                  onClick={() => deleteReview(review.id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>

        <div className="reply-box">
          <input
            className="reply-input"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button
            className="btn reply"
            onClick={() => {
              addReply(review.id, replyText);
              setReplyText("");
            }}
          >
            Reply
          </button>
        </div>

        <div className="nested-replies">
          {review.replies.map((r) => (
            <ReviewItem key={r.id} review={r} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Topbar />

        <div className="review-page">
          <h2>Reviews</h2>

          <div className="add-review">
            <input
              className="review-input"
              placeholder="Write a review..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <button className="btn add" onClick={addReview}>
              Add Review
            </button>
          </div>

          <div className="review-list">
            {reviews.length === 0 ? (
              <p>No reviews yet...</p>
            ) : (
              reviews.map((rev) => (
                <ReviewItem key={rev.id} review={rev} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
