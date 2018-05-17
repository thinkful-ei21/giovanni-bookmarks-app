
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
                detail: false,
                editing: false,
            }, store.synch);
            $('html').off('click')  
            store.pageState = 'display'
     
        })
    }

    const newClicked = function(){
        $('.commands').on('click', '.New_BookMark', function(){
            store.pageState = 'add item';
            ui.render()
            listener.outsideClicked()
        })
    };

    const delClicked = function(){
        $('.commands').on('click', '.Delete_Selected', function(){
            const toDelete = []
            $('.bookMark_list').find('.checkbox').filter(':checked').each(function(index){
                toDelete.push($(this).val())
            })
            
            api.delMultiple(toDelete, store.synch)
        })
    };

    const outsideClicked = function(){
        let outClick = 0
        const revert = function(event){
            outClick +=1;
            if(store.pageState = 'add item' && outClick >1 && !$(event.target).hasClass('add_item')){
                store.pageState = 'display'
                ui.render()
                $('html').off('click', revert)        
            };
        };
        $('html').on('click', revert)      
    };

    const bookMarkClicked = function(){
        $('.bookMark_list').on('click', '.bookMark', function(event){
        //    console.log($(event.target).hasClass('book_command'))
            if(!$(event.target).hasClass('book_input')){
                store.findItem($(event.currentTarget).attr('id')).editing = false;
                store.toggleDetail($(event.currentTarget).attr('id'))   
            }
        })
    };

    const editClicked = function(){
        $('.bookMark_list').on('click', '.edit_button', function(event){
            const id = $(event.currentTarget).parent().attr('id');
            store.findItem(id).editing = true;
            ui.render()           
        })
    };

    return {
        newItemForm,
        newClicked,
        outsideClicked,
        delClicked,
        bookMarkClicked,
        editClicked,
    }
    
}())