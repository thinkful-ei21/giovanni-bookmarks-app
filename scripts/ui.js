'use strict';

import {store} from './store.js';

export const ui = (function(){

    const formatBookmark = function(obj){
        return `
        <div id="${obj.id}" class="bookMark">
            <h2>${obj.title}</h2>
            <a href="${obj.url}">${obj.url}</a>
                
        </div>  `

    };

    const formatPrompt = function(){
        return `
        <div class="add_item">
            <form id="new_item_form">
                <label for="new_item_form">New Bookmark</label>
                <input type="text" name="bookmark_title" class="bookmark_title_input" placeholder="bookmark title">
                <input type="text" name="bookmark_url" class="bookmark_url_input" placeholder="bookmark url">
                <input type="text" name="bookmark_description" class="bookmark_description_input" placeholder="bookmark description">
                <button type="submit">Add item</button>
            </form>
        </div>      
        `

    }

    const render = function(){
        if(store.pageState === 'display'){
            const list = store.bookmarks.map(formatBookmark).join('')
            $('.bookMark_list').html(list)}
        else if(store.pageState === 'add item'){
            const form = formatPrompt()
            $('.bookMark_list').html(form)
        }
        
    };



    return {
        formatBookmark,
        render,

    }

}())