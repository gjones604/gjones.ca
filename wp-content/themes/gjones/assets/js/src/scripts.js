(function($) {
    
    /*
     * Select All courses checkbox toggle
     */
    $('#select-all').on('click', function(){
        $('#search-courses input:checkbox').prop('checked', $(this).prop("checked"));
    });
    


    // Fuse.js Search Options
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



    
    /*
     * Make a new Fuse search
     */ 
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
            // console.log(result);
            displayResults.html('');
            
            if(result){
                if (result.length < 100){
                    $.each(result, function(){
                        var des = this.item.description;
                        des = fixhtml(des.substring(0, 300)+'...');

                        var o = '';
                        o += '<div class="course" id="'+this.item.id+'">';
                            o += '<div class="course__item">';
                            o += '<h2 class="ct">'+this.item.title+'</h2>';
                            o += '<p class="cd">'+des+'</p>';
                         /*
                            if ( this.item.image ){
                                o += '<img class="course__image" src="'+this.item.image+'"/>';  
                            }
                        */
                            if ( this.item.url ){
                                o += '<a target="_blank" class="btn" href="'+this.item.url+'">View Course</a>';
                            }
                            if ( this.item.video ){
                                o += '<a target="_blank" class="btn btn--secondary" href="'+this.item.video+'">Watch Video</a>';
                            }
                            o += '</div>';
                        o += '</div>';
                        
                        displayResults.addClass('updated');
                        displayResults.prepend(o);
                    });
                }
            }
        }, 100);
    });
 



    /*
     * Click handler to add Course to user list.
     */
    var courseList = [];
    
    $('#search-results').on('click', '.course', function(){
        var courseIDs = [];
        
        $this = $(this);
        courseTitle = $this.find('.ct').html();
        courseID = $this.attr('id');

        if ( $this.hasClass('course__added') ){
            $this.removeClass('course__added');
            courseList = removeCourseFromList(courseList, '<li class="course-list__item" id="c_'+courseID+'">'+courseTitle+'</li>');
            $('.course-list').html(courseList);
        }else{
            $this.addClass('course__added');
            if (courseList.indexOf(courseTitle) == -1){
                courseList.push('<li class="course-list__item" id="c_'+courseID+'">'+courseTitle+'</li>');
            }
            $('.course-list').html(courseList);
        }


        // Grab selected course IDs and set them as hidden field's value.
        $('.course-list .course-list__item').each(function(){
            courseIDs.push( $(this).attr('id') );
        });
        $('input[name=selected_courses]').val(courseIDs);
 
    }); // end of click listener for .course
  



    

    
    // Removes a course from the courseList array.
    function removeCourseFromList(courseList, course){
        for(var i in courseList){
            if(courseList[i] == course){
                courseList.splice(i, 1);
                break;
            }
        }       
        return courseList;
    }


    // HELPER: This will close any open tags that are trimmed.
    function fixhtml(html){
        var div = document.createElement('div');
        div.innerHTML=html;
        return (div.innerHTML);
    }


})( jQuery );