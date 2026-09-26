import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTickets } from "../services/api";
import { useAuth } from "../context/AuthContext";
import TicketCard from "../components/TicketCard";

const CustomerDashboard = () => {
  const { user } = useAuth();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTickets = async () => {
      try {
        setError("");

        const data = await getTickets();

        setTickets(Array.isArray(data) ? data : data.tickets || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1>Customer Dashboard</h1>

          <p>
            Welcome, {user?.name}
          </p>
        </div>

        <Link
          to="/create-ticket"
          style={{
            padding: "10px 15px",
            backgroundColor: "#2563eb",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          Create Ticket
        </Link>
      </div>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {loading ? (
        <p>Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <div>
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;