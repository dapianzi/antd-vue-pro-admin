import { createStore } from 'store/src/store-engine'
import session from 'store/storages/sessionStorage'
import plugins from 'store/plugins/json2'

export default createStore(session, plugins)
