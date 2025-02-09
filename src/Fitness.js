import React from 'react';
import axios from 'axios';
import Footer from './Footer';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';


class Fitness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutEntry: '',
      hasWorkouts: false,
      workouts: [],
    };
  }

  workoutHandler = (e) => {
    const id = parseInt(e.target.value);
    this.getWorkout(id) && this.setState({
      isLoading: true
    });
  }

  getWorkout = async(ident) => {
    // It's terrible practice to re-make this request every time a user clicks a specific exercise type, and then filter the results.
    // If you just cached the entire returned data when they made the first request, you could just display the filtered data each time they choose a new one.
    // Or, you could include the categoryId in the request you're making to the API to only get relevant results back.
    // Especially since you have the ident param that corresponds to the group, that would be a much better option.
    // Instead, the user's device is making multiple identical requests to the endpoint and then not using all the data that comes back.
    // This unnecessarily results in more data usage for users, and fewer results displayed for each request.
    axios
      .get('https://wger.de/api/v2/exerciseinfo/?limit=100&offset=20')
      .then(response => {
        let allWorkouts = response.data.results;
        let results = allWorkouts.filter(workout => {
          return (workout.category.id === ident);
        });
        this.setState({
          isLoading: false,
          hasWorkouts: true,
          workouts: results,
        });
      });
  }

  render(){

    let selectedWorkouts = this.state.hasWorkouts && this.state.workouts;
    console.log(selectedWorkouts);
    let displayWorkout = selectedWorkouts&&this.state.workouts
      .map((item,idx)=>{
        return (
          <ListGroup.Item key={idx}>
            {/* <h3>{item.category.name}</h3> */}
            <h3>{item.name}</h3>
            Workout Description:
            {(item.description)
              .replace(/(<([^>]+)>)/ig,'')}
          </ListGroup.Item>
        );
      });

    return (
      <>
        <br />
        <Container>
          <Card border="info">
            <Form
              className="text-center"
              onChange={this.workoutHandler}
            >
              <Form.Group
                controlId="MuscleForm.SelectCustom">
                <Form.Label>
                  <h3>Muscle Group Selection</h3>
                </Form.Label>
                <Col lg="auto">
                  <Form.Control
                    onInput={(e) => this.workoutHandler}
                    as="select"
                    custom
                  >
                    <option value="10">Abs</option>
                    <option value="8">Arms</option>
                    <option value="12">Back</option>
                    <option value="14">Calves</option>
                    <option value="11">Chest</option>
                    <option value="9">Legs</option>
                    <option value="13">Shoulders</option>
                  </Form.Control>
                </Col>
              </Form.Group>
            </Form>
          </Card>

          {(!this.state.isLoading)?
            (<ListGroup>
              {displayWorkout}
            </ListGroup>)
            :
            (
              <Container>
                <Spinner animation="grow" size="sm" />
                <Spinner animation="grow" />
              </Container>
            )
          }
        </Container>
        <br />

        <div>
          <Footer />
        </div>
      </>
    );
  }
}

export default Fitness;
