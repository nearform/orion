// shared mui theme
export { default as ThemeWrapper, theme } from '../theme.es.js'
export { default as PaddedContainer } from './components/PaddedContainer'

// status chips
export {
  default as ArticleStatusChip,
} from './components/StatusChip/ArticleStatusChip'
export { default as TypedChip } from './components/TypedChip'
export * from './components/TypedChip'
export { default as UserRoleChip } from './components/StatusChip/UserRoleChip'
export * from './components/StatusChip/UserRoleChip'
export { default as GroupTypeChip } from './components/StatusChip/GroupTypeChip'
export * from './components/StatusChip/GroupTypeChip'

// content editting and widgets
export { default as ConfirmDialog } from './components/ConfirmDialog'
export { default as RatingWidget } from './components/RatingWidget/RatingWidget'
export {
  default as RichTextEditor,
} from './components/RichTextEditor/RichTextEditor'
export { default as UploadImageWidget } from './components/UploadImageWidget'

// i18n / translation / language switching
export { default as addTranslations } from './components/translations/utils'
export {
  default as getLanguageSwitcher,
} from './components/translations/getLanguageSwitcher'

// page layout
export {
  default as DisplayIfSignedIn,
} from './components/page/DisplayIfSignedIn'
export { default as Footer } from './components/page/Footer'
export { default as getNavLink } from './components/page/getNavLink'
export { default as NavLink } from './components/page/NavLink'
export { default as ImagePlaceholder } from './components/page/ImagePlaceholder'
export { default as Layout } from './components/page/Layout'
export { default as RootWrapper } from './components/page/RootWrapper'
export { default as SectionTitle } from './components/page/SectionTitle'
export { default as SEOHeaders } from './components/page/SEOHeaders'
export { default as UserAvatar } from './components/UserAvatar/UserAvatar'
export { default as AvatarImage } from './components/UserAvatar/AvatarImage'
export {
  default as CollapsedAvatars,
} from './components/UserAvatar/CollapsedAvatars'
export { default as EmbeddedVideo } from './components/EmbeddedVideo'
export { default as UserFilter } from './components/page/UserFilter'

export { default as ProtectedRoute } from './components/ProtectedRoute'
export { default as AdminRoute } from './components/admin/AdminRoute'

export * from './components/authorization'

export { default as CustomAuthenticator } from './components/authentication'
export * from './components/authentication'

// views
export { default as UserProfileView } from './components/UserProfileView'

// hooks
export { default as useAdminTable } from './hooks/useAdminTable'
export { default as useAmplifyImage } from './hooks/useAmplifyImage'
export { default as useImageUpload } from './hooks/useImageUpload'
