import React from 'react';
import {HashRouter , Route , Switch} from 'dva/router';
import Work from './routers/work/Work.js';
import Main from './routers/uploadWork/Main.js';
import Home from './routers/home/Home.js';
export default ()=>{
	return <HashRouter>
        <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/work" exact component={Work}></Route>        
            <Route path="/uploadWork" exact component={Main}></Route>        
        </Switch>
    </HashRouter>
}