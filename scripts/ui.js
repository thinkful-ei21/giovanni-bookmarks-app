'use strict';

import {store} from './store.js';

export const ui = (function(){



    const formatPrompt = function(){
        return `
        <div class="add_item">
            <form id="new_item_form">
                <label class= "add_item" for="new_item_form">New Bookmark</label>
                <input type="text" name="bookmark_title" class="add_item bookmark_title_input" placeholder="bookmark title">
                <input type="text" name="bookmark_url" class="add_item bookmark_url_input" placeholder="bookmark url">
                <input type="text" name="bookmark_description" class="add_item bookmark_description_input" placeholder="bookmark description">
                <button class= "add_item" type="submit">Add item</button>
            </form>
        </div>      
        `

    };

    const formatBookmark = function(obj){
        let details = ''
        let editD = ''
        if(obj.detail === true){details = `
            <a>another element</a>
            <button class="book_input edit_button">Edit Bookmark</button>
        `}
        if(obj.editing === true){editD = `, I'm in edit mode now`}
        return `
        <div id="${obj.id}" class="bookMark">
            <h2>${obj.title}${editD}</h2>
            ${details}
            <a href="${obj.url}">${obj.url}</a>
            <input type="checkbox" name="select bookmark" class="book_input checkbox" value="${obj.id}">
        </div>  `

    };

    const render = function(){
        if(store.pageState === 'display'){
            const list = store.bookmarks.map(formatBookmark).join('')
            $('.bookMark_list').html(list)}
        else if(store.pageState === 'add item'){
            const form = formatPrompt();
            $('.bookMark_list').html(form);
            $('.add_bookMarks').focus();
        }
        
    };



    return {
        formatBookmark,
        render,

    }

}())