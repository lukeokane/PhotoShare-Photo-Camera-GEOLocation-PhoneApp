$(function ()
    {

var albumOwner = localStorage.getItem("usernameOfAlbumOwner");
var albumID = localStorage.getItem('albumID');
        var data = {
            usernameOfAlbumOwner: albumOwner,
            albumID: albumID
        };
        var template = $('#image_display_div_template').html();
        var $templateInsideDiv = $('.images,  container');
        function addThumbnails(data)
            {
                $templateInsideDiv.append(Mustache.render(template, data));
            }

        $.ajax({
            type: 'POST',
            url: 'http://www.lukeokane.com/get_album_images.php',
            dataType: 'json',
            data: data,
            success: function (languages)
                {
                    $('#albumName').append("<br>" + languages[0].albumName + " <b>(Created by: " + albumOwner + ")</b>");

                    if (jQuery.isEmptyObject(languages) == true)
                        {
                            $(".container").append("There are no images in this album... yet ;)");
                        }
                    $.each(languages, function (i, language)
                        {
                            addThumbnails(language);
                        });
                },
            error: function ()
                {
                    $('#response').fadeIn();
                    $('#response').removeClass();
                    $('#response').empty();
                    $('#response').addClass("alert alert-danger text-center ");
                    $('#response').append("<strong>Error!</strong> Connection to server failed.");
                    $('#response').delay(5000).fadeOut();
                }
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
    });
