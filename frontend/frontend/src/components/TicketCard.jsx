import { Link } from "react-router-dom";

const TicketCard = ({ ticket }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "15px",
        backgroundColor: "#fff",
      }}
    >
      <h3>{ticket.title}</h3>

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

      <Link
        to={`/tickets/${ticket.id}`}
        style={{
          display: "inline-block",
          marginTop: "10px",
          padding: "8px 15px",
          backgroundColor: "#2563eb",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px",
        }}
      >
        View Ticket
      </Link>
    </div>
  );
};

export default TicketCard;