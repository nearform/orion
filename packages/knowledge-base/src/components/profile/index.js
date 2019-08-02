import React, { useState } from 'react'
import {
  withStyles,
  Grid,
  Typography,
  Button,
  Avatar,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import classnames from 'classnames'
import { useQuery, useMutation } from 'graphql-hooks'
import get from 'lodash/get'
import { Formik, Form, Field } from 'formik'
import { fieldToCheckbox } from 'formik-material-ui'
import { PaddedContainer } from 'components'
import { getUser, updateUserMutation } from '../../queries'
import UserInfo from './UserInfo'
import UploadImageWidget from '../UploadImageWidget'
import SEO from '../SEO'
import formFields from './formFields'
import validationSchema from './validationSchema'

const Profile = ({ id, classes }) => {
  const { data, refetch: refetchUser } = useQuery(getUser, {
    variables: {
      id,
    },
  })
  const [updateUser] = useMutation(updateUserMutation)
  const [editMode, setEditMode] = useState(false)
  const [avatarURL, setAvatarURL] = useState(null)

  const user = get(data, 'user.0')
  const signupRequest = get(user, 'signupRequest', {})

  const initialValues = !user
    ? {}
    : formFields
        .filter(field => !field.name.includes('.'))
        .map(field => field.name)
        .reduce(
          (acc, key) => {
            acc[key] = user[key]
            return acc
          },
          {
            signupRequest,
          }
        )

  const saveProfile = async (values, actions) => {
    try {
      await updateUser({
        variables: {
          id,
          input: values,
        },
      })
      await refetchUser()
      setEditMode(false)
    } catch (err) {
      return false
    } finally {
      actions.setSubmitting(false)
    }
  }

  return user ? (
    <>
      <SEO title={`Profile | ${user.first_name} ${user.last_name}`}></SEO>
      <PaddedContainer className={classes.root}>
        <Formik
          initialValues={initialValues}
          onSubmit={saveProfile}
          validationSchema={validationSchema}
        >
          {({ values, handleSubmit, isSubmitting, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid container item xs={12} spacing={2}>
                  <Grid container item xs={2} direction="column">
                    <Grid item>
                      <div className={classes.flexContainerHorizontalVertical}>
                        <Avatar
                          {...(avatarURL && { src: avatarURL })}
                          className={classnames([
                            classes.avatar,
                            { [classes.avatarSmall]: editMode },
                          ])}
                        >
                          {user.first_name.charAt(0)}
                          {user.last_name.charAt(0)}
                        </Avatar>
                      </div>
                    </Grid>

                    <Grid item className={classes.addImageButtonWrapper}>
                      <div className={classes.flexContainerHorizontalVertical}>
                        <UploadImageWidget
                          path={`uploads/users/${id}`}
                          value={values.avatar}
                          onChange={s3key => {
                            setFieldValue('avatar', s3key)
                          }}
                          onUpload={setAvatarURL}
                        >
                          {({ startImageUpload, isLoading }) =>
                            editMode ? (
                              <Button
                                color="secondary"
                                onClick={startImageUpload}
                                disabled={isLoading}
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
                                  ></AccountCircle>
                                )}
                                Add image
                              </Button>
                            ) : null
                          }
                        </UploadImageWidget>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid item xs={2}>
                    <div className={classes.nameWrapper}>
                      <UserInfo
                        title="Name"
                        value={`${user.first_name} ${user.last_name}`}
                        size="large"
                      ></UserInfo>
                    </div>
                  </Grid>

                  <Grid item xs></Grid>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                  <Grid container item xs={2} direction="column">
                    <Grid item className={classes.spacer}></Grid>
                    <Grid item>
                      <Typography variant="h3" className={classes.myProfile}>
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
                    </Grid>
                  </Grid>

                  <Grid item xs={2}>
                    <UserInfo
                      title={formFields[0].label}
                      name={formFields[0].name}
                      value={get(values, formFields[0].name)}
                      editMode={editMode}
                    ></UserInfo>

                    <UserInfo
                      title="Organisation"
                      value={get(
                        signupRequest,
                        'userAttributes.custom:orgName'
                      )}
                    ></UserInfo>

                    <UserInfo
                      title="Role"
                      value={get(user, 'user_roles.0.role.name')}
                    ></UserInfo>

                    <UserInfo
                      title={formFields[1].label}
                      name={formFields[1].name}
                      value={get(values, formFields[1].name)}
                      editMode={editMode}
                    ></UserInfo>
                  </Grid>

                  <Grid item xs={6}>
                    <UserInfo
                      title={formFields[2].label}
                      name={formFields[2].name}
                      value={get(values, formFields[2].name)}
                      editMode={editMode}
                      rows={4}
                    ></UserInfo>

                    <Typography
                      variant="h4"
                      color="secondary"
                      className={classes.contactTitle}
                    >
                      Contact info
                    </Typography>

                    {formFields
                      .slice(4, 8)
                      .map(({ name, icon: Icon, iconClass, label }) => (
                        <Grid
                          container
                          spacing={2}
                          className={classes.contactInfoRow}
                          key={name}
                        >
                          <Grid item xs="auto">
                            <Icon
                              className={classnames([
                                classes.contactIcon,
                                classes[iconClass],
                              ])}
                            ></Icon>
                          </Grid>
                          <Grid item xs>
                            <div className={classes.userInfoWithIcon}>
                              <UserInfo
                                title={label}
                                name={name}
                                value={get(values, name)}
                                variant="light"
                                editMode={editMode}
                              ></UserInfo>
                            </div>
                          </Grid>
                        </Grid>
                      ))}

                    <div className={classes.consents}>
                      {formFields.slice(-2).map(({ name, label }) => (
                        <FormControlLabel
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
                          key={name}
                        />
                      ))}
                    </div>
                  </Grid>
                  <Grid item xs></Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </PaddedContainer>
    </>
  ) : (
    <SEO title="Profile"></SEO>
  )
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
    backgroundColor: theme.palette.primary.light,
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
    transform: `rotate(-45deg)`,
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
}))(Profile)
