'use strict';

import {store} from './store.js';

export const ui = (function(){



    const formatPrompt = function(){
        return `
        <div class="add-item">
            <form id="new-item-form">
                <label class= "add-item hidden" for="new-item-form">New Bookmark</label>
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
        let submitButton = '';

        if(obj.detail === true){
            let url = `<a href="${obj.url}" class="details url">${obj.url}</a>`;
            let description = `<a class= "details description">${obj.desc}</a>`;
            
            if(obj.editing === true){
                title = `<label for="edit-item-form" class="hidden"l>Edit Bookmark</label>
                <input class="book-input edit-name" id="edit-name-${obj.id}" type= "text"><a class="error nameError"></a>`;
                url = `<input class="book-input edit-url" id="edit-url-${obj.id}" type= "text"><a class="error urlError"></a>`;
                description = `<input class="book-input edit-desc" id="edit-desc-${obj.id}" type= "text"><a class="error descError"></a>`;
                submitButton = `<button class="hidden book-input submit-edit">t Bookmark</button>`
                editButton =''
            };           

            editButton = `<button class="book-input edit-button">Edit Bookmark</button>`
            details = `<div>   ${url}  ${description} ${submitButton} </div>`
        };

        const stars = {s1:'☆',s2:'☆',s3:'☆',s4:'☆',s5:'☆',};
        Object.keys(stars).forEach(s =>  s[1] <= obj.rating ? stars[s] = '★':{});
        
        const hide = obj.rating >= store.minimumStars ? '' : "hidden"

        return `
        <li id="${obj.id}" class="bookmark ${hide}" tabindex="0">
            <form id="edit-item-form-${obj.id}" class="edit-item-form" value="${obj.id}">
            <input type="checkbox" class"checkbox book-input" id="select-bookmark-${obj.id}" name="select-bookmark-${obj.id}" class="book-input checkbox" value="${obj.id}">
            ${title}
            ${details}
            </form>
            ${editButton}
            <div class= "star-ratings" value="${obj.id}" >
                <button class="book-input star star-1" value=1 >${stars['s1']}</button>
                <button class="book-input star star-2" value=2>${stars['s2']}</button>
                <button class="book-input star star-3" value=3>${stars['s3']}</button>
                <button class="book-input star star-4" value=4>${stars['s4']}</button>
                <button class="book-input star star-5" value=5>${stars['s5']}</button>
            </div>
            <label for="select-bookmark-${obj.id}" class="visuallyhidden">select:</label>
        </li>  `

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