(function($) {
    
    /*
     * AJAX handler for Create a Posting form.
     */
    var formVals = '';
    $('#add-posting').on('submit', function(e){
        e.preventDefault();

        var $this = $(this);
        var formVals = {
            'posting_title' : $this.find('input[name=posting_title]').val(),
            'number_of_positions' : $this.find('input[name=number_of_positions]').val(),
            'description' : $this.find('textarea[name=description]').val(),
            'compensation' : $this.find('input[name=compensation]').val(),
            'requirements' : $this.find('textarea[name=requirements]').val(),
            'selected_courses' : $this.find('input[name=selected_courses]').val()
        };
        
        $.ajax({
            type: "POST",
            url:  myAjax.ajaxurl, 
            data: {
                action: "create_posting",
                value: formVals
            },
            dataType: 'json',
            encode: true,
            beforeSend: function(){
                // before sending to the backend
                //console.log('before send');
                //console.log(formVals);
            },
            success: function(response) {
                // it worked, do stuff...
                //console.log('the response');
                //console.log(response);
                //$('.here').html(response);
            }
        });
    });
    // end AJAX handler for Create a Post form.

})( jQuery );