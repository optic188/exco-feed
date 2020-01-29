import React, { Component, lazy, Suspense } from 'react';
import './App.css'
import Navbar from '../components/Navbar/Navbar'
import { Switch, Route } from 'react-router-dom';

const ItemsList = lazy(() => import('./ItemsList/ItemsList'));
const Items = lazy(() => import('./Items/Items'));

class App extends Component {
    state = { items: [] };

    render() {
        return (
            <div className="app">
                <Navbar />
                <main>
                    <Switch>
                        <Route exact path="/" >
                            <Suspense fallback={'Loading..'}>
                                <ItemsList items={this.state.items} />
                            </Suspense>
                        </Route>
                        <Route exact path="/items/:id" >
                            <Suspense fallback={'Loading..'}>
                                <Items items={this.state.items} />
                            </Suspense>
                        </Route>

                    </Switch>

                </main>
            </div>
        );
    }

    componentDidMount() {
        this.getItems().then((res) => {
            this.setState({items: res});
        });
    }

    async getItems() {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        // const response = await playbuzz.get(proxyUrl+'content/feed/resources.json');
        const response = await fetch(proxyUrl+'https://playbuzz-cdn.s3.amazonaws.com/content/feed/resources.json')
        const myJson = await response.json();
        return myJson.items;

    }
}

export default App;