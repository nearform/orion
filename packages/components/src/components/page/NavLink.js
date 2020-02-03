import { Link as RouterLink } from '@reach/router' // eslint-disable-line import/no-extraneous-dependencies
import getNavLink from './utils/get-nav-link'

const NavLink = getNavLink(RouterLink)
export default NavLink
