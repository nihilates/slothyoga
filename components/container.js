import PropTypes from 'prop-types'
import '../styles/style.scss'

const Container = ({ children }) => (
  <div className='container'>
    {children}
  </div>
)

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ])
}

export default Container
