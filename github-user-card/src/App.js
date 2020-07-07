import React from 'react';
import './App.css';
import axios from 'axios';

import GitCard from './componentes/GitCard'
import SearchUser from './componentes/SearchUser'

class App extends React.Component{
  state={
    githubData: [],
    followerData: [],
    searchTerm:'tonomb',
    error: false
  }

  componentDidMount(){
    axios.get(`https://api.github.com/users/${this.state.searchTerm}`)
      .then(res=>{
        this.setState({
          githubData: res.data
        })
        
      })
      .catch(err =>{
        console.log(err);
        this.setState({
          error: true
        })
      })

      axios.get(`https://api.github.com/users/${this.state.searchTerm}/followers`)
      .then(res =>{
        const followers = res.data
        followers.forEach(follower =>{
          axios.get(follower.url)
            .then(res =>{
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

  searchProfile = profile => {
    this.setState({
      searchTerm: profile
    })
  }



  render(){
    if(this.state.githubData.length === 0){
      return(
        <div>
          <p>Loading Profiles...</p>
          {this.state.error && <p>We encountered an error please try again later</p>}
        </div>
      )
        
    }

    return(
      <div className='container'>
        <SearchUser searchProfile={this.searchProfile} />
        <p>Searched Username: {this.state.searchTerm}</p>
        <GitCard key={this.state.githubData.id}user={this.state.githubData}/>
        <p className='followers-title'>Followers</p>
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
