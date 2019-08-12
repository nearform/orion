function getSampleColors(theme) {
  return [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.secondary.dark,
  ]
}

function getSampleData(sampleColors) {
  return [
    { score: 35, color: sampleColors[0], label: 'Purpose & Strategy' },
    {
      score: 12,
      color: sampleColors[0],
      label: 'Organisational Leadership & Culture',
      weighting: 2,
    },
    {
      score: 0,
      color: sampleColors[1],
      label: 'Engaging with Stakeholders',
    },
    {
      score: 95,
      color: sampleColors[1],
      label: 'Creating Sustainable Value',
    },
    {
      score: 100,
      color: sampleColors[1],
      label: 'Driving Performance & Transformation',
    },
    {
      score: 70,
      color: sampleColors[2],
      label: 'Stakeholder Perceptions',
      weighting: 0.5,
    },
    {
      score: 30,
      color: sampleColors[2],
      label: 'Organisational Performance',
      weighting: 0.5,
    },
  ]
}

export { getSampleColors, getSampleData }
