
import {api} from './api.js';
import {store} from './store.js';
import {ui} from './ui.js';

export const listener = (function(){

    const newItemForm = function(){
        $('.bookmark-list').on('submit', '#new-item-form', function(event){
            event.preventDefault();
            const title = $(event.currentTarget).find('.bookmark-title-input').val();
            const url = $(event.currentTarget).find('.bookmark-url-input').val();
            const description = $(event.currentTarget).find('.bookmark-description-input').val();
  
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
        $('.page-commands').on('click', '.new-bookmark', function(){
            store.pageState = 'add item';
            ui.render()
            listener.outsideClicked()
        })
    };

    const delClicked = function(){
        $('.page-commands').on('click', '.delete-selected', function(){
            console.log('delete fired')
            const toDelete = []
            $('.bookmark-list').find('.checkbox').filter(':checked').each(function(index){
                toDelete.push($(this).val())
            })
            
            api.delMultiple(toDelete, store.synch)
        })
    };

    const outsideClicked = function(){
        let outClick = 0
        const revert = function(event){
            outClick +=1;
            if(store.pageState = 'add item' && outClick >1 && !$(event.target).hasClass('add-item')){
                store.pageState = 'display'
                ui.render()
                $('html').off('click', revert)        
            };
        };
        $('html').on('click', revert)      
    };

    const bookMarkClicked = function(){
        $('.bookmark-list').on('click', '.bookmark', function(event){
        //    console.log($(event.target).hasClass('book-command'))
            if(!$(event.target).hasClass('book-input')){
                store.findItem($(event.currentTarget).attr('id')).editing = false;
                store.toggleDetail($(event.currentTarget).attr('id'))   
            }
        })
    };

    const editClicked = function(){
        $('.bookmark-list').on('click', '.edit-button', function(event){
            event.preventDefault();
            const id = $(event.currentTarget).closest('.bookmark').attr('id');
            const item = store.findItem(id);
            item.editing = true;
            ui.render();
            console.log($(`#edit-name-${id}`));
            $(`#edit-name-${id}`).val(item.title);
            $(`#edit-url-${id}`).val(item.url)
            $(`#edit-desc-${id}`).val(item.desc)        
        })
    };

    const editSubmitted = function(){
        $('.bookmark-list').on('submit', '#edit-item-form', function(event){
            event.preventDefault();
            const id = $(event.currentTarget).parent().attr('id');
            console.log(id)
            const title = $(event.currentTarget).find('.edit-name').val();
            const url = $(event.currentTarget).find('.edit-url').val();
            const desc = $(event.currentTarget).find('.edit-desc').val();
            api.update(id,{title:title,url:url,desc:desc},store.synch);

        })      
    };

    return {
        newItemForm,
        newClicked,
        outsideClicked,
        delClicked,
        bookMarkClicked,
        editClicked,
        editSubmitted,
    }
    
}())