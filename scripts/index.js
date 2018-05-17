'use strict';
/* global api */



import {api} from './api.js';
import {store} from './store.js';
import {ui} from './ui.js';
import {listener} from './listener.js';

$(

    listener.newItemForm(),
    listener.newClicked(),
    listener.delClicked(),
    listener.bookMarkClicked(),
    listener.editClicked(),
    store.synch(),
    

    // api.addBookMark(
    //    {title:'testItem', url: 'http://www.google.com', desc: 'here is some text', rating: 4, selected: false},
    //    api.getBookMarks(ui.render))
    
    // api.getBookMarks( function(response){
    //     obj = response[0];
    //     console.log(obj.id)
    //     api.delBookMark(obj.id, console.log)
    // })
        

)