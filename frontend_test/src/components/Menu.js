import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import MainNews from './MainNews';
import DetailNews from './DetailNews';

export default class Menu extends React.Component {

    render() {
        return (
            <Router>
              <Switch>
                <Route exact path="/" component={MainNews} />
                <Route path="/detail/:idNews" component={DetailNews} />
              </Switch>
            </Router>
        )
    }

}
