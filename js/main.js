(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:3
            },
            768:{
                items:4
            },
            992:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });

    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });

    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

    $(document).ready(function () {
        updateTotal(); 

        $('.quantity button').on('click', function () {
            updateTotal();
        });

        // Function to update the total price
        function updateTotal() {
            var total = 0;

            // Loop through each row in the table
            $('.table tbody tr').each(function () {
                var price = parseFloat($(this).find('.align-middle:eq(1)').text().replace('kr', '').replace(',', '.'));
                var quantity = parseInt($(this).find('.quantity input').val());
                var subtotal = price * quantity;

                total += subtotal;
                
                // Update the total column in the current row
                $(this).find('.align-middle:eq(3)').text(subtotal.toFixed(2).replace('.', ',') + ' kr');
            });

            // Update the total in the summary section
            var updatedTotal = total + 49; // Add 49 to the total
            $('.bg-light.p-30.mb-5 .d-flex.justify-content-between.mt-2 h5:eq(1)').text(updatedTotal.toFixed(2).replace('.', ',') + ' kr');

            // Update the live sum in the "Totalt" section
            $('#totaltValue').text(total.toFixed(2).replace('.', ',') + ' kr');
        }
    });

})(jQuery);