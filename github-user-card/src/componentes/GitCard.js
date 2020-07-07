import React from 'react';

class GitCard extends React.Component{
  


  render(){
    return(
      <div className='card'>
          <img src={this.props.user.avatar_url} alt='profile'/>
          <div className='card-info'>
            <h3 className='name'>{this.props.user.name}</h3>
            <p className='username'>{this.props.user.login}</p>
            <p>Location: {this.props.user.location}</p>
            <p>Profile: {this.props.user.url}</p>
            <p>Followers: {this.props.user.followers}</p>
            <p>Following: {this.props.user.following}</p>
            <p>Bio: {this.props.user.bio}</p>
          </div>
        
      </div>
    )
  }
}

export default GitCard;
