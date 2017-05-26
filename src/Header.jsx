import React, {Component} from 'react';

class Header extends Component{
  render(){
    return(
      <header>
        <section className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <h3 className="client-no">{this.props.count} client has connected</h3>
        </section>
      </header>
    )
  }
}

export default Header;