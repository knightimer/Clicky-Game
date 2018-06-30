//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import motorcycle from "./motorcycle.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    motorcycle,
    clickedmotorcycle: [],
    score: 0
  };

//when you click on a card ... the motorcycle is taken out of the array
  imageClick = event => {
    const currentmotorcycle = event.target.alt;
    const motorcycleAlreadyClicked =
      this.state.clickedmotorcycle.indexOf(currentmotorcycle) > -1;

//if you click on a motorcycle that has already been selected, the game is reset and cards reordered
    if (motorcycleAlreadyClicked) {
      this.setState({
        motorcycle: this.state.motorcycle.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedmotorcycle: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available motorcycle, your score is increased and cards reordered
    } else {
      this.setState(
        {
          motorcycle: this.state.motorcycle.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedmotorcycle: this.state.clickedmotorcycle.concat(
            currentmotorcycle
          ),
          score: this.state.score + 1
        },
//if you get all 12 motorcycle corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              motorcycle: this.state.motorcycle.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedmotorcycle: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.motorcycle.map(motorcycle => (
            <FriendCard
              imageClick={this.imageClick}
              id={motorcycle.id}
              key={motorcycle.id}
              image={motorcycle.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;