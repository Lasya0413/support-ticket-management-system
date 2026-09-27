import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteTicket,
  getTicketById,
  updateTicket,
} from "../services/api";
import { useAuth } from "../context/AuthContext";
import CommentSection from "../components/CommentSection";

const TicketDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const isAgent = user?.role === "agent";

  useEffect(() => {
    const loadTicket = async () => {
      try {
        setError("");

        const data = await getTicketById(id);
        const ticketData = data.ticket || data;

        setTicket(ticketData);
        setStatus(ticketData.status || "");
        setPriority(ticketData.priority || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTicket();
  }, [id]);

  const handleUpdate = async () => {
    try {
      setError("");
      setSaving(true);

      await updateTicket(id, {
        status,
        priority,
      });

      // Fetch the updated ticket again
      const data = await getTicketById(id);
      const updatedTicket = data.ticket || data;

      // Update the displayed ticket immediately
      setTicket(updatedTicket);
      setStatus(updatedTicket.status || "");
      setPriority(updatedTicket.priority || "");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setDeleting(true);

      await deleteTicket(id);

      navigate(
        isAgent ? "/agent-dashboard" : "/customer-dashboard"
      );
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <p>Loading ticket...</p>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div style={{ padding: "30px" }}>
        <p style={{ color: "red" }}>
          {error || "Ticket not found."}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <Link
        to={
          isAgent
            ? "/agent-dashboard"
            : "/customer-dashboard"
        }
      >
        ← Back to Dashboard
      </Link>

      <div
        style={{
          marginTop: "20px",
          padding: "25px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <h1>{ticket.title}</h1>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        <p>
          <strong>Description:</strong>
        </p>

        <p>{ticket.description}</p>

        <p>
          <strong>Status:</strong> {ticket.status}
        </p>

        <p>
          <strong>Priority:</strong> {ticket.priority}
        </p>

        {ticket.category && (
          <p>
            <strong>Category:</strong> {ticket.category}
          </p>
        )}

        {isAgent && (
          <div
            style={{
              marginTop: "25px",
              paddingTop: "20px",
              borderTop: "1px solid #eee",
            }}
          >
            <h3>Update Ticket</h3>

            <div style={{ marginBottom: "15px" }}>
              <label>Status</label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              >
                <option value="open">Open</option>
                <option value="in_progress">
                  In Progress
                </option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Priority</label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <button
              onClick={handleUpdate}
              disabled={saving}
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {saving ? "Saving..." : "Update Ticket"}
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              style={{
                padding: "10px 20px",
                backgroundColor: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {deleting ? "Deleting..." : "Delete Ticket"}
            </button>
          </div>
        )}
      </div>

      <CommentSection ticketId={id} />
    </div>
  );
};

export default TicketDetails;