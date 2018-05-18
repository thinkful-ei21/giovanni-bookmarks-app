'use strict';
/* global api */



import {api} from './api.js';
import {store} from './store.js';
import {ui} from './ui.js';
import {listener} from './listener.js';

$(

    listener.newItemForm(),
    listener.newClicked(),
    listener.minRatingChanged(),
    listener.delClicked(),
    listener.bookMarkClicked(),
    listener.editClicked(),
    listener.starClicked(),
    listener.editSubmitted(),
    listener.escapeMenu(),
    store.synch(),
    
)