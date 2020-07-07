import React from 'react';
import './App.css';
import axios from 'axios';

import GitCard from './componentes/GitCard'

class App extends React.Component{
  state={
    githubData: [],
    followerData: []
  }

  componentDidMount(){
    axios.get('https://api.github.com/users/tonomb')
      .then(res=>{
        this.setState({
          githubData: res.data
        })
        
      })
      .catch(err =>{
        console.log(err);
        
      })

      axios.get('https://api.github.com/users/tonomb/followers')
      .then(res =>{
        const followers = res.data
        followers.forEach(follower =>{
          axios.get(follower.url)
            .then(res =>{
              console.log(res.data);
              this.setState({
                followerData: [
                  ...this.state.followerData,
                  res.data
                ]
              })
              
            })
            .catch(err =>{
              console.log(err);
            })
        })
      })
      .catch(err =>{
        console.log(err);
        
      })      
  }



  render(){
    if(this.state.githubData.length === 0){
      return <p>Loading...</p>
    }

    return(
      <div className='container'>
        <GitCard user={this.state.githubData}/>
        {
          this.state.followerData.map( follower =>{
            return <GitCard key={follower.id} user={follower} />
          })
        }
      </div>
    )
  }
}

export default App;
