import React, { Component } from "react";
import { connect } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";
import RinkMap from "../RinkMap/RinkMap";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { Modal, Button } from "react-bootstrap";
import "../App/App.css";
import { Row, Col } from "react-bootstrap";

class AdminForm extends Component {
  state = {
    name: "",
    note: "",
    image: "",
    address: "",
    status: 1,
    indoor_or_outdoor: "",
    latitude: 46.877186,
    longitude: -96.789803,
    zoom: 10,
    showPopup: true,
    isOpen: false,
  };

  onSubmit = (event) => {
    event.preventDefault();

    // simple dispatch for the saga to take care of
    this.props.dispatch({
      type: "CREATE_RINK",
      payload: this.state,
    });

    // clear local state!
    this.setState({
      name: "",
      note: "",
      image: "",
      address: "",
      status: 1,
      indoor_or_outdoor: "",
      latitude: 46.877186,
      longitude: -96.789803,
    });
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  render = () => {
    return (
      <>
        <RinkMap />
        <br />
        <div>
          <Button variant="primary" onClick={this.openModal}>
            Add A New Rink{" "}
          </Button>
        </div>
        <Modal
          className="modal"
          show={this.state.isOpen}
          onHide={this.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ justifyContent: "center" }}>
              Add A New Rink
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            {" "}
            <body>
              <form
                style={{ backgroundColor: "white" }}
                onSubmit={this.onSubmit}
              >
                <h2>Create New Rink</h2>
                <p>
                  Use <a href="https://www.latlong.net/">LatLong.net</a> to get
                  Latitude / Longitude points. After adding the map, the map
                  will auto-update but it will not auto-update to show all pins.
                </p>
                <Row>
                  <Col>
                    Name:{" "}
                    <input
                      onChange={(e) => this.setState({ name: e.target.value })}
                      value={this.state.name}
                      required
                    />
                  </Col>
                  <Col>
                    {""}
                    Notes:{" "}
                    <input
                      onChange={(e) => this.setState({ note: e.target.value })}
                      value={this.state.note}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Address:{" "}
                    <input
                      onChange={(e) =>
                        this.setState({ address: e.target.value })
                      }
                      value={this.state.address}
                      required
                    />{" "}
                  </Col>
                  <Col>
                    Image URL:{" "}
                    <input
                      onChange={(e) => this.setState({ image: e.target.value })}
                      value={this.state.image}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Status:{" "}
                    <select
                      onChange={(e) =>
                        this.setState({ status: e.target.value })
                      }
                      value={this.state.status}
                      required
                    >
                      <option value={3}>Useable</option>
                      <option value={2}>Useable/Needs Maintenance</option>
                      <option value={1}>Not Usable</option>
                    </select>
                  </Col>
                  <Col>
                    Indoor or Outdoor?:{" "}
                    <input
                      onChange={(e) =>
                        this.setState({ indoor_or_outdoor: e.target.value })
                      }
                      value={this.state.indoor_or_outdoor}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Latitude:{" "}
                    <input
                      onChange={(e) =>
                        this.setState({ latitude: e.target.value })
                      }
                      value={this.state.latitude}
                      required
                    />
                  </Col>

                  <Col>
                    Longitude:{" "}
                    <input
                      onChange={(e) =>
                        this.setState({ longitude: e.target.value })
                      }
                      value={this.state.longitude}
                      required
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Button
                      onSubmit={this.closeModal}
                      type="submit"
                      variant="primary w-100 text-center"
                    >
                      Add Rink To Map
                    </Button>
                  </Col>
                </Row>
              </form>
            </body>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary w-100 text-center"
              onClick={this.closeModal}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
}

export default connect()(AdminForm);
