(function($) {
/*
    function helper_getCachedCourses(provider, keyword){
        $.getJSON( "/wp-content/themes/gjones/php-lib/course-cache/data-"+provider+".cache", function( data ) {
            helper_doSearch(data, keyword);
        });
    }
*/  
    

    function helper_doSearch(data, keyword){

        var results = [];
        var i;
        //console.log(data);
        keyword = keyword.toLowerCase();
        //console.log(keyword);
        for (i=0; i<data.length; i++){
            
            if ( data[i].title.toLowerCase().indexOf(keyword) !== -1 ){
                results.push(data[i]);
            }
        }

        //console.log(results);
    }


    function searchForKeyWord( searchData ){
        // Separate out keyword
        var keyword = searchData.shift();
        
        //console.log(searchData);
        
        Object.values(searchData).forEach(function(val) {
            helper_doSearch(jsonData, keyword);
        });
    }


    
    /*
     * Select All courses checkbox toggle
     */
    $('#select-all').on('click', function(){
        $('#search-courses input:checkbox').prop('checked', $(this).prop("checked"));
    });
    

    /*
     * Form handler for Search Courses
     */
    var searchForm = $('#search-courses');

    searchForm.find('input[name=search-courses]').on('keyup', function(e){
        var keyword = $(this).val();
        var searchData = $('#search-courses input:checked:checked').map(function(){
            return $(this).val();
        }).get();

        // Attach keyword to front of providers list 
        searchData.unshift(keyword);
        //console.log(searchData);
        searchForKeyWord(searchData);
    });

//console.log(data_edx);


    //console.log(data_edx);
    //console.log(data_futurelearn_courses);
   

})( jQuery );