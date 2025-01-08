import Accordion from "react-bootstrap/Accordion";

function AllCollapse() {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>What is BMS?</Accordion.Header>
        <Accordion.Body className="text-start text-muted">
          "BMS" is a user-friendly platform that helps you find and book parking
          spaces at various locations. Whether you're in the city or near
          popular destinations, our platform offers easy and hassle-free parking
          reservations.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>How do I book a parking spot?</Accordion.Header>
        <Accordion.Body className="text-start text-muted">
          To book a parking spot, simply visit our website, search for a parking
          space at your desired location, select the time slot, and complete the
          booking. You'll receive a confirmation and details about your parking
          spot.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>
          Do I need an account to book a spot?
        </Accordion.Header>
        <Accordion.Body className="text-start text-muted">
          Yes, you need to create an account to book a parking spot. This allows
          us to securely store your information, send you booking confirmations,
          and make future reservations faster and more efficient.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>
          How far in advance can I book a parking spot?
        </Accordion.Header>
        <Accordion.Body className="text-start text-muted">
          You can book a parking spot in advance depending on the availability
          at your chosen location. The booking window may vary, but typically
          you can reserve a spot from a few hours to several weeks ahead.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Are the parking spots secure?</Accordion.Header>
        <Accordion.Body className="text-start text-muted">
          Yes, the parking spots listed on our platform are verified, and we
          work closely with parking providers to ensure your safety. Each
          parking location has different levels of security, and we encourage
          users to check the spot's details before confirming the booking.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header>
          What should I do if I face issues with my parking spot?
        </Accordion.Header>
        <Accordion.Body className="text-start text-muted">
          If you encounter any issues with your parking spot (e.g.,
          accessibility issues, security concerns), please contact our customer
          support immediately. We’ll assist you in resolving the problem and
          ensure your experience is smooth.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AllCollapse;
