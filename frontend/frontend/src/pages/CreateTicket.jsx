import { useNavigate } from "react-router-dom";
import TicketForm from "../components/TicketForm";

const CreateTicket = () => {
  const navigate = useNavigate();

  const handleTicketCreated = (data) => {
    const ticket = data.ticket || data;

    if (ticket?.id) {
      navigate(`/tickets/${ticket.id}`);
    } else {
      navigate("/customer-dashboard");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <TicketForm onTicketCreated={handleTicketCreated} />
    </div>
  );
};

export default CreateTicket;