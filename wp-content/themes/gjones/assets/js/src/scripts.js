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
    var o = '';

    $('#search-results').on('click', '.course', function(){
        $this = $(this);
        courseTitle = $this.find('.ct').html();

        if ( $this.hasClass('course__added') ){
            $this.removeClass('course__added');
            courseList = removeCourseFromList(courseList, '<li>'+courseTitle+'</li>');
            $('.course-list').html(courseList);
        }else{
            $this.addClass('course__added');
            if (courseList.indexOf(courseTitle) == -1){
                courseList.push('<li>'+courseTitle+'</li>');
            }
            $('.course-list').html(courseList);
        }


    });  



    /*

        Click on course.
            Add ID to list array
        
        Click on course again
            Remove from list array by ID
        
        always
            re-render html based on array.

    */

    
  //o = '<span class="course-list__item" id="item-'+$this.attr('id')+'"><span class="course-list__remove">x</span><a href="#'+$this.attr('id')+'">'+$this.find('.ct').html()+'</a></span>';

    // Adds a course to the courseList array.
    function removeCourseFromList(courseList, course){
        for(var i in courseList){
            if(courseList[i] == course){
                courseList.splice(i, 1);
                break;
            }
        }       
        return courseList;
    }



/*
// TODO: Add selected items to hidden field and attach during form submit.
    var courseList = $('#selected_courses').val();
    courseList += $this.attr('id')+',';
    $('#selected_courses').val(courseList);
*/
        
 

    function fixhtml(html){
        var div = document.createElement('div');
        div.innerHTML=html;
        return (div.innerHTML);
    }


})( jQuery );