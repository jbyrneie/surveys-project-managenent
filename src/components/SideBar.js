import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faKeyboard, faPuzzlePiece, faSearch, faChartLine,faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { Theme } from '@atlaskit/theme';
import { AtlaskitThemeProvider } from '@atlaskit/theme';
import Nav, {
  AkContainerTitle,
  AkCreateDrawer,
  AkNavigationItem,
  AkSearchDrawer,
} from '@atlaskit/navigation';
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled';
import SearchIcon from '@atlaskit/icon/glyph/search';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import GearIcon from '@atlaskit/icon/glyph/settings';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import GraphLineIcon from '@atlaskit/icon/glyph/graph-line';
import ListIcon from '@atlaskit/icon/glyph/list';
import CodeIcon from '@atlaskit/icon/glyph/code';
import atlaskitLogo from '../images/atlaskit.png';
//import { Home, PieChart, Search, Keyboard, ThumbUp, Store } from '@material-ui/icons'
import {navigate} from '../lib/utils'

library.add(faHome, faKeyboard, faPuzzlePiece, faSearch, faChartLine, faShoppingBag)

class SideBar extends Component {
  static contextTypes = {
    navOpenState: PropTypes.object,
    router: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      navLinks: [
        ['/', 'Home', HomeFilledIcon],
        ['/feasability', 'Feasability', SearchIcon],
        ['/programming', 'Programming', CodeIcon],
        ['/reporting', 'Reporting', GraphLineIcon],
        ['/vendors', 'Vendors', ListIcon],
      ]
    };
  }

  render() {
    const selectedPage = this.props.store.qiStore.selectedPage
    console.log('selectedPage: ', selectedPage);
    console.log('menu: ', this.props.menu);

    return (
      <div style={{position: 'relative', backgroundColor: 'white'}}>
        <div style={{fontSize:'48px', color:'#A0A0A0', fontWeight:900, fontSize: '3em', paddingTop:'0.5em', paddingBottom:40, textAlign:"center"}} onClick={navigate.bind(this, '/')}>S</div>
        <div style={{textAlign:"center", marginLeft:'2em', marginRight:'2em', marginBottom:'4em', paddingTop:'1em'}}>
          <FontAwesomeIcon icon="home" size='2x' style={{color: selectedPage==='home'?'#2db7fc':'#d8dfe5'}} onClick={navigate.bind(this, '/')}/>
        </div>
        <div style={{textAlign:"center", marginLeft:'2em', marginRight:'2em', marginBottom:'4em'}}>
          <FontAwesomeIcon style={{color: selectedPage==='programming'?'#2db7fc':'#d8dfe5'}} icon="keyboard" size='2x' onClick={navigate.bind(this, 'programming')}/>
        </div>
        <div style={{textAlign:"center", marginLeft:'2em', marginRight:'2em', marginBottom:'4em'}}>
          <FontAwesomeIcon icon="chart-line" size='2x' style={{color: selectedPage==='reporting'?'#2db7fc':'#d8dfe5'}} onClick={navigate.bind(this, 'reporting')}/>
        </div>
        <div style={{textAlign:"center", marginLeft:'2em', marginRight:'2em', marginBottom:'4em'}}>
          <FontAwesomeIcon icon="search" size='2x' style={{color: selectedPage==='feasability'?'#2db7fc':'#d8dfe5'}} onClick={navigate.bind(this, 'feasability')}/>
        </div>
        <div style={{textAlign:"center", marginLeft:'2em', marginRight:'2em', marginBottom:'4em'}}>
          <FontAwesomeIcon icon="shopping-bag" size='2x' style={{color: selectedPage==='vendors'?'#2db7fc':'#d8dfe5'}} onClick={navigate.bind(this, 'vendors')}/>
        </div>
      </div>
    );
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(SideBar))
