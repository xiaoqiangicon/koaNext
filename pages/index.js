import store from '../store/store-test';
import { connect } from 'react-redux';

const Index = ({counter, username, add, rename}) => {
  return (
    <div>
      <span>counter: {counter}</span>
      <span>name: {username}</span>
      <input value={username} onChange={(e) => rename(e.target.name)} />
      <button onClick={() => add(14)}>to add</button>
    </div>
  )
}

export default connect(function mapStateToProps(state) {
  return {
    counter: state.counter.count,
    username: state.user.username,
  }
}, function mapDispatchToProps(dispatch) {
  return {
    add: (num) => dispatch({ type: 'ADD', num }),
    rename: (name) => dispatch({ type: 'UPDATE_USERNAME', name })
  }
})(Index);