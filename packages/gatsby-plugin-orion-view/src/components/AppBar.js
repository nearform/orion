import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import {
  Grid,
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
  logo,
  brandTo,
}) => {
  return (
    <MuiAppBar classes={{ root: classes.root }} position="static">
      <Toolbar>
        <Grid container alignItems="center">
          {logo && (
            <Grid item xs={2}>
              <Button
                edge="start"
                component={Link}
                color="inherit"
                aria-label="menu"
                to={brandTo ? brandTo : '#'}
                className="brand-logo"
                data-testid="brand-logo-button"
              >
                <img src={logo} alt="Acme" />
              </Button>
            </Grid>
          )}
          <Grid container item xs={8} alignItems="center">
            {menuData && (
              <Grid item>
                <HorizontalNavigationMenu
                  data={menuData}
                  dropDownIndicatorIcon={dropDownIndicatorIcon}
                  childIndicatorIcon={childIndicatorIcon}
                  userRole={userRole}
                />
              </Grid>
            )}
          </Grid>
          <Grid container item xs={2} alignItems="center" justify="flex-end">
            <Select
              autoWidth
              displayEmpty
              disableUnderline
              className="language-switcher"
              value="en"
              IconComponent={MoreVert}
              MenuProps={{
                className: 'language-switcher-menu',
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                PaperProps: {
                  style: {
                    height: 'auto',
                  },
                },
              }}
              renderValue={() => (
                <MenuItem value="en" className="language-switcher-item">
                  <Twemoji
                    options={{
                      className: 'language-switcher-icon',
                    }}
                  >
                    <span role="img" aria-label="EN">
                      🇬🇧
                    </span>
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
                  <span role="img" aria-label="English">
                    🇬🇧
                  </span>
                </Twemoji>
                English
              </MenuItem>
            </Select>
          </Grid>
        </Grid>
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
  logo: PropTypes.string,
}

AppBar.defaultProps = {
  menuData: undefined,
  dropDownIndicatorIcon: 'fas fa-chevron-down',
  childIndicatorIcon: 'fas fa-chevron-right',
  userRole: undefined,
  brandTo: undefined,
  logo: undefined,
}

export default withStyles(styles, { withTheme: true })(AppBar)
