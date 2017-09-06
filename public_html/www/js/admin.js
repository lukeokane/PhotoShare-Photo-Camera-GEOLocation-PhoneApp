$(function ()
    {
        var template = $('#image_display_div_template').html();
        var $templateInsideDiv = $('.images,  container');
        function addThumbnails(data)
            {
                $templateInsideDiv.append(Mustache.render(template, data));
            }




        $("#searchUserImages").on('keyup', function ()
            {
                var search_input = {
                    username: $(this).val()
                };
                $.ajax({
                    type: 'POST',
                    url: 'http://www.lukeokane.com/admin_search.php',
                    data: search_input,
                    dataType: 'json',
                    success: function (languages)
                        {
                            $templateInsideDiv.empty();
                            if (jQuery.isEmptyObject(languages) == true)
                                {
                                    $templateInsideDiv.append("No images uploaded by user.");
                                } else
                                {
                                    $.each(languages, function (i, language)
                                        {
                                            addThumbnails(language);
                                        });
                                }
                        },
                    error: function ()
                        {
                            alert('error');
                        }
                });
            });

        $("#deleteUserButton").on('click', function ()
            {
                var username = $('#searchUser').val();
                var search_input = {
                    username: username
                };

                $.ajax({
                    type: 'POST',
                    url: 'http://www.lukeokane.com/delete_user_by_name.php',
                    data: search_input,
                    success: function (languages)
                        {
                           $('#response').fadeIn();
                            $('#response').removeClass();
                            $('#response').empty();
                            $('#response').addClass("alert alert-success text-center ");
                            $('#response').append("<strong>Success!</strong> " + username + " has been deleted.");
                            $('#response').delay(5000).fadeOut();
                        },
                    error: function ()
                        {
                             $('#response').fadeIn();
                            $('#response').removeClass();
                            $('#response').empty();
                            $('#response').addClass("alert alert-danger text-center ");
                            $('#response').append("<strong>Error!</strong> Connection to the server failed.");
                            $('#response').delay(5000).fadeOut();
                        }
                });

            });

            $templateInsideDiv.delegate('.deleteImage', 'click', function ()
            {
                var $div = $(this).closest('#li');
                var imageID = $div.data("imageid");
               var imageID = {
                    imageID: imageID
                };
                $.ajax({
                    type: 'POST',
                    url: 'http://www.lukeokane.com/delete_image_by_image_id.php',
                    data: imageID,
                    success: function (languages)
                        {
                            $('#response').fadeIn();
                            $('#response').removeClass();
                            $('#response').empty();
                            $('#response').addClass("alert alert-success text-center ");
                            $('#response').append("<strong>Success!</strong> Image was deleted.");
                            $('#response').delay(5000).fadeOut();
                        },
                    error: function ()
                        {
                            $('#response').fadeIn();
                            $('#response').removeClass();
                            $('#response').empty();
                            $('#response').addClass("alert alert-danger text-center ");
                            $('#response').append("<strong>Error!</strong> Connection to the server failed.");
                            $('#response').delay(5000).fadeOut();
                        }
                    });
            });


        $templateInsideDiv.delegate('.editDescription', 'click', function ()
            {
                var $div = $(this).closest('#li');
                $div.find('textarea.description').val($div.find('p.description').html());
                $div.addClass('edit');
            });

        $templateInsideDiv.delegate('.cancelEdit', 'click', function ()
            {
                $(this).closest('#li').removeClass('edit');
            });

        $templateInsideDiv.delegate('.saveEdit', 'click', function ()
            {
                var $div = $(this).closest('#li');
                var imageID = $div.data("imageid");
                var description = {
                    description: $div.find('textarea.description').val(),
                    imageID: imageID
                };
                $.ajax({
                    type: 'POST',
                    url: 'http://www.lukeokane.com/alter_image_description.php',
                    data: description,
                    success: function (languages)
                        {
                            $div.find('p.description').html(description.description);
                            $div.removeClass('edit');
                            $('#response').fadeIn();
                            $('#response').removeClass();
                            $('#response').empty();
                            $('#response').addClass("alert alert-success text-center ");
                            $('#response').append("<strong>Success!</strong> Image description changed.");
                            $('#response').delay(5000).fadeOut();
                        },
                    error: function ()
                        {
                            $('#response').fadeIn();
                            $('#response').removeClass();
                            $('#response').empty();
                            $('#response').addClass("alert alert-danger text-center ");
                            $('#response').append("<strong>Error!</strong> Connection to the server failed.");
                            $('#response').delay(5000).fadeOut();
                        }
                });
            });
    });
