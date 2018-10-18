import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
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

export default class SideBar extends React.Component {
  state = {
    navLinks: [
      ['/', 'Home', HomeFilledIcon],
      ['/feasability', 'Feasability', SearchIcon],
      ['/programming', 'Programming', CodeIcon],
      ['/reporting', 'Reporting', GraphLineIcon],
      ['/vendors', 'Vendors', ListIcon],
    ]
  };

  static contextTypes = {
    navOpenState: PropTypes.object,
    router: PropTypes.object,
  };

  openDrawer = (openDrawer) => {
    this.setState({ openDrawer });
  };

  shouldComponentUpdate(nextProps, nextContext) {
    return true;
  };

  render() {
    return (
      <Nav
        isOpen={this.context.navOpenState.isOpen}
        width={this.context.navOpenState.width}
        onResize={this.props.onNavResize}
        containerHeaderComponent={() => (
          <AkContainerTitle
            href="/#"
            icon={
              <img alt="atlaskit logo" src={atlaskitLogo} />
            }
            text="Surveys"
          />
        )}
      >
        {
          this.state.navLinks.map(link => {
            const [url, title, Icon] = link;
            return (
              <Link key={url} to={url}>
                <AkNavigationItem
                  icon={<Icon label={title} size="large" />}
                  text={title}
                  isSelected={this.context.router.isActive(url, true)}
                />
              </Link>
            );
          }, this)
        }
      </Nav>
    );
  }
}
