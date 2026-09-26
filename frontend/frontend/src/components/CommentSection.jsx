import { useEffect, useState } from "react";
import { createComment, getComments } from "../services/api";

const CommentSection = ({ ticketId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadComments = async () => {
    try {
      setError("");

      const data = await getComments(ticketId);

      setComments(Array.isArray(data) ? data : data.comments || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [ticketId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    try {
      setError("");
      setSubmitting(true);

      const data = await createComment(ticketId, {
        comment: content,
      });

      const newComment = data.comment || data;

      setComments((prevComments) => [
        ...prevComments,
        newComment,
      ]);

      setContent("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <h2>Comments</h2>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <div>
          {comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                padding: "12px",
                marginBottom: "10px",
                borderBottom: "1px solid #eee",
              }}
            >
              <p>{comment.comment}</p>

              {comment.user_name && (
                <small>
                  By: {comment.user_name}
                </small>
              )}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          rows="4"
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {submitting ? "Adding..." : "Add Comment"}
        </button>
      </form>
    </div>
  );
};

export default CommentSection;