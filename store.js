import { applyMiddleware, createStore } from "redux"

import { logger } from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "./reducers"

const middleware = applyMiddleware(promise(), thunk, logger)

import { LoadStoreFile } from './StoreFile'
import { NativeModules } from 'react-native'

var savedStore

var storeFile = 'ThcsSettings.json'
exports.getSavedStore = async () => {
    if (await NativeModules.NativeLocalFile.FileExistAsync(storeFile)) {
        var settings = await LoadStoreFile()
        savedStore = createStore(reducer, { settings }, middleware)
    }
    else
        savedStore = createStore(reducer, middleware)

    // Setting default values.
    var keys = ['contentFontSize', 'countyIdSel', 'hospitalIdSel']
    var vals = [48, 0, 0]
    var { settings } = savedStore.getState()
    for (let k = 0; k < keys.length; k++) {
        // Set default value if null.
        if (settings[keys[k]] == null) {
            savedStore.dispatch({
                type: "SET_KEY_VAL",
                key: keys[k],
                val: vals[k]
            })
        }
    }

    return savedStore
}
