const sendSound = (current, next) => {
  if (current < next) {
    console.log('Last Tone:', current)
    console.log('New Tone:', next)
  }
}

export default sendSound
