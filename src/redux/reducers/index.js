import profile from './profile'
import profiles from './profiles'
import account from './account'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    profile,
    profiles,
    account
})

export default rootReducer