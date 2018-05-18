'use strict';



export const api = (function(){

    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/giovanni';

    const getBookMarks = function(callback){
        $.getJSON(BASE_URL+"/bookmarks",callback)
    };

    const parseErr = function(error){
        return JSON.parse(error['responseText']).message;

    }
    const addBookMark = function(BookObject,success, Err){
        const newObj = JSON.stringify(BookObject);
        $.ajax({
            url: BASE_URL + '/bookmarks',
            method: 'POST',
            contentType: 'application/json',
            data: newObj,
            success: success,
            error: Err,
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

    const delMultiple = function(arr, callback){
        let count = 0;
        console.log(arr.length)
        arr.forEach(function(id){
            api.delBookMark(id, function(){
                count += 1;
                console.log(count)
                if(count >= arr.length){callback()}
            })
        })
        
    };

    const update = function(id,newValObj, success, Err = console.log){
        const newData = JSON.stringify(newValObj);
        $.ajax({
          url: BASE_URL + '/bookmarks/'+id,
          method: 'PATCH',
          contentType: 'application/json',
          data: newData,
          success:success,
          error:Err,
        })
    };

    return {
        getBookMarks,
        addBookMark,
        delBookMark,
        delMultiple,
        parseErr,
        update,

    }

}())