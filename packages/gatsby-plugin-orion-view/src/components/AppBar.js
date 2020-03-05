import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import {
  Button,
  MenuItem,
  Select,
  AppBar as MuiAppBar,
  Toolbar,
  withStyles,
} from '@material-ui/core'
import MoreVert from '@material-ui/icons/MoreVert'
import Twemoji from 'react-twemoji'
import HorizontalNavigationMenu from 'gatsby-plugin-orion-core/src/components/HorizontalNavigationMenu'

const AppBar = ({
  classes,
  menuData,
  dropDownIndicatorIcon,
  childIndicatorIcon,
  userRole,
  brandTo,
}) => {
  return (
    <MuiAppBar classes={{ root: classes.root }} position="static">
      <Toolbar>
        <Button
          edge="start"
          component={Link}
          color="inherit"
          aria-label="menu"
          to={brandTo ? brandTo : '#'}
          className="brand-logo"
          data-testid="brand-logo-button"
        >
          <div />
        </Button>
        {menuData && (
          <HorizontalNavigationMenu
            data={menuData}
            dropDownIndicatorIcon={dropDownIndicatorIcon}
            childIndicatorIcon={childIndicatorIcon}
            userRole={userRole}
          />
        )}
        <Select
          autoWidth
          displayEmpty
          disableUnderline
          className="language-switcher"
          value="en"
          IconComponent={MoreVert}
          MenuProps={{ className: `${classes.popover} language-switcher-menu` }}
          renderValue={() => (
            <MenuItem value="en" className="language-switcher-item">
              <Twemoji
                options={{
                  className: 'language-switcher-icon',
                }}
              >
                🇬🇧
              </Twemoji>
              EN
            </MenuItem>
          )}
        >
          <MenuItem value="en" className="language-switcher-item">
            <Twemoji
              options={{
                className: 'language-switcher-icon',
              }}
            >
              🇬🇧
            </Twemoji>
            English
          </MenuItem>
        </Select>
      </Toolbar>
    </MuiAppBar>
  )
}

const styles = theme => ({ ...theme.appBar, ...theme.horizontalMenu })

AppBar.propTypes = {
  classes: PropTypes.object,
  menuData: PropTypes.array,
  dropDownIndicatorIcon: PropTypes.string,
  childIndicatorIcon: PropTypes.string,
  userRole: PropTypes.string,
  brandTo: PropTypes.string,
}

AppBar.defaultProps = {
  menuData: undefined,
  dropDownIndicatorIcon: 'fas fa-chevron-down',
  childIndicatorIcon: 'fas fa-chevron-right',
  userRole: undefined,
  brandTo: undefined,
}

export default withStyles(styles, { withTheme: true })(AppBar)
