$(document).ready(function() {
    let modal = $('.birthday_inner__modal');
    let progress = 1;

    // --- Stage 1: Introduction ---
    $('.start').click(function(){
        $('.stage1').fadeOut();
        fire_modal('https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/cake_modal.png','Let’s make a cake!','Since it’s your birthday, I find it only fitting that you get to make your own digital birthday cake. Start by making your cake mixture, then bake it in a digital oven and finally decorate. Have fun and happy birthday');
    });

    // --- Modal Navigation ---
    $('.modal_content button').click(function(){
        progress++;
        close_modal(progress);
    });

    function close_modal(callback){
        modal.css('transform','translateY(-50%) scale(0)');
        setTimeout(function(){
            $('.stage' + callback).fadeIn();
        },600);
    }

    function fire_modal(imgurl, title, content){
        modal.find('h1').html(title);
        modal.find('img').attr('src', imgurl);
        modal.find('p').html(content);
        setTimeout(function(){
            modal.css('transform','translateY(-50%) scale(1)');
        },1000);
    }

    // --- Stage 2: Mixing ---
    let mixing = false;
    let mixtimes = 0;

    $('.mixer').click(function(){
        if(mixing == false){
            mixing = true;
            mixtimes++;
            $('.mix_spoon img').addClass('move');

            if (mixtimes >= 6) {
                // Done mixing
                $('.mixer').prop('disabled', true).text('Mixture Ready!');
                setTimeout(function() {
                    $('.stage2').fadeOut();
                    fire_modal('https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/mix_modal.png','Mix successful!','Congratulations, the mixture is perfect! After pouring the mixture into a baking tin, it’s now time to put it in our digital oven for about 3 seconds. That should be enough time for a nice spongy base.');
                }, 1000); // Wait for mix animation to finish
            }
            
            setTimeout(function(){
                $('.mix_spoon img').removeClass('move');
                mixing = false;
            },1000);
        }
    });

    // --- Stage 3: Baking (Drag & Drop) ---
    $('.tin').draggable({
        revert: true,
        start: function(event, ui) {
            $(this).css('z-index', 100);
        },
        stop: function(event, ui) {
            $(this).css('z-index', 1);
        }
    });

    $(".oven").droppable({
        accept: ".tin",
        drop: function(event, ui) {
            // Hide the tin and bowl visually when dropped
            $('.tin, .mix_bowl').fadeOut();
            
            // Show success modal and transition to stage 4
            $('.stage3').fadeOut();
            fire_modal('https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/oven_modal.png','Bake successful!','Yes! You are a master chef. The base is fully baked and looks super yummy. Now its time to combine this base with lots of other ingredients like jam, marmalade, chocolate and more.');
        }
    });

    // --- Stage 4: Decorating ---
    let bases = 0; // Sponges count
    let fillings = 0; // Fillings/icing count

    // Add Sponge
    $('.sponges .item_inner').click(function(){
        bases++;
        if(bases <= 5){ 
            // Lock sponges, unlock fillings
            $('.sponges').addClass('inactive');
            $('.fillings').removeClass('inactive');
            
            // Get the class (e.g., 'vanilla', 'strawberry')
            let t = $(this).attr('class').split(' ').pop(); 
            add_sponge(t);

            if(bases == 5) {
                $('.sponges').addClass('inactive');
            }
        } else {
             bases = 5;
        }
    });

    // Add Filling/Icing
    $('.fillings .item_inner').click(function(){
        fillings++;
        if(fillings <= 6){
            // Lock fillings, unlock sponges
            $('.fillings').addClass('inactive');
            $('.sponges').removeClass('inactive');
            
            // Get the class (e.g., 'jam', 'cream')
            let f = $(this).attr('class').split(' ').pop();
            add_filling(f);

            if(fillings == 6) {
                $('.fillings').addClass('inactive');
            }
        } else {
             fillings = 6;
        }
    });

    // Function to add a sponge layer
    function add_sponge(t){
        let newWidth = 200 - (bases * 20);
        $('.cakemake').prepend('<div style="width:' + newWidth + 'px" class="sponge sponge-' + t + '"><div></div><div></div><div></div><div></div><div></div></div>');
        $('.sponges h5 span').html(bases);
    }

    // Function to add a filling layer
    function add_filling(f){
        let newWidth = 200 - (bases * 20);
        // Added 8 divs for decoration dots as per original HTML structure
        $('.cakemake').prepend('<div style="width:' + newWidth + 'px" class="filling filling-' + f + '"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>');
        $('.fillings h5 span').html(fillings);
    }

    // Start Again Button in Options Panel
    $('.startagain').click(function(){
        reset_cake();
    });
    
    // Reset function
    function reset_cake() {
        $('.cakemake').html('<div class="base"></div>');
        bases = 0;
        fillings = 0;
        $('.sponges h5 span').html(bases);
        $('.fillings h5 span').html(fillings);
        // Reset state
        $('.fillings').removeClass('inactive');
        $('.sponges').removeClass('inactive').addClass('inactive');
        // Ensure the general instruction text is back and final-message is hidden
        $('.stage4 h2:not(.final-message)').show().html("Build your cake in any order you want. Click an ingredient to add it to your cake. You can add more than one item e.g 2 vanilla sponges but only 5 bases and 6 fillings. Hit the button at the bottom to finish your cake and add your candles. Make sure you leave some icing for the top of your cake!");
        $('.final-message').hide();
    }


    // Finish Cake
    $('.add').click(function(){
        if (bases === 0 || fillings === 0) {
            // Using the primary H2 for a temporary warning message
            $('.stage4 h2:not(.final-message)').html("<span style='color: #e77572;'>Please add at least one sponge layer and one filling before adding the candle!</span>").css('opacity', 1).fadeIn();
            return;
        }

        fin();
    });

    function fin(){
        // Hide all stage 4 controls
        $('h1, h2:not(.final-message), .options, .startagain, .add').fadeOut();
        
        setTimeout(function(){
            // Animate cake to final display position
            $('.cakemake').animate({'margin-top':'0px'}, 1000); 
            add_candle();
        },500);
    }

    function add_candle(){
        // Add the candle at the very top
        $('.cakemake').prepend('<div class="candle" ><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/candle.png" /></div>');
        
        // Show the new final text
        $('.final-message').fadeIn(1000);
        
        // Show the final restart button
        setTimeout(function(){
            $('.sa').fadeIn();
        },3000); 
    }
    
    // Final Start Again Button (reloads the page)
    $('.sa').click(function(){
        window.location.reload();
    });
});
