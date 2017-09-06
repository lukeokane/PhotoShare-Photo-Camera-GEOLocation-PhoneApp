$(document).ready(function ()
    {
        var albumID = localStorage.getItem('albumID');
        var username = localStorage.getItem('username');
        var upload;
        $('#upload_file #uploadgallerybutton').on('click', function (e)
            {
                $('#upload_file :file').click();
            });

        $('#upload_file :file').on('change', function (e)
            {
                var isJPEG = true;
var fileSize = this.files.length;
                var file;
                var type;
                for (var i = 0; i < this.files.length; i++)
                    {
                        var file = this.files[i];
                        var type = file.type;
                        if (type === 'image/jpg' || type === 'image/jpeg')
                            {
                            } else
                            {
                                isJPEG = false;
                            }
                    }

                if (isJPEG === true && this.files.length > 0)
                    {
//                        if (navigator.connection.type === "none")
                        if (1 === 2)
                            {
                                $('#response').fadeIn();
                                $('#response').removeClass();
                                $('#response').empty();
                                $('#response').addClass("alert alert-warning text-center ");
                                $('#response').append("<strong>Error!</strong> No internet connection detected, check wifi is turned on.");
                                $('#response').delay(5000).fadeOut();
                            } else
                            {
                                upload = $.ajax({
                                    url: 'http://www.lukeokane.com/upload_gallery_images.php',
                                    type: "POST",
                                    contentType: false,
                                    data: new FormData(document.getElementById('upload_file')),
                                    processData: false,
                                    success: function (data)
                                        {
                                            var dataJSON = jQuery.parseJSON(data);
                                            if (dataJSON.result === "success")
                                                {
                                                    if (dataJSON.noGPSCount === 0)
                                                        {
                                                            var formdata = new FormData();
                                                            formdata.append('json', JSON.stringify(dataJSON.imageNames));
                                                            formdata.append('username', username);
                                                            formdata.append('albumID', albumID);

                                                            $.ajax({
                                                                url: 'http://www.lukeokane.com/upload_image_set_user.php',
                                                                type: 'POST',
                                                                contentType: false,
                                                                data: formdata,
                                                                processData: false,
                                                                async: false,
                                                                success: function ()
                                                                    {
                                                                        $('#response').fadeIn();
                                                                        $('#response').removeClass();
                                                                        $('#response').empty();
                                                                        $('#response').addClass("alert alert-success text-center ");
                                                                        $('#response').append("<strong>Success!</strong> Image(s) uploaded successfully");
                                                                        $('#response').delay(5000).fadeOut();
                                                                    },
                                                                error: function ()
                                                                    {
                                                                        $('#response').fadeIn();
                                                                        $('#response').removeClass();
                                                                        $('#response').empty();
                                                                        $('#response').addClass("alert alert-danger text-center ");
                                                                        $('#response').append("<strong>Failure!</strong> There was an error on the server.");
                                                                        $('#response').delay(5000).fadeOut();
                                                                    }
                                                            });

                                                        }
                                                        else if (dataJSON.noGPSCount === fileSize)
                                                        {

                                                             $('#response').fadeIn();
                                                                        $('#response').removeClass();
                                                                        $('#response').empty();
                                                                        $('#response').addClass("alert alert-danger text-center ");
                                                                        $('#response').append("<strong>Failure!</strong> The image(s) uploaded had no GPS co-ordinates.");
                                                                        $('#response').delay(5000).fadeOut();
                                                        }
                                                        else
                                                        {
                                                            var formdata = new FormData();
                                                            formdata.append('json', JSON.stringify(dataJSON.imageNames));
                                                            formdata.append('username', username);
                                                            formdata.append('albumID', albumID);

                                                            $.ajax({
                                                                url: 'http://www.lukeokane.com/upload_image_set_user.php',
                                                                type: 'POST',
                                                                contentType: false,
                                                                data: formdata,
                                                                processData: false,
                                                                async: false,
                                                                success: function ()
                                                                    {
                                                                        $('#response').fadeIn();
                                                                        $('#response').removeClass();
                                                                        $('#response').empty();
                                                                        $('#response').addClass("alert alert-success text-center ");
                                                                        $('#response').append("<strong>Success.. BUT!</strong> " + dataJSON.noGPSCount + " image(s) failed because they didn't have GPS location.");
                                                                        $('#response').delay(7000).fadeOut();
                                                                    },
                                                                error: function ()
                                                                    {
                                                                        $('#response').fadeIn();
                                                                        $('#response').removeClass();
                                                                        $('#response').empty();
                                                                        $('#response').addClass("alert alert-danger text-center ");
                                                                        $('#response').append("<strong>Failure!</strong> There was an error on the server.");
                                                                        $('#response').delay(5000).fadeOut();
                                                                    }
                                                            });
                                                        }
                                                } else if (dataJSON.result === "failure")
                                                {
                                                    $('#response').fadeIn();
                                                    $('#response').removeClass();
                                                    $('#response').empty();
                                                    $('#response').addClass("alert alert-danger text-center ");
                                                    $('#response').append("<strong>Failure!</strong> No images were uploaded to the server.");
                                                    $('#response').delay(5000).fadeOut();

                                                } else
                                                {
                                                    $('#response').fadeIn();
                                                    $('#response').removeClass();
                                                    $('#response').empty();
                                                    $('#response').addClass("alert alert-danger text-center ");
                                                    $('#response').append("<strong>Failure!</strong> There was an error on the server.");
                                                    $('#response').delay(5000).fadeOut();
                                                }



                                            $("#loadinggif").addClass("hidden");
                                            $("#uploadgallerybutton, #uploadcamerabutton").removeClass();
                                            $("#uploadgallerybutton, #uploadcamerabutton").addClass("btn btn-primary btn-block");
                                        },
                                    error: function (data)
                                        {
                                            $('#response').fadeIn();
                                            $('#response').removeClass();
                                            $('#response').empty();
                                            $('#response').addClass("alert alert-danger text-center ");
                                            $('#response').append("<strong>Failure!</strong> An error occurred while uploading.");
                                            $('#response').delay(5000).fadeOut();
                                            $("#uploadgallerybutton, #uploadcamerabutton").removeClass();
                                            $("#loadinggif").addClass("hidden");
                                            $("#uploadgallerybutton, #uploadcamerabutton").addClass("btn btn-primary btn-block");
                                        }

                                });
                                $("#loadinggif").removeClass();
                                $("#uploadgallerybutton, #uploadcamerabutton").removeClass();
                                $("#uploadgallerybutton, #uploadcamerabutton").addClass("btn btn-primary btn-block disabled");
                            }

                    } else
                    {
                        $('#response').fadeIn();
                        $('#response').removeClass();
                        $('#response').empty();
                        $('#response').addClass("alert alert-warning text-center ");
                        $('#response').append("<strong>Error!</strong> One or more images does not have GPS co-ordinates.");
                        $('#response').delay(5000).fadeOut();
                    }
            });

        $('#cancelgalleryuploadbutton').on('click', function (e)
            {
                if (upload.state() === 'pending')
                    {
                        upload.abort();
                        $('#response').fadeIn();
                        $('#response').removeClass();
                        $('#response').empty();
                        $('#response').addClass("alert alert-success text-center ");
                        $('#response').append("<strong>Upload Cancelled</strong>");
                        $('#response').delay(5000).fadeOut();
                    } else
                    {
                        $('#response').fadeIn();
                        $('#response').removeClass();
                        $('#response').empty();
                        $('#response').addClass("alert alert-warning text-center ");
                        $('#response').append("<strong>No images are currently uploading.</strong>");
                        $('#response').delay(5000).fadeOut();
                    }
            });




    });
