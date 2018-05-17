'use strict';

import {ui} from './ui.js';
import {api} from './api.js';


export const store = (function(){

    const addItem = function(itemObj){
        store.bookmarks.push(itemObj)
        ui.render()

        };

    const findItem = function(id){
        return store.bookmarks.find(item => item.id === id)
    };

    const synch = function(){
        api.getBookMarks(function(arr){
            store.bookmarks = arr
            ui.render()
        })
    };


    return {
        bookmarks: [],
        pageState: 'display',
        minimumStars: 1,

        addItem,
        findItem,
        synch,
    }

}())