import { useState, useEffect } from "react";
import { Button, Card, Col, Form, Input, Row, message, Modal } from "antd";
import "./App.css";
import axios from "axios";

function App() {
  useEffect(() => {
    loadDestinations();
  }, []);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [destinations, setDestinations] = useState([]);

  const handleAddDestination = () => {
    if (!name || !image) {
      message.error("Enter name and image!!");
      return;
    }
    axios
      .post("http://localhost:3333", {
        name,
        image,
      })
      .then((res) => {
        setDestinations(res.data.destinations);
        setName("");
        setImage("");
        setModalOpen(false);
      })
      .catch((e) => {
        console.error("Somethig went wrong: ", e);
      });
  };

  const loadDestinations = () => {
    axios
      .get("http://localhost:3333")
      .then((res) => {
        setDestinations(res.data.destinations || []);
      })
      .catch((e) => {
        console.error("Somethig went wrong: ", e);
      });
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          margin: "30px 0 40px 0",
          fontFamily: "'Foldit', cursive",
        }}
      >
        Upcoming Trips
      </h1>
      <Button
        style={{ float: "right", marginRight: "30px" }}
        type="primary"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Create Destination
      </Button>
      <Row gutter={[0, 30]} style={{ marginBottom: "50px" }}>
        {destinations.map((des, ind) => (
          <Col span={6} key={ind}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h3 style={{ textTransform: "capitalize" }}>{des.name}</h3>
              <img
                src={des.image}
                className="detination-images"
                alt={des.name}
              />
            </div>
          </Col>
        ))}
      </Row>
      <Modal
        title="Create Destination"
        open={modalOpen}
        onOk={handleAddDestination}
        onCancel={() => {
          setModalOpen(false);
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "50px",
          }}
        >
          <Card style={{ width: "600px" }}>
            <Form layout="vertical">
              <Form.Item name="destinationName" label="Name">
                <Input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item name="destinationImage" label="Image Url">
                <Input
                  value={image}
                  onChange={(e) => {
                    setImage(e.target.value);
                  }}
                />
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Modal>
    </div>
  );
}

export default App;
