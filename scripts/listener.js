
import {api} from './api.js';
import {store} from './store.js';
import {ui} from './ui.js';

export const listener = (function(){

    const newItemForm = function(){
        $('.bookmark-list').on('submit', '#new-item-form', function(event){
            event.preventDefault();
            const title = $(event.currentTarget).find('.bookmark-title-input').val();
            const url = $(event.currentTarget).find('.bookmark-url-input').val();
            const description = $(event.currentTarget).find('.bookmark-description-input').val()+' ';

            const onErr = function(error){
                $(event.currentTarget).after(`error: ${api.parseErr(error)}`)};

            api.addBookMark({
                title: title,
                url : url,
                desc: description,
                rating: 4,
                detail: false,
                editing: false,
            }, store.synch, onErr);
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
        $('.bookmark-list').on('click keypress', '.bookmark', function(event){
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
        $('.bookmark-list').on('submit', '.edit-item-form', function(event){
            event.preventDefault();
            const id = $(event.currentTarget).parent().attr('id');
            const title = $(event.currentTarget).find('.edit-name').val();
            const url = $(event.currentTarget).find('.edit-url').val();
            const desc = $(event.currentTarget).find('.edit-desc').val();
            const onErr = function(error){
                $(event.currentTarget).after(`error: ${api.parseErr(error)}`)};
            
            if(title.length < 1){$(event.currentTarget).find('.nameError').html('Name must be at least one character long')}          
            else if(url.slice(0,7) !== 'http://'){$(event.currentTarget).find('.urlError').html('Url must begin with http://')}          
            else if(title.length < 1){$(event.currentTarget).find('.descError').html('Description must be at least one character long')}          
            else{api.update(id,{title:title,url:url,desc:desc},store.synch, onErr)}

        })      
    };

    const starClicked = function(){
        $('.bookmark-list').on('click', '.star', function(event){
            const id = $(event.target).closest('.bookmark').attr('id');
            const rating = $(event.target).val();
            api.update(id,{rating:rating},store.synch);

        })
    };


    const minRatingChanged = function(){
        $('.min-stars').on('change',function(event){
            store.minimumStars = $('.min-stars').val();
            ui.render()
        });
    };

    const escapeMenu = function(){
        $(document).on('keydown',function(event){
            if(store.pageState !== 'display' && event.keyCode == 27){
                store.pageState = 'display';
                ui.render()
            }  
        })        
    };

    return {
        newItemForm,
        newClicked,
        minRatingChanged,
        outsideClicked,
        delClicked,
        bookMarkClicked,
        editClicked,
        starClicked,
        editSubmitted,
        escapeMenu,
    }
    
}())