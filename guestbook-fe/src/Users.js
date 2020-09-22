import React, { Component } from 'react';
import axios from 'axios'

export default class User extends Component {
    constructor(){
        super();
            this.state = {
                username: "we don't know yet"
            };
        }
    componentDidMount = () =>{
        axios.get('/users').then(response =>{
            console.log(response.data)
        })
    }
    render(){
        return(
            <div>
            </div>
        )
    }

    }
