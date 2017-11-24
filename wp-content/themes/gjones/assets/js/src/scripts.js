(function($) {
    
    /*
     * Select All courses checkbox toggle
     */
    $('#select-all').on('click', function(){
        $('#search-courses input:checkbox').prop('checked', $(this).prop("checked"));
    });
    

    var options = {
        shouldSort: true,
        //findAllMatches: true,
        includeScore: true,
        threshold: 0.3,
        location: 0,
        distance: 60,
        maxPatternLength: 32,
        keys: [
            "title",
            "description"
        ]
    };

    //console.log(jsonData);
    var fuse = new Fuse(jsonData, options);
    //console.log(fuse);


    /*
     * Form handler for Search Courses
     */
    var searchForm = $('#search-courses');


    searchForm.find('input[name=search-courses]').on('keyup', function(e){

        var displayResults = $('#search-results');
        var keyword = $(this).val();
        var searchData = $('#search-courses input:checked:checked').map(function(){
            return $(this).val();
        }).get();
        
        
        setTimeout(function(){
            // Search Results
            var result = fuse.search(keyword);
            //console.log(result);
            displayResults.html('');
            
            if(result){
                if (result.length < 100){

                    $.each(result, function(){
                        var o = '';
                        o += '<div class="course grid__item one-quarter" id="'+this.item.id+'">';
                            o += '<div class="course__item">';
                            o += '<h2 class="ct">'+this.item.title+'</h2>';
                            o += '<p class="cd">'+this.item.description+'</p>';
                            if ( this.item.url ){
                                o += '<a target="_blank" class="btn" href="'+this.item.url+'">View Course</a>';
                            }
                            if ( this.item.image ){
                              o += '<img class="course__image" src="'+this.item.image+'"/>';  
                            }
                            if ( this.item.video ){
                                o += '<a target="_blank" class="btn btn--secondary" href="'+this.item.video+'">Watch Video</a>';
                            }
                            o += '</div>';
                        o += '</div>';
                        
                        displayResults.prepend(o);
                    });
                }
            }
        }, 100);




    });
 



})( jQuery );