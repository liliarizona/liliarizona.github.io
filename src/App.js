import React, {Component, Fragment} from "react";
import "./App.css";

import SplitPane from "react-split-pane";
//import {Button} from 'semantic-ui-react';
//import Button from "@material-ui/core/Button";
import button from 'react-bootstrap';
const code2letter = {
  "2": "a",
  "(": "b",
  ")": "c",
  "o" : "d",
  "3": "e",
  "v" : "f",
  "n": "g",
  "Θ": "h",
  "4": "i",
  "|": "k",
  "d": "l",
  "-": "m",
  "/": "n",
  "5": "o",
  "+": "p",
  "‖": "q",
  "p": "r",
  "=": "s",
  "~": "t",
  "6": "u",
  "g": "v",
  "8": "w",
  "w": "x",
  "7": "y",
  "9": "z",
  "[" : "bb",
  "]" : "cc",
  ";" : "ee",
  "ψ" : "ff",
  ":" : "ll",
  "!" : "oo",
  "≠" : "pp",
  "?" : "ss",
  "T" : "tt",
  "x" : "&",
  "∆" : "ch",
  "^" : "sh",
  "√" : "th",
};
const cipherletters = Object.keys(code2letter);

const letter2code = {};
for (var key in code2letter) {
  letter2code[code2letter[key]] = key;
}
const plainletters = Object.keys(letter2code);

class App extends Component {
  constructor() {
    super();
    this.state = {
      ciphertext: "cipher",
      plaintext: "I love & only love the fairer sex"
    };
  }
  onChangeCipher(event) {
    this.setState({ciphertext: event.target.value});
  }
  onChangePlain(event) {
    this.setState({plaintext: event.target.value});
  }
  onClickAddCipher(event)
  {
    const inletter=event.target.value;
    const newciphertext =  this.state.ciphertext + inletter;
    this.setState({ciphertext: newciphertext});
  }

  cipher2plain() {
    const cipherarr = this.state.ciphertext.split("");
    //-alert(cipherletters);
    //let decodedarr = cipherarr.map(letter => cipherletters.indexOf(letter) > -1 ? code2letter[letter] : letter);
    let decodedarr = cipherarr.map(letter =>
      code2letter.hasOwnProperty(letter) ? code2letter[letter] : letter
    );
    this.setState({plaintext: decodedarr.join("")});
  }
  plain2cipher() {
    const plainarr = this.state.plaintext.split("");
    let encodedarr = plainarr.map(letter =>
      plainletters.indexOf(letter) > -1 ? letter2code[letter] : letter
    );
    this.setState({ciphertext: encodedarr.join("")});
  }

  render() {
  //   let keyboardButtons = Object.entries(code2letter).map(([key,value]) => {
  //   return <button type="button" class="btn btn-outline-primary">{key}<br/>{value}</button>
  // });

    return (
      <Fragment>
      <SplitPane split="horizontal" defaultSize="66%">
        <div classs="myautowrapbox">
          <SplitPane split="horizontal" defaultSize="50%">
            <div class="myautowrapbox" borderLeftWidth={40}>
              <div>
                {'\t Cipher Text \t \t'}<button type="button" class="btn btn-outline-primary" onClick={this.cipher2plain.bind(this)} >
                   Decode
                 </button>
                 <br/>
               </div>
               <div>
                <textarea
                  class="flextextarea"
                  rows="6"
                  cols="50"
                  onChange={this.onChangeCipher.bind(this)}
                  value={this.state.ciphertext}
                />
              </div>
            </div>
            <div class="btn-group" >
             {
               Object.entries(code2letter).map(([key,value]) => {
               return <button type="button" onClick={this.onClickAddCipher.bind(this)} value={key} class="btn btn-outline-primary">{key}<br/>{value}</button>
               })
             }
           </div>
          </SplitPane>
        </div>
        <div class="myautowrapbox" borderLeftWidth={40}>
          <div>
            {'\t Plaintext \t\t\ '}<button type="button" class="btn btn-outline-primary" onClick={this.plain2cipher.bind(this)} >
               Encode
           </button>
           <br/>
         </div>
         <div class="myautowrapbox">
          <textarea
            class="flextextarea"
            rows="6"
            cols="50"
            onChange={this.onChangePlain.bind(this)}
            value={this.state.plaintext}
          />
          </div>
        </div>
      </SplitPane>
      </Fragment>
    );
  }
}

export default App;
