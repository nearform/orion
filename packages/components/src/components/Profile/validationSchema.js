import * as Yup from 'yup'

export default Yup.object().shape({
  signupRequest: Yup.object()
    .shape({
      userAttributes: Yup.object()
        .shape({
          email: Yup.string().email('Email must be a valid email'),
          'custom:country': Yup.string(),
        })
        .required(),
    })
    .required(),
  avatar: Yup.string().nullable(),
  title: Yup.string().nullable(),
  biography: Yup.string().nullable(),
  linkedin: Yup.string()
    .url()
    .nullable(),
  website: Yup.string()
    .url()
    .nullable(),
  twitter: Yup.string()
    .url()
    .nullable(),
  consent_contact: Yup.boolean().required(),
  consent_directory: Yup.boolean().required(),
})
