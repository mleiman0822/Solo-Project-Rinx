import React, { Component } from "react";
import { connect } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";
import RinkMap from "../RinkMap/RinkMap";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { Modal, Button } from "react-bootstrap";
import "../App/App.css";
import { Row, Col } from "react-bootstrap";
import swal from "sweetalert";
import ReactWeather from "react-open-weather";
import "react-open-weather/lib/css/ReactWeather.css";
import MapMarker from "../MapMarker/MapMarker";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

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
    viewport: {
      width: "100%",
      height: "100%",
      latitude: 46.877186, // Fargo, ND
      longitude: -96.789803,
      zoom: 10,
      showPopup: true,
      selectedRink: null,
      setSelectedRink: null,
      setSelectedMarker: null,
    },
  };

  //setting marker
  setSelectedMarker = (index) => {
    this.setState({ selectedIndex: index });
  };
  //close popup handle
  closePopup = () => {
    this.setSelectedMarker(null);
  };
  //open popup handle
  openPopup = (index) => {
    this.setSelectedMarker(index);
  };

  //moving map handle
  moveMap = (latitude, longitude) => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        latitude: latitude,
        longitude: longitude,
      },
    });
  };

  //form submit to create rink
  onSubmit = (event) => {
    event.preventDefault();
    this.closeModal();

    // simple dispatch for the saga to take care of
    this.props.dispatch({
      type: "CREATE_RINK",
      payload: this.state,
    });

    swal({
      title: "Rink Added To Map",
      text: "You have successfully added a new rink to the map.",
      icon: "success",
      buttons: true,
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

  //open and closing modals
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  render = () => {
    return (
      <>
        <div className="map-container">
          <ReactMapGL
            style={{ borderRadius: "45px" }}
            {...this.state.viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            // mapStyle="mapbox://styles/mapbox/dark-v9"
            mapStyle="mapbox://styles/mleiman0822/ckgnxe6ei2mpb1aljxskabiuw"
            // this is from the react-map-gl examples. It updates our local state with
            // whatever the new map viewport is, after a user zooms or pans
            onViewportChange={(viewport) => {
              this.setState({ viewport: viewport });
            }}
          >
            {this.props.rinks.map((rink) => (
              // Offset is required because images are drawn on the map at the top left corner...
              // but marker pins need to have their bottom 'point' on the location (so they need to

              // get shifted to the left and up! Depends on the size of the marker)
              <MapMarker rink={rink} moveMap={this.moveMap} />
            ))}
          </ReactMapGL>
        </div>
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
          <Modal.Header className="modalHeader" closeButton>
            <Modal.Title
              className="modalTitle"
              style={{ justifyContent: "center" }}
            >
              Add A New Rink
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            {" "}
            <body>
              <form
                className="modalForm"
                style={{ backgroundColor: "white" }}
                onSubmit={this.onSubmit}
              >
                <div className="formDiv">
                  <h2>Create New Rink</h2>
                  <p>
                    You can use{" "}
                    <a href="https://www.latlong.net/">LatLong.net</a> to get
                    Latitude / Longitude points. After adding a new rink, the
                    map will auto-update.
                  </p>
                  <Row>
                    <Col>
                      Name:{" "}
                      <input
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                        value={this.state.name}
                        required
                      />
                    </Col>
                    <Col>
                      {""}
                      Notes:{" "}
                      <input
                        onChange={(e) =>
                          this.setState({ note: e.target.value })
                        }
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
                        onChange={(e) =>
                          this.setState({ image: e.target.value })
                        }
                        value={this.state.image}
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
                      <select
                        onChange={(e) =>
                          this.setState({ indoor_or_outdoor: e.target.value })
                        }
                        value={this.state.indoor_or_outdoor}
                        required
                      >
                        <option value={"Outdoor"}>Outdoor</option>
                        <option value={"Indoor"}>Indoor</option>
                      </select>
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
                      <Button type="submit" variant="primary w-100 text-center">
                        Add Rink To Map
                      </Button>
                    </Col>
                  </Row>
                </div>
              </form>
            </body>
          </Modal.Body>
          <Modal.Footer className="modalFooter">
            <Button
              className="footerButton"
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

const mapStateToProps = (state) => ({
  state: state,
  rinks: state.rinkItemsReducer.rinks,
});
export default connect(mapStateToProps)(AdminForm);
