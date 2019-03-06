work = {
    init: function () {
        $('.project label').on('click', function () {
            var $this = $(this);
            $this.parent().parent().toggleClass('open');
        });
    }
};