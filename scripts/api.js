'use strict';



export const api = (function(){

    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/giovanni';

    const getBookMarks = function(callback){
        $.getJSON(BASE_URL+"/bookmarks",callback)
    };

    const addBookMark = function(BookObject,callback){
        const newObj = JSON.stringify(BookObject);
        $.ajax({
            url: BASE_URL + '/bookmarks',
            method: 'POST',
            contentType: 'application/json',
            data: newObj,
            success: callback,
            error: console.log,
        })
    };
    
    const delBookMark = function(id,callback){
        $.ajax({
            url: BASE_URL + '/bookmarks/' +id,
            method: 'DELETE',
            contentType: 'application/json',
            success: callback,
            error: console.log,

        })
    };

    const update = function(id,newValObj, callback){
        const newData = JSON.stringify(newValObj);
        $.ajax({
          url: BASE_URL + '/items/'+id,
          method: 'PATCH',
          contentType: 'application/json',
          data: newData,
          success:callback,
          error:console.log,
        })
    };

    return {
        getBookMarks,
        addBookMark,
        delBookMark,
        update,
    }

}())