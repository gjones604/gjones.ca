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
        tokenize: true,
        //findAllMatches: true,
        includeScore: true,
        threshold: 0.3,
        location: 0,
        distance: 60,
        maxPatternLength: 32,
        keys: [
            "title",
            "intro"
        ]
    };


if ( $('body').hasClass('page-template-template-add-posting') ){


    
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
            //console.log(result);
            displayResults.html('');
            
            if(result){
                if (result.length < 100){
                    $.each(result, function(){
                        //var intro = this.item.description;                        
                        //intro = fixhtml(intro.substring(0, 150));
                        
                        /*
                        var des = this.item.description;
                        var des_out = '';
                        
                        if ( intro.length <= 300 ){
                            des_out = '<div class="cd">'+this.item.description+'</div>';                     
                        }
                        
                        if ( intro.length >= 300 ){
                            
                            des = des.substring(300);

                            des_out += '<div class="tab">';
                                des_out += '<input id="tab-'+this.item.id+'" type="checkbox" name="tabs">';
                                des_out += '<label for="tab-'+this.item.id+'">'+intro+'</label>';
                                des_out += '<div class="tab-content cd">'+des+'</div>';
                            des_out += '</div>';
                        }*/

                        var o = '';
                        o += '<div class="course provider_'+this.item.provider+'" id="'+this.item.id+'">';
                            o += '<div class="course__item">';
                                o += '<h2 class="ct">'+this.item.title+'</h2>';
                                o += '<span class="add-to-list">Add To List</span>';
                                /*
                                if ( this.item.image ){
                                    o += '<img class="course__image" src="'+this.item.image+'"/>';  
                                }
                                */
                                
                                o += '<div class="tab-content cd">'+this.item.description+'</div>';


                                /*
                                o += '<div class="tab">';
                                    o += '<input id="tab-'+this.item.id+'" type="checkbox" name="tabs">';
                                    o += '<label for="tab-'+this.item.id+'">Read Description</label>';
                                    o += '<div class="tab-content cd">'+this.item.description+'</div>';
                                o += '</div>';
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
                        displayResults.append(o);
                    });
                }
            }
        }, 100);
    });
 



    /*
     * Click handler to add Course to user list.
     */
    var courseList = [];
    
    $('#search-results').on('click', '.add-to-list', function(){
        var courseIDs = [];
        $('#course-list').removeClass('hidden');
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
  

    $('#clear-list').on('click', function(){
        var $this = $(this);
        $('.course-list').html('');
        courseIDs = [];
        courseList = [];
        $('input[name=selected_courses]').val('');
        $('.course').each(function(){
            $(this).removeClass('course__added');
        });
    });

}

    

    
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




    // Copy text to clipboard
    function copyToClipboard(element) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
    }
      
    $('.fa-file-text-o').on('click', function(){
        var $this = $(this);
        copyToClipboard($this.next('.course__item-data'));
        $this.append('<span class="copied">copied</span>');
        setTimeout(function(){
            $('.copied').fadeOut();
        }, 500);
    });
    



        // tabs
        $('#login-tabs a').click(function (e) {
            e.preventDefault();
    
            $this = $(this);
    
            // add class to tab
            $('#login-tabs li').removeClass('active-tab');
            $this.parent().addClass('active-tab');
    
            // show the right tab
            $('#page-login .tab-content').hide();
            $('#page-login ' + $this.attr('href')).show();
    
            return false;
        });
    

})( jQuery );