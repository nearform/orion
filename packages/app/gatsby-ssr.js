import React from 'react'

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  replaceHeadComponents([
    ...getHeadComponents(),
    // we're injecting the google fonts styles here because
    // we need the crossOrigin="anonymous" attribute to make the
    // fonts work when exporting the profile image
    <link
      key="google-fonts"
      rel="stylesheet"
      type="text/css"
      crossOrigin="anonymous"
      href="https://fonts.googleapis.com/css?family=Poppins:700|Didact+Gothic:400"
    />,
    <script
      key="google-platform"
      src="https://apis.google.com/js/platform.js"
    />,
  ])
}
