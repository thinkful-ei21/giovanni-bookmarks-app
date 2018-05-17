
import {api} from './api.js';
import {store} from './store.js';
import {ui} from './ui.js';

export const listener = (function(){

    const newItemForm = function(){
        $('.bookMark_list').on('submit', '#new_item_form', function(event){
            event.preventDefault();
            const title = $(event.currentTarget).find('.bookmark_title_input').val();
            const url = $(event.currentTarget).find('.bookmark_url_input').val();
            const description = $(event.currentTarget).find('.bookmark_description_input').val();
           
            api.addBookMark({
                title: title,
                url : url,
                desc: description,
                rating: 5,
                selected: false,
            }, store.synch);

            store.pageState = 'display'
        
        })
    }

    const newClicked = function(){
        $('.commands').on('click', '.New_BookMark', function(){
            store.pageState = 'add item';
            ui.render()
        })


    };

    return {
        newItemForm,
        newClicked,


    }
    
}())