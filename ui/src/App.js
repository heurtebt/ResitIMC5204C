import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        LotArea: 0,
        YearBuilt: 0,
        FstFlrSF: 0,
        SndFlrSF: 0,
        FullBath: 0,
        BedroomAbvGr: 0,
        TotRmsAbvGrd: 0
      },
      result: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch('http://127.0.0.1:5000/prediction/', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result,
          isLoading: false
        });
      });
  }

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;

    return (
      <Container>
        <div>
          <h1 className="title">Iowa Housing Prices Estimator</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Lot Area</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Lot Area" 
                  name="LotArea"
                  min="0"
                  step="1"
                  value={formData.LotArea}
                  onChange={this.handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Year Built</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Year Built" 
                  name="YearBuilt"                  
                  min="0"
                  step="1"
                  value={formData.YearBuilt}
                  onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>1st Floor Square Feet</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="1st Floor Square Feet" 
                  name="FstFlrSF"                  
                  min="0"
                  step="1"
                  value={formData.FstFlrSF}
                  onChange={this.handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>2nd Floor Square Feet</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="2nd Floor Square Feet" 
                  name="SndFlrSF"                  
                  min="0"
                  step="1"
                  value={formData.SndFlrSF}
                  onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Number of Full Bathrooms</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Number of Full Bathrooms" 
                  name="FullBath"                  
                  min="0"
                  step="1"
                  value={formData.FullBath}
                  onChange={this.handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Number of Bedrooms above ground</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Number of Bedrooms above ground" 
                  name="BedroomAbvGr"                  
                  min="0"
                  step="1"
                  value={formData.BedroomAbvGr}
                  onChange={this.handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Total nummber of rooms above ground</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Total nummber of rooms above ground" 
                  name="TotRmsAbvGrd"                  
                  min="0"
                  step="1"
                  value={formData.TotRmsAbvGrd}
                  onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}>
                  { isLoading ? 'Making prediction' : 'Predict' }
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Reset prediction
                </Button>
              </Col>
            </Row>
          </Form>
          {result === "" ? null :
            (<Row>
              <Col className="result-container">
                <h5 id="result">{result}</h5>
              </Col>
            </Row>)
          }
        </div>
      </Container>
    );
  }
}

export default App;