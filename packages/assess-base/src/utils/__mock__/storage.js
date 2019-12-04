module.exports = {
  uploadFile: (file, assessmentId) =>
    new Promise(resolve => {
      resolve({
        key: `uploaded-for-${assessmentId}`,
      })
    }),
}
