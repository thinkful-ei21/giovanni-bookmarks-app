'use strict';

import {store} from './store.js';

export const ui = (function(){



    const formatPrompt = function(){
        return `
        <div class="add-item">
            <form id="new-item-form">
                <label class= "add-item" for="new-item-form">New Bookmark</label>
                <input type="text" name="bookmark-title" class="add-item bookmark-title-input" placeholder="bookmark title">
                <input type="text" name="bookmark-url" class="add-item bookmark-url-input" placeholder="bookmark url">
                <input type="text" name="bookmark-description" class="add-item bookmark-description-input" placeholder="bookmark description">
                <button class= "add-item" type="submit">Add item</button>
            </form>
        </div>      
        `

    };

    const formatBookmark = function(obj){
        let details = '';
        let title = obj.title;
        let editButton = '';

        if(obj.detail === true){
            let url = `<a href="${obj.url}">${obj.url}</a>`;
            let description = `<span class= "description">${obj.desc}</span>`;
            
            if(obj.editing === true){
                title = `<input id="edit-name-${obj.id}" type= "text">`

            };
           

            details = `
            <div>   ${url}  ${description}
            
            </div>`
            editButton = `<button class="book-input edit-button">Edit Bookmark</button>`
        }
        
        return `
        <div id="${obj.id}" class="bookmark">
            <form>${title}
            
            ${details}
            </form>
            ${editButton}
            <div> stars go here </div>
            <input type="checkbox" name="select bookmark" class="book-input checkbox" value="${obj.id}">
        </div>  `

    };

    const render = function(){
        if(store.pageState === 'display'){
            const list = store.bookmarks.map(formatBookmark).join('')
            $('.bookmark-list').html(list)}
        else if(store.pageState === 'add item'){
            const form = formatPrompt();
            $('.bookmark-list').html(form);
            $('.add-bookmarks').focus();
        }
        
    };



    return {
        formatBookmark,
        render,

    }

}())