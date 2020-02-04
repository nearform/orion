import React, { useContext, useState } from 'react'
import T from 'prop-types'
import {
  withStyles,
  Grid,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import classnames from 'classnames'
import { useMutation } from 'graphql-hooks'
import get from 'lodash/get'
import omit from 'lodash/omit'
import { Formik, Form, Field } from 'formik'
import { fieldToCheckbox } from 'formik-material-ui'
import { Redirect } from '@reach/router' // eslint-disable-line import/no-extraneous-dependencies
import { updateUserMutation, getUser } from '../../../queries'
import UploadImageWidget from '../UploadImageWidget'
import PaddedContainer from '../PaddedContainer'
import AvatarImage from '../UserAvatar/AvatarImage'
import { useAuthorizedQuery, AuthContext } from '../authorization'
import { constructImageUrl } from '../../utils/image'
import UserInfo from './UserInfo'
import formFields from './utils/form-fields'
import validationSchema from './validationSchema'

const UserProfileView = ({ SEO, userSummary, classes }) => {
  const { isAuthInitialized, getUserTokenData } = useContext(AuthContext)

  const { userId } = getUserTokenData()
  // TODO: Currently, this query just reloads data already entirely present in
  // the user summary; this should be reviewed to see whether the user summary
  // dataset should be reduced (perhaps even to just the user id).
  const { data: user } = useAuthorizedQuery(
    getUser,
    { id: userId },
    {
      onPreFetch: variables => Boolean(variables.id),
      onFetch: data => get(data, 'user.0'),
      onNoFetch: () => userSummary,
    }
  )

  const [editMode, setEditMode] = useState(false)

  const [updateUser] = useMutation(updateUserMutation)

  const signupRequest = get(user, 'signupRequest', {})

  const initialValues =
    user === undefined || user === null
      ? {}
      : formFields
          .filter(
            field => !field.name.includes('.') && field.name !== 'fullName'
          )
          .map(field => field.name)
          .reduce(
            (acc, key) => {
              acc[key] = user[key]
              return acc
            },
            {
              signupRequest,
              fullName: `${user.first_name || ''} ${user.last_name || ''}`,
            }
          )

  const saveProfile = async (values, actions) => {
    const formValues = {
      ...omit(values, ['avatarChanged', 'fullName']),
      first_name: get(values.fullName.split(' '), '0', ''), // eslint-disable-line camelcase
      last_name: get(values.fullName.split(' '), '1', ''), // eslint-disable-line camelcase
    }

    try {
      await updateUser({
        variables: {
          id: userId,
          input: formValues,
        },
      })
      setEditMode(false)
      return true
    } catch {
      return false
    } finally {
      actions.setSubmitting(false)
    }
  }

  if (isAuthInitialized && !userId) return <Redirect noThrow to="/auth" />

  return user ? (
    <>
      <SEO
        title={`Profile | ${
          user.first_name && user.last_name
            ? `${user.first_name} ${user.last_name}`
            : user.email
        }`}
      />
      <PaddedContainer className={classes.root}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={saveProfile}
        >
          {({ values, handleSubmit, isSubmitting, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid container item xs={12} spacing={2}>
                  <Grid container item xs={2} direction="column">
                    <Grid item>
                      <div className={classes.flexContainerHorizontalVertical}>
                        <AvatarImage
                          {...(values.avatar && {
                            src: constructImageUrl(
                              `${values.avatar}${
                                values.avatarChanged
                                  ? `?t=${values.avatarChanged}`
                                  : ''
                              }`
                            ),
                          })}
                          user={user}
                          className={classnames([
                            classes.avatar,
                            { [classes.avatarSmall]: editMode },
                          ])}
                        />
                      </div>
                    </Grid>

                    <Grid item className={classes.addImageButtonWrapper}>
                      <div className={classes.flexContainerHorizontalVertical}>
                        {Number(userId) === user.id ? (
                          <UploadImageWidget
                            path={`uploads/users/${user.id}-profile`}
                            generateFileName={false}
                            value={values.avatar}
                            onChange={s3key => {
                              setFieldValue('avatar', s3key)
                              setFieldValue('avatarChanged', Date.now())
                            }}
                          >
                            {({ startImageUpload, isLoading }) =>
                              editMode ? (
                                <Button
                                  color="secondary"
                                  disabled={isLoading}
                                  onClick={startImageUpload}
                                >
                                  {isLoading ? (
                                    <CircularProgress
                                      className={classes.addImageButtonIcon}
                                      color="secondary"
                                      size={15}
                                    />
                                  ) : (
                                    <AccountCircle
                                      className={classes.addImageButtonIcon}
                                    />
                                  )}
                                  Add image
                                </Button>
                              ) : null
                            }
                          </UploadImageWidget>
                        ) : null}
                      </div>
                    </Grid>
                  </Grid>

                  <Grid item xs={2}>
                    <div className={classes.nameWrapper}>
                      <UserInfo
                        title={formFields[0].label}
                        name={formFields[0].name}
                        value={get(values, formFields[0].name)}
                        editMode={editMode}
                        size="large"
                      />
                    </div>
                  </Grid>

                  <Grid item xs />
                </Grid>
                <Grid container item xs={12} spacing={2}>
                  <Grid container item xs={2} direction="column">
                    <Grid item className={classes.spacer} />
                    <Grid item>
                      {Number(userId) === user.id ? (
                        <>
                          <Typography
                            variant="h3"
                            className={classes.myProfile}
                          >
                            My profile
                          </Typography>
                          {!editMode && (
                            <Button
                              variant="outlined"
                              color="secondary"
                              className={classes.editButton}
                              onClick={() => setEditMode(true)}
                            >
                              Edit profile
                            </Button>
                          )}

                          {editMode && (
                            <Button
                              variant="contained"
                              color="secondary"
                              className={classes.editButton}
                              type="submit"
                              disabled={isSubmitting}
                            >
                              Save changes
                            </Button>
                          )}
                        </>
                      ) : null}
                    </Grid>
                  </Grid>

                  <Grid item xs={2}>
                    <UserInfo
                      title={formFields[1].label}
                      name={formFields[1].name}
                      value={get(values, formFields[1].name)}
                      editMode={editMode}
                    />

                    <UserInfo
                      title="Organisation"
                      value={get(
                        signupRequest,
                        'userAttributes.custom:orgName'
                      )}
                    />

                    <UserInfo
                      title="Role"
                      value={get(user, 'user_roles.0.role.name')}
                    />

                    <UserInfo
                      title={formFields[2].label}
                      name={formFields[2].name}
                      value={get(values, formFields[2].name)}
                      editMode={editMode}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <UserInfo
                      title={formFields[3].label}
                      name={formFields[3].name}
                      value={get(values, formFields[3].name)}
                      editMode={editMode}
                      rows={4}
                    />

                    <Typography
                      variant="h4"
                      color="secondary"
                      className={classes.contactTitle}
                    >
                      Contact info
                    </Typography>

                    {formFields
                      .slice(5, 9)
                      .map(({ name, icon: Icon, iconClass, label }) => (
                        <Grid
                          key={name}
                          container
                          spacing={2}
                          className={classes.contactInfoRow}
                        >
                          <Grid item xs="auto">
                            <Icon
                              className={classnames([
                                classes.contactIcon,
                                classes[iconClass],
                              ])}
                            />
                          </Grid>
                          <Grid item xs>
                            <div className={classes.userInfoWithIcon}>
                              <UserInfo
                                title={label}
                                name={name}
                                value={get(values, name)}
                                variant="light"
                                editMode={editMode}
                              />
                            </div>
                          </Grid>
                        </Grid>
                      ))}

                    <div className={classes.consents}>
                      {formFields.slice(-2).map(({ name, label }) => (
                        <FormControlLabel
                          key={name}
                          control={
                            <Field
                              name={name}
                              render={props => (
                                <Checkbox
                                  {...fieldToCheckbox(props)}
                                  className={classes.checkbox}
                                  color="default"
                                  disabled={!editMode}
                                />
                              )}
                            />
                          }
                          label={
                            <Typography variant="body2">{label}</Typography>
                          }
                        />
                      ))}
                    </div>
                  </Grid>
                  <Grid item xs />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </PaddedContainer>
    </>
  ) : (
    <SEO title="Profile" />
  )
}

UserProfileView.propTypes = {
  SEO: T.elementType,
  userSummary: T.object,
  classes: T.object.isRequired,
}

export default withStyles(theme => ({
  root: {
    color: theme.palette.primary.dark,
  },
  avatar: {
    width: 120,
    height: 120,
    fontWeight: 'bold',
    fontSize: 32,
    transition: 'width .2s ease-out, height .2s ease-out',
  },
  avatarSmall: {
    width: 80,
    height: 80,
  },
  flexContainerHorizontalVertical: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  nameWrapper: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  addImageButtonWrapper: {
    paddingTop: theme.spacing(1),
    marginBottom: theme.spacing(1) * -1,
  },
  addImageButtonIcon: {
    marginRight: theme.spacing(1),
  },
  spacer: {
    '&:before': {
      content: '""',
      display: 'block',
      height: theme.spacing(1),
      backgroundColor: theme.profileSpacerBackground,
      width: '100%',
    },
  },
  myProfile: {
    marginTop: theme.spacing(1) / 2,
  },
  editButton: {
    marginTop: theme.spacing(2),
  },
  contactTitle: {
    marginTop: theme.spacing(2),
  },
  contactInfoRow: {
    width: '80%',
    marginTop: theme.spacing(1) + 4,
  },
  userInfoWithIcon: {
    marginTop: theme.spacing(1) / 2 + 2,
  },
  contactIcon: {
    display: 'block',
    width: 20,
    ...theme.iconLight,
  },
  linkIcon: {
    transform: 'rotate(-45deg)',
  },
  customIcon: {
    '& path': {
      fill: theme.iconLight.color,
    },
  },
  checkbox: {
    color: theme.palette.primary.dark,
  },
  consents: {
    marginTop: theme.spacing(3),
  },
}))(UserProfileView)
